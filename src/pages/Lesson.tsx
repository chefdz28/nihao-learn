import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, X, Clock, Target, ArrowRight, Loader2 } from 'lucide-react';
import { useI18n } from '@/i18n';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { upsertUserProgress } from '@/lib/dataService';
import AudioButton from '@/components/AudioButton';
import type { LessonRow, VocabRow, SentenceRow, QuizQuestionRow } from '@/types/supabase';

export default function Lesson() {
  useI18n(); // i18n context available for child components
  const { user } = useAuth();
  const { lessonId } = useParams<{ levelId: string; lessonId: string }>();

  const [lesson, setLesson] = useState<LessonRow | null>(null);
  const [vocabulary, setVocabulary] = useState<VocabRow[]>([]);
  const [sentences, setSentences] = useState<SentenceRow[]>([]);
  const [questions, setQuestions] = useState<QuizQuestionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Exercise state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [savingResult, setSavingResult] = useState(false);

  // Writing canvas
  const [activeTab, setActiveTab] = useState<'vocab' | 'sentences' | 'writing' | 'exercise'>('vocab');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!lessonId) return;
    loadLesson(lessonId);
  }, [lessonId]);

  async function loadLesson(id: string) {
    setLoading(true);
    setError('');
    try {
      const { data: lessonData } = await supabase.from('lessons').select('*').eq('id', id).single();
      if (!lessonData) { setError('Lesson not found'); setLoading(false); return; }
      setLesson(lessonData);

      const [vData, sData, qData] = await Promise.all([
        supabase.from('vocabulary').select('*').eq('lesson_id', id).order('order_num'),
        supabase.from('sentences').select('*').eq('lesson_id', id).order('order_num'),
        supabase.from('quiz_questions').select('*').eq('lesson_id', id).order('order_num'),
      ]);

      setVocabulary(vData.data || []);
      setSentences(sData.data || []);
      setQuestions(qData.data || []);

      // Track progress
      if (user) {
        await upsertUserProgress({
          user_id: user.id,
          lesson_id: id,
          status: 'in_progress',
          completion_percentage: 0,
        });
      }
    } catch (err) {
      setError('Failed to load lesson');
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
      // Save result
      if (user && lessonId) {
        setSavingResult(true);
        try {
          const passed = score >= Math.ceil(questions.length * 0.7);
          await supabase.from('quiz_results').insert({
            user_id: user.id,
            lesson_id: lessonId,
            score,
            total_questions: questions.length,
            passed,
          });
          await upsertUserProgress({
            user_id: user.id,
            lesson_id: lessonId,
            status: passed ? 'completed' : 'in_progress',
            completion_percentage: passed ? 100 : Math.round((score / questions.length) * 100),
            quiz_score: Math.round((score / questions.length) * 100),
          });
        } catch (err) {
          console.error('Failed to save quiz result:', err);
        } finally {
          setSavingResult(false);
        }
      }
    }
  };

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeTab !== 'writing') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
  }, [activeTab]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white flex items-center gap-2"><Loader2 className="animate-spin" /> Loading lesson...</div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="section-padding text-center">
        <h2 className="font-display font-bold text-2xl text-white mb-4">{error || 'Lesson not found'}</h2>
        <Link to="/courses" className="btn-primary">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
        <Link to="/courses" className="hover:text-white transition-colors flex items-center gap-1">
          <ChevronLeft size={14} /> Courses
        </Link>
        <span>/</span>
        <span className="text-white">{lesson.title_en}</span>
      </div>

      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-black text-white mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 0.9 }}>{lesson.title_en}</h1>
        <h2 className="font-arabic text-lg mb-2" style={{ color: 'var(--color-text-secondary)' }}>{lesson.title_ar}</h2>
        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
          <span className="flex items-center gap-1"><Clock size={14} /> {lesson.estimated_minutes} min</span>
          <span className="flex items-center gap-1"><Target size={14} /> {vocabulary.length} words</span>
          <span className="flex items-center gap-1">{sentences.length} sentences</span>
          <span className="flex items-center gap-1">{questions.length} questions</span>
        </div>
        {lesson.objective_en && (
          <p className="mt-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{lesson.objective_en}</p>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: 'vocab' as const, label: 'Vocabulary', count: vocabulary.length },
          { key: 'sentences' as const, label: 'Sentences', count: sentences.length },
          { key: 'writing' as const, label: 'Writing Practice' },
          { key: 'exercise' as const, label: 'Quiz', count: questions.length },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-5 py-3 rounded-xl font-display font-semibold text-sm whitespace-nowrap transition-all ${activeTab === tab.key ? 'bg-[#FF3333] text-white' : 'bg-white/[0.03] text-[#a0a0a0] hover:text-white hover:bg-white/[0.06]'}`}>
            {tab.label} {tab.count !== undefined && <span className="ml-1 opacity-70">({tab.count})</span>}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'vocab' && (
          <motion.div key="vocab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {vocabulary.length === 0 ? (
              <p className="text-white text-center py-8">No vocabulary for this lesson yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-xs font-display font-semibold text-[#a0a0a0]">Chinese</th>
                      <th className="text-left py-3 px-4 text-xs font-display font-semibold text-[#a0a0a0]">Pinyin</th>
                      <th className="text-left py-3 px-4 text-xs font-display font-semibold text-[#a0a0a0]">Arabic</th>
                      <th className="text-left py-3 px-4 text-xs font-display font-semibold text-[#a0a0a0]">English</th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {vocabulary.map((v) => (
                      <tr key={v.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4 font-chinese text-2xl text-white">{v.chinese}</td>
                        <td className="py-4 px-4 text-[#a0a0a0]">{v.pinyin}</td>
                        <td className="py-4 px-4 font-arabic" style={{ color: 'var(--color-text-secondary)' }}>{v.arabic}</td>
                        <td className="py-4 px-4" style={{ color: 'var(--color-text-secondary)' }}>{v.english}</td>
                        <td className="py-4 px-4"><AudioButton text={v.chinese} size="sm" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'sentences' && (
          <motion.div key="sentences" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            {sentences.length === 0 ? (
              <p className="text-white text-center py-8">No example sentences yet.</p>
            ) : (
              sentences.map(s => (
                <div key={s.id} className="liquid-glass p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-chinese text-xl text-white">{s.chinese}</span>
                    <AudioButton text={s.chinese} size="sm" />
                  </div>
                  <p className="text-sm text-[#a0a0a0] mb-1">{s.pinyin}</p>
                  <p className="text-sm font-arabic" style={{ color: 'var(--color-text-secondary)' }}>{s.arabic}</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>{s.english}</p>
                </div>
              ))
            )}
          </motion.div>
        )}

        {activeTab === 'writing' && (
          <motion.div key="writing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="mb-4">
              <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>Practice writing Chinese characters</p>
              {vocabulary.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {vocabulary.slice(0, 8).map(v => (
                    <span key={v.id} className="px-3 py-1 rounded-lg bg-white/[0.05] font-chinese text-white cursor-pointer hover:bg-[#FF3333]/20 transition-colors">{v.chinese}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="liquid-glass p-4 inline-block">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="bg-black/20 rounded-lg cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              <div className="flex gap-2 mt-3">
                <button onClick={clearCanvas} className="btn-secondary text-sm py-2 px-4"><X size={14} /> Clear</button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'exercise' && (
          <motion.div key="exercise" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {questions.length === 0 ? (
              <p className="text-white text-center py-8">No quiz questions for this lesson yet.</p>
            ) : quizComplete ? (
              <div className="liquid-glass p-10 text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${score >= Math.ceil(questions.length * 0.7) ? 'bg-[#10b981]/15' : 'bg-[#FF3333]/15'}`}>
                  <span className={`font-display font-black text-3xl ${score >= Math.ceil(questions.length * 0.7) ? 'text-[#10b981]' : 'text-[#FF3333]'}`}>
                    {Math.round((score / questions.length) * 100)}%
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">Quiz Complete!</h3>
                <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  You got {score} out of {questions.length} correct
                </p>
                {savingResult && <p className="text-xs text-[#f59e0b] mb-4">Saving result...</p>}
                <div className="flex gap-3 justify-center mt-6">
                  <Link to="/courses" className="btn-secondary"><ChevronLeft size={14} /> Back to Courses</Link>
                  <Link to="/dashboard" className="btn-primary"><ArrowRight size={14} /> Dashboard</Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>Question {currentQuestion + 1} of {questions.length}</span>
                  <div className="flex-1 mx-4 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-[#FF3333] transition-all" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
                  </div>
                </div>

                <div className="liquid-glass p-8 mb-6">
                  <p className="text-lg text-white mb-2">{questions[currentQuestion].question_en}</p>
                  <p className="text-sm font-arabic mb-6" style={{ color: 'var(--color-text-secondary)' }}>{questions[currentQuestion].question_ar}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {questions[currentQuestion].options.map(opt => {
                      let btnClass = 'w-full p-4 rounded-xl border text-left transition-all ';
                      if (showFeedback) {
                        if (opt.id === questions[currentQuestion].correct_option_id) btnClass += 'border-[#10b981]/50 bg-[#10b981]/15 text-[#10b981]';
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
                        {selectedAnswer === questions[currentQuestion].correct_option_id ? (
                          <><Check size={20} className="text-[#10b981]" /><span className="text-[#10b981]">Correct!</span></>
                        ) : (
                          <><X size={20} className="text-[#FF3333]" /><span className="text-[#FF3333]">Incorrect. Correct answer: {questions[currentQuestion].correct_option_id.toUpperCase()}</span></>
                        )}
                      </div>
                      <button onClick={nextQuestion} className="btn-primary" disabled={savingResult}>
                        {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'} <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
