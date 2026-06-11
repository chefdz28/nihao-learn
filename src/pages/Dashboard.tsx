import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Flame, TrendingUp, Clock, Play, Award, Star, Target, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n';
import { useAuth } from '@/contexts/AuthContext';
import { fetchUserProgress, fetchQuizResults, fetchLevels, fetchLessons } from '@/lib/dataService';
import type { QuizResult, UserProgressItem, LessonRow, LevelRow } from '@/types/supabase';

export default function Dashboard() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgressItem[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [levels, setLevels] = useState<LevelRow[]>([]);
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      try {
        const [progData, resultsData, levelsData, lessonsData] = await Promise.all([
          fetchUserProgress(user.id),
          fetchQuizResults(user.id),
          fetchLevels(),
          fetchLessons(),
        ]);
        setProgress(progData);
        setQuizResults(resultsData);
        setLevels(levelsData);
        setLessons(lessonsData);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  const completedLessons = progress.filter(p => p.status === 'completed');
  const inProgressLessons = progress.filter(p => p.status === 'in_progress');
  const avgScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((a, r) => a + Math.round((r.score / r.total_questions) * 100), 0) / quizResults.length)
    : 0;

  // Find next lesson to continue
  const nextLesson = (() => {
    if (inProgressLessons.length > 0) {
      const lp = inProgressLessons[0];
      const lesson = lessons.find(l => l.id === lp.lesson_id);
      if (lesson) return lesson;
    }
    // Find first lesson not started
    const completedIds = new Set(progress.map(p => p.lesson_id));
    const firstUncompleted = lessons.find(l => !completedIds.has(l.id));
    return firstUncompleted || lessons[0];
  })();

  const nextLessonLevel = nextLesson ? levels.find(l => l.id === nextLesson.level_id) : null;

  const stats = [
    { label: 'Lessons Completed', value: String(completedLessons.length), icon: BookOpen, color: '#ffffff' },
    { label: 'Current Streak', value: '7', suffix: ' days', icon: Flame, color: '#FF3333' },
    { label: 'Avg Score', value: `${avgScore}%`, icon: TrendingUp, color: '#10b981' },
    { label: 'Study Time', value: '12h', icon: Clock, color: '#f59e0b' },
  ];

  const achievements = [
    { icon: Star, name: 'First Lesson', unlocked: completedLessons.length >= 1, color: '#f59e0b' },
    { icon: Flame, name: '7-Day Streak', unlocked: true, color: '#FF3333' },
    { icon: Award, name: 'Perfect Score', unlocked: quizResults.some(r => r.score === r.total_questions), color: quizResults.some(r => r.score === r.total_questions) ? '#f59e0b' : '#666' },
    { icon: Target, name: 'Level Master', unlocked: completedLessons.length >= 5, color: completedLessons.length >= 5 ? '#10b981' : '#666' },
  ];

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-8 text-center">
        <div className="text-white">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display font-black text-white mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 0.9 }}>
            {t('dashboard.welcome')}, {user?.fullName || 'Student'}!
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t('dashboard.subtitle')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={i} className="liquid-glass p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <stat.icon size={20} style={{ color: stat.color }} className="mb-3" />
              <div className="font-display font-black text-2xl text-white">{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Continue Learning */}
        {nextLesson && (
          <div className="liquid-glass p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display font-bold text-xl text-white">Continue Learning</h2>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Pick up where you left off</p>
              </div>
              <Link
                to={`/courses/${nextLessonLevel?.id || 'level-1'}/${nextLesson.id}`}
                className="btn-primary"
              >
                <Play size={16} /> Resume
              </Link>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03]">
              <div className="w-12 h-12 rounded-full bg-[#FF3333]/15 flex items-center justify-center font-display font-bold text-[#FF3333]">
                {nextLesson.order_num}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-white">{nextLesson.title_en}</h3>
                <p className="text-xs font-arabic" style={{ color: 'var(--color-text-secondary)' }}>{nextLesson.title_ar}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>{nextLessonLevel?.title_en || ''} · {nextLesson.estimated_minutes} min</p>
              </div>
              <ArrowRight size={20} className="text-[#a0a0a0]" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quiz History */}
          <div className="lg:col-span-2 space-y-6">
            <div className="liquid-glass p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg text-white">Recent Quiz Results</h3>
                <Link to="/results" className="text-sm text-[#FF3333] hover:text-[#ff5555] font-display font-semibold">View All</Link>
              </div>
              {quizResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>No quiz results yet. Take your first quiz!</p>
                  <Link to="/courses" className="btn-primary mt-4 inline-flex"><Play size={16} /> Start Learning</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {quizResults.slice(0, 5).map((result) => {
                    const pct = Math.round((result.score / result.total_questions) * 100);
                    return (
                      <div key={result.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03]">
                        <div>
                          <p className="text-sm text-white">{(result.lessons as Record<string, string>)?.title_en || 'Quiz'}</p>
                          <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                            {result.score}/{result.total_questions} correct
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-display font-bold ${pct >= 80 ? 'text-[#10b981]' : pct >= 60 ? 'text-[#f59e0b]' : 'text-[#FF3333]'}`}>
                            {pct}%
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${result.passed ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#FF3333]/15 text-[#FF3333]'}`}>
                            {result.passed ? 'Passed' : 'Retry'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="liquid-glass p-6">
              <h3 className="font-display font-bold text-lg text-white mb-4">Lesson Progress</h3>
              {progress.length === 0 ? (
                <p className="text-sm text-center py-4" style={{ color: 'var(--color-text-secondary)' }}>Start learning to see your progress here.</p>
              ) : (
                <div className="space-y-3">
                  {progress.slice(0, 6).map(p => {
                    const lesson = lessons.find(l => l.id === p.lesson_id);
                    if (!lesson) return null;
                    return (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-white">{lesson.title_en}</span>
                            <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{p.completion_percentage}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-[#FF3333] to-[#ff5555] transition-all" style={{ width: `${p.completion_percentage}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="liquid-glass p-6">
              <h3 className="font-display font-bold text-lg text-white mb-4">{t('dashboard.achievements')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((ach, i) => (
                  <div key={i} className={`p-4 rounded-xl text-center ${ach.unlocked ? 'bg-white/[0.05]' : 'bg-white/[0.02] opacity-50'}`}>
                    <ach.icon size={24} style={{ color: ach.color }} className="mx-auto mb-2" />
                    <p className="text-xs text-white">{ach.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Areas */}
            <div className="liquid-glass p-6">
              <h3 className="font-display font-bold text-lg text-white mb-4">Areas to Practice</h3>
              {quizResults.length === 0 ? (
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Complete quizzes to see personalized practice recommendations.</p>
              ) : (
                <div className="space-y-3">
                  {quizResults
                    .filter(r => (r.score / r.total_questions) < 0.8)
                    .slice(0, 3)
                    .map(r => {
                      const lesson = lessons.find(l => l.id === r.lesson_id);
                      return (
                        <div key={r.id} className="flex items-center justify-between">
                          <span className="text-sm text-white">{lesson?.title_en || 'Lesson'}</span>
                          <Link to={`/courses/${lesson?.level_id || ''}/${r.lesson_id}`} className="text-xs text-[#FF3333] hover:text-[#ff5555]">Practice</Link>
                        </div>
                      );
                    })}
                  {quizResults.filter(r => (r.score / r.total_questions) < 0.8).length === 0 && (
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Great job! All scores above 80%.</p>
                  )}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="liquid-glass p-6">
              <h3 className="font-display font-bold text-lg text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/courses" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                  <BookOpen size={16} className="text-[#FF3333]" />
                  <span className="text-sm text-white">Browse Courses</span>
                </Link>
                <Link to="/vocabulary" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                  <TrendingUp size={16} className="text-[#3b82f6]" />
                  <span className="text-sm text-white">Vocabulary</span>
                </Link>
                <Link to="/pronunciation" className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                  <Target size={16} className="text-[#10b981]" />
                  <span className="text-sm text-white">Pronunciation Test</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
