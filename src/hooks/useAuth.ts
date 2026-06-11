import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: 'admin' | 'student';
  isAdmin: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const buildAuthUser = useCallback(async (supabaseUser: User): Promise<AuthUser | null> => {
    try {
      // Get profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', supabaseUser.id)
        .single();

      // Get role
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', supabaseUser.id);

      const role = roles?.find(r => r.role === 'admin') ? 'admin' : 'student';

      return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        fullName: profile?.full_name || supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Student',
        avatarUrl: profile?.avatar_url || undefined,
        role,
        isAdmin: role === 'admin',
      };
    } catch {
      return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        fullName: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Student',
        role: 'student',
        isAdmin: false,
      };
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!mounted) return;
      setSession(s);
      if (s?.user) {
        buildAuthUser(s.user).then(u => {
          if (mounted) {
            setUser(u);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted) return;
      setSession(s);
      if (s?.user) {
        buildAuthUser(s.user).then(u => {
          if (mounted) setUser(u);
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [buildAuthUser]);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) throw error;
    return data;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  }, []);

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };
}
