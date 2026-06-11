import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Trophy, Clock, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { upsertUserProgress } from '@/lib/dataService';
import type { QuizQuestionRow } from '@/types/supabase';

export default function Quiz() {
  const { user } = useAuth();
  const { levelId } = useParams<{ levelId: string }>();

  const [questions, setQuestions] = useState<QuizQuestionRow[]>([]);
  const [lessonTitle, setLessonTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [savingResult, setSavingResult] = useState(false);
  const [timeStarted] = useState(Date.now());

  useEffect(() => {
    if (!levelId) return;
    loadQuestions(levelId);
  }, [levelId]);

  async function loadQuestions(levelId: string) {
    setLoading(true);
    try {
      // Get lessons for this level
      const { data: lessons } = await supabase.from('lessons').select('*').eq('level_id', levelId).order('order_num');
      if (!lessons || lessons.length === 0) { setLoading(false); return; }

      // Get questions for all lessons in this level
      const lessonIds = lessons.map(l => l.id);
      const { data: qData } = await supabase.from('quiz_questions').select('*').in('lesson_id', lessonIds).order('order_num');

      setQuestions(qData || []);
      setLessonTitle(lessons[0]?.title_en || 'Quiz');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleAnswer = (optionId: string) => {
    if (showFeedback || questions.length === 0) return;
    setSelectedAnswer(optionId);
    setShowFeedback(true);
    if (optionId === questions[currentQuestion].correct_option_id) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
      if (user && levelId) {
        setSavingResult(true);
        try {
          const passed = score >= Math.ceil(questions.length * 0.6);
          // Get first lesson in this level for progress tracking
          const { data: lessons } = await supabase.from('lessons').select('id').eq('level_id', levelId).order('order_num').limit(1);
          const lessonId = lessons?.[0]?.id;

          await supabase.from('quiz_results').insert({
            user_id: user.id,
            lesson_id: lessonId || levelId,
            score,
            total_questions: questions.length,
            passed,
          });

          if (lessonId) {
            await upsertUserProgress({
              user_id: user.id,
              lesson_id: lessonId,
              status: passed ? 'completed' : 'in_progress',
              completion_percentage: passed ? 100 : Math.round((score / questions.length) * 100),
              quiz_score: Math.round((score / questions.length) * 100),
            });
          }
        } catch (err) {
          console.error('Failed to save quiz:', err);
        } finally {
          setSavingResult(false);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white flex items-center gap-2"><Loader2 className="animate-spin" /> Loading quiz...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="section-padding text-center">
        <h2 className="font-display font-bold text-2xl text-white mb-4">No questions available</h2>
        <Link to="/courses" className="btn-primary">Back to Courses</Link>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 60;
    const timeTaken = Math.round((Date.now() - timeStarted) / 1000);

    return (
      <div className="max-w-[800px] mx-auto px-6 py-8 pt-24">
        <motion.div className="liquid-glass p-10 text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? 'bg-[#10b981]/15' : 'bg-[#FF3333]/15'}`}>
            <Trophy size={40} className={passed ? 'text-[#10b981]' : 'text-[#FF3333]'} />
          </div>
          <h1 className="font-display font-black text-4xl text-white mb-2">{percentage}%</h1>
          <p className="text-lg mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            You got {score} out of {questions.length} correct
          </p>
          <div className="flex items-center justify-center gap-4 text-sm mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
            <span className="flex items-center gap-1"><Clock size={14} /> {Math.floor(timeTaken / 60)}m {timeTaken % 60}s</span>
            <span className={passed ? 'text-[#10b981]' : 'text-[#FF3333]'}>{passed ? 'Passed!' : 'Keep practicing!'}</span>
          </div>
          {savingResult && <p className="text-xs text-[#f59e0b] mb-4">Saving result...</p>}
          <div className="flex gap-3 justify-center">
            <Link to="/courses" className="btn-secondary">Back to Courses</Link>
            <Link to="/dashboard" className="btn-primary">Dashboard</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="max-w-[800px] mx-auto px-6 py-8 pt-24">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>{lessonTitle}</span>
        <span className="text-sm font-display font-semibold text-white">{currentQuestion + 1} / {questions.length}</span>
      </div>

      <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-8">
        <motion.div className="h-full rounded-full bg-[#FF3333]" initial={{ width: 0 }} animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} transition={{ duration: 0.3 }} />
      </div>

      <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <div className="liquid-glass p-8 mb-6">
          <p className="text-lg text-white mb-2">{q.question_en}</p>
          <p className="text-sm font-arabic mb-6" style={{ color: 'var(--color-text-secondary)' }}>{q.question_ar}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map(opt => {
              let btnClass = 'w-full p-4 rounded-xl border text-left transition-all ';
              if (showFeedback) {
                if (opt.id === q.correct_option_id) btnClass += 'border-[#10b981]/50 bg-[#10b981]/15 text-[#10b981]';
                else if (opt.id === selectedAnswer) btnClass += 'border-[#FF3333]/50 bg-[#FF3333]/15 text-[#FF3333]';
                else btnClass += 'border-white/5 bg-white/[0.02] text-[#a0a0a0]';
              } else {
                btnClass += 'border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] hover:border-[#FF3333]/30';
              }
              return (
                <button key={opt.id} onClick={() => handleAnswer(opt.id)} disabled={showFeedback} className={btnClass}>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-display font-bold text-sm">{opt.id.toUpperCase()}</span>
                    <span>{opt.textEn}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <motion.div className="mt-6 flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center gap-2">
                {selectedAnswer === q.correct_option_id
                  ? <><Check size={20} className="text-[#10b981]" /><span className="text-[#10b981]">Correct!</span></>
                  : <><X size={20} className="text-[#FF3333]" /><span className="text-[#FF3333]">Incorrect. Answer: {q.correct_option_id.toUpperCase()}</span></>
                }
              </div>
              <button onClick={nextQuestion} className="btn-primary">
                {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'} <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
