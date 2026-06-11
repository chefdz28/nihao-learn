import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Calendar, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchQuizResults, fetchPronunciationResults } from '@/lib/dataService';
import type { QuizResult, PronunciationResult } from '@/types/supabase';

export default function Results() {
  const { user } = useAuth();
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [pronunciationResults, setPronunciationResults] = useState<PronunciationResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const [qData, pData] = await Promise.all([
          fetchQuizResults(user.id),
          fetchPronunciationResults(user.id),
        ]);
        setQuizResults(qData);
        setPronunciationResults(pData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white flex items-center gap-2"><Loader2 className="animate-spin" /> Loading results...</div>
      </div>
    );
  }

  const avgScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((a, r) => a + Math.round((r.score / r.total_questions) * 100), 0) / quizResults.length)
    : 0;

  const passedCount = quizResults.filter(r => r.passed).length;

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-8 pt-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-display font-black text-4xl text-white mb-8">Your Results</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="liquid-glass p-5">
            <Trophy size={20} className="text-[#FF3333] mb-3" />
            <div className="font-display font-black text-2xl text-white">{quizResults.length}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Quizzes Taken</div>
          </div>
          <div className="liquid-glass p-5">
            <TrendingUp size={20} className="text-[#10b981] mb-3" />
            <div className="font-display font-black text-2xl text-white">{avgScore}%</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Average Score</div>
          </div>
          <div className="liquid-glass p-5">
            <Calendar size={20} className="text-[#3b82f6] mb-3" />
            <div className="font-display font-black text-2xl text-white">{passedCount}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Passed</div>
          </div>
        </div>

        {/* Quiz Results */}
        <div className="liquid-glass p-6 mb-8">
          <h2 className="font-display font-bold text-xl text-white mb-4">Quiz History</h2>
          {quizResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>No quiz results yet. Start learning and take quizzes!</p>
              <Link to="/courses" className="btn-primary">Browse Courses</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {quizResults.map(r => {
                const pct = Math.round((r.score / r.total_questions) * 100);
                return (
                  <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03]">
                    <div>
                      <p className="text-sm text-white">{(r.lessons as Record<string, string>)?.title_en || 'Quiz'}</p>
                      <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                        {new Date(r.created_at).toLocaleDateString()} · {r.score}/{r.total_questions} correct
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-display font-bold ${pct >= 80 ? 'text-[#10b981]' : pct >= 60 ? 'text-[#f59e0b]' : 'text-[#FF3333]'}`}>
                        {pct}%
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${r.passed ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#FF3333]/15 text-[#FF3333]'}`}>
                        {r.passed ? 'Passed' : 'Retry'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pronunciation Results */}
        <div className="liquid-glass p-6">
          <h2 className="font-display font-bold text-xl text-white mb-4">Pronunciation History</h2>
          {pronunciationResults.length === 0 ? (
            <p className="text-sm text-center py-4" style={{ color: 'var(--color-text-secondary)' }}>No pronunciation tests yet.</p>
          ) : (
            <div className="space-y-3">
              {pronunciationResults.slice(0, 10).map(r => (
                <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03]">
                  <div>
                    <p className="text-sm text-white font-chinese">{r.target_text}</p>
                    {r.spoken_text && r.spoken_text !== '(simulated)' && (
                      <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>You said: {r.spoken_text}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-display font-bold ${(r.score || 0) >= 80 ? 'text-[#10b981]' : (r.score || 0) >= 60 ? 'text-[#f59e0b]' : 'text-[#FF3333]'}`}>
                      {r.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
