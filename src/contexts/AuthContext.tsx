import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
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

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const buildAuthUser = useCallback(async (supabaseUser: User): Promise<AuthUser | null> => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', supabaseUser.id)
        .single();

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
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut,
      isAuthenticated: !!user,
      isAdmin: user?.isAdmin || false,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
