import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Globe, TrendingUp, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { fetchQuizResults, fetchUserProgress } from '@/lib/dataService';

export default function Profile() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ quizzes: 0, avgScore: 0, lessonsCompleted: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.fullName) setFullName(user.fullName);
    loadStats();
  }, [user]);

  async function loadStats() {
    if (!user) return;
    try {
      const [qData, pData] = await Promise.all([
        fetchQuizResults(user.id),
        fetchUserProgress(user.id),
      ]);
      const avgScore = qData.length > 0
        ? Math.round(qData.reduce((a, r) => a + Math.round((r.score / r.total_questions) * 100), 0) / qData.length)
        : 0;
      const completed = pData.filter(p => p.status === 'completed').length;
      setStats({ quizzes: qData.length, avgScore, lessonsCompleted: completed });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await supabase.from('profiles').update({ full_name: fullName }).eq('id', user.id);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto px-6 py-8 pt-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-display font-black text-4xl text-white mb-8">Profile</h1>

        <div className="liquid-glass p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#FF3333]/15 flex items-center justify-center">
              <User size={28} className="text-[#FF3333]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-white">{user?.fullName || 'Student'}</h2>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                <Mail size={14} /> {user?.email}
              </div>
              <div className="flex items-center gap-2 text-xs mt-1">
                <Globe size={12} />
                <span className={`px-2 py-0.5 rounded-full ${user?.role === 'admin' ? 'bg-[#FF3333]/15 text-[#FF3333]' : 'bg-[#3b82f6]/15 text-[#3b82f6]'}`}>
                  {user?.role || 'student'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-[#FF3333]/50"
              />
            </div>
            <button onClick={handleSave} className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8"><Loader2 className="animate-spin text-white mx-auto" /></div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div className="liquid-glass p-5 text-center">
              <TrendingUp size={20} className="text-[#FF3333] mx-auto mb-2" />
              <div className="font-display font-black text-2xl text-white">{stats.quizzes}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Quizzes</div>
            </div>
            <div className="liquid-glass p-5 text-center">
              <TrendingUp size={20} className="text-[#10b981] mx-auto mb-2" />
              <div className="font-display font-black text-2xl text-white">{stats.avgScore}%</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Avg Score</div>
            </div>
            <div className="liquid-glass p-5 text-center">
              <TrendingUp size={20} className="text-[#3b82f6] mx-auto mb-2" />
              <div className="font-display font-black text-2xl text-white">{stats.lessonsCompleted}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Completed</div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
