import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Languages, FileText,
  Plus, Trash2, Edit3, Save, X, Upload,
  Search, ChevronDown,
  Users, Settings,
  ArrowLeft, Download, HelpCircle, Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  fetchLevels,
  fetchLessons, createLesson, updateLesson, deleteLesson,
  fetchVocabulary, createVocabItem, updateVocabItem, deleteVocabItem,
  fetchQuizQuestions, createQuizQuestion, deleteQuizQuestion,
  uploadFile, BUCKETS,
} from '@/lib/dataService';
import { supabase } from '@/lib/supabase';
import type { LevelRow, LessonRow, VocabRow, QuizQuestionRow, QuizResult } from '@/types/supabase';

type TabType = 'overview' | 'lessons' | 'vocabulary' | 'exercises' | 'upload' | 'settings';

export default function Admin() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FF3333] flex items-center justify-center">
            <Settings size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-white">Admin Panel</h1>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Manage your Chinese learning platform</p>
          </div>
        </div>
        <button onClick={() => signOut()} className="btn-secondary text-sm py-2 px-4">
          <ArrowLeft size={14} /> Log Out
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 shrink-0">
          <div className="liquid-glass p-3 space-y-1 sticky top-24">
            {[
              { key: 'overview' as TabType, label: 'Overview', icon: LayoutDashboard },
              { key: 'lessons' as TabType, label: 'Lessons', icon: BookOpen },
              { key: 'vocabulary' as TabType, label: 'Vocabulary', icon: Languages },
              { key: 'exercises' as TabType, label: 'Exercises', icon: FileText },
              { key: 'upload' as TabType, label: 'Upload PDF', icon: Upload },
              { key: 'settings' as TabType, label: 'Settings', icon: Settings },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-display font-semibold transition-all ${
                  activeTab === tab.key ? 'bg-[#FF3333]/15 text-[#FF3333]' : 'text-[#a0a0a0] hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && <OverviewTab key="overview" />}
            {activeTab === 'lessons' && <LessonsTab key="lessons" />}
            {activeTab === 'vocabulary' && <VocabularyTab key="vocabulary" />}
            {activeTab === 'exercises' && <ExercisesTab key="exercises" />}
            {activeTab === 'upload' && <UploadTab key="upload" />}
            {activeTab === 'settings' && <SettingsTab key="settings" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ===================== OVERVIEW TAB =====================
function OverviewTab() {
  const [stats, setStats] = useState({ totalLessons: 0, totalVocabulary: 0, totalStudents: 0, totalQuizResults: 0 });
  const [recentResults, setRecentResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Get counts from Supabase
        const { count: lessonCount } = await supabase.from('lessons').select('*', { count: 'exact', head: true });
        const { count: vocabCount } = await supabase.from('vocabulary').select('*', { count: 'exact', head: true });
        const { count: studentCount } = await supabase.from('user_roles').select('*', { count: 'exact', head: true }).eq('role', 'student');
        const { count: resultCount } = await supabase.from('quiz_results').select('*', { count: 'exact', head: true });
        const { data: results } = await supabase.from('quiz_results')
          .select('*, profiles(full_name), lessons(title_en)')
          .order('created_at', { ascending: false })
          .limit(10);

        setStats({
          totalLessons: lessonCount || 0,
          totalVocabulary: vocabCount || 0,
          totalStudents: studentCount || 0,
          totalQuizResults: resultCount || 0,
        });
        setRecentResults(results || []);
      } catch (err) {
        console.error('Overview load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statCards = [
    { label: 'Total Lessons', value: stats.totalLessons, icon: BookOpen, color: '#FF3333' },
    { label: 'Vocabulary Items', value: stats.totalVocabulary, icon: Languages, color: '#3b82f6' },
    { label: 'Students', value: stats.totalStudents, icon: Users, color: '#10b981' },
    { label: 'Quiz Results', value: stats.totalQuizResults, icon: HelpCircle, color: '#f59e0b' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <h2 className="font-display font-bold text-2xl text-white mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="liquid-glass p-5">
            <stat.icon size={20} style={{ color: stat.color }} className="mb-3" />
            <div className="font-display font-black text-2xl text-white">{loading ? '...' : stat.value}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="liquid-glass p-6">
        <h3 className="font-display font-bold text-lg text-white mb-4">Recent Quiz Results</h3>
        {recentResults.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>No quiz results yet.</p>
        ) : (
          <div className="space-y-2">
            {recentResults.map(r => (
              <div key={r.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-white">{(r as unknown as Record<string, string>).full_name || 'Student'}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                    {(r.lessons as Record<string, string>)?.title_en || 'Lesson'} · {r.score}/{r.total_questions}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${r.passed ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#FF3333]/15 text-[#FF3333]'}`}>
                  {Math.round((r.score / r.total_questions) * 100)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ===================== LESSONS TAB =====================
function LessonsTab() {
  const [levels, setLevels] = useState<LevelRow[]>([]);
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title_en: '', title_ar: '', objective_en: '', objective_ar: '', status: 'published' as 'draft' | 'published', order_num: 1, estimated_minutes: 20 });
  const [showAdd, setShowAdd] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [lData, lsData] = await Promise.all([fetchLevels(), fetchLessons()]);
      setLevels(lData);
      setLessons(lsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const startEdit = (lesson: LessonRow) => {
    setEditing(lesson.id);
    setEditForm({
      title_en: lesson.title_en,
      title_ar: lesson.title_ar,
      objective_en: lesson.objective_en || '',
      objective_ar: lesson.objective_ar || '',
      status: lesson.status,
      order_num: lesson.order_num,
      estimated_minutes: lesson.estimated_minutes,
    });
  };

  const handleSave = async (id: string) => {
    setActionLoading(true);
    try {
      await updateLesson(id, editForm);
      setEditing(null);
      await loadData();
    } catch (err) {
      alert('Failed to save: ' + (err instanceof Error ? err.message : ''));
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreate = async (levelId: string) => {
    setActionLoading(true);
    try {
      await createLesson({
        level_id: levelId,
        order_num: editForm.order_num,
        title_en: editForm.title_en,
        title_ar: editForm.title_ar,
        objective_en: editForm.objective_en,
        objective_ar: editForm.objective_ar,
        status: editForm.status,
        estimated_minutes: editForm.estimated_minutes,
      });
      setShowAdd('');
      setEditForm({ title_en: '', title_ar: '', objective_en: '', objective_ar: '', status: 'published', order_num: 1, estimated_minutes: 20 });
      await loadData();
    } catch (err) {
      alert('Failed to create: ' + (err instanceof Error ? err.message : ''));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lesson? This will also delete all vocabulary, sentences, and questions.')) return;
    setActionLoading(true);
    try {
      await deleteLesson(id);
      await loadData();
    } catch (err) {
      alert('Failed to delete: ' + (err instanceof Error ? err.message : ''));
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-white">Manage Lessons</h2>
      </div>

      {levels.map(level => {
        const levelLessons = lessons.filter(l => l.level_id === level.id);
        return (
          <div key={level.id} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-lg text-white">{level.title_en} ({levelLessons.length} lessons)</h3>
              <button
                onClick={() => {
                  setShowAdd(showAdd === level.id ? '' : level.id);
                  setEditForm({ ...editForm, order_num: levelLessons.length + 1 });
                }}
                className="btn-primary text-sm py-2 px-4"
              >
                <Plus size={14} /> Add Lesson
              </button>
            </div>

            {showAdd === level.id && (
              <motion.div className="liquid-glass-strong p-6 mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h4 className="font-display font-bold text-white mb-4">New Lesson</h4>
                <LessonForm form={editForm} setForm={setEditForm} />
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleCreate(level.id)} className="btn-primary text-sm" disabled={actionLoading}>
                    {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <><Save size={14} /> Create</>}
                  </button>
                  <button onClick={() => setShowAdd('')} className="btn-secondary text-sm"><X size={14} /> Cancel</button>
                </div>
              </motion.div>
            )}

            <div className="space-y-3">
              {levelLessons.map(lesson => (
                <div key={lesson.id} className="liquid-glass overflow-hidden">
                  <div className="flex items-center justify-between p-5 cursor-pointer" onClick={() => setExpanded(expanded === lesson.id ? null : lesson.id)}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#FF3333]/15 flex items-center justify-center font-display font-bold text-[#FF3333]">{lesson.order_num}</div>
                      <div>
                        <h3 className="font-display font-bold text-white">{lesson.title_en}</h3>
                        <p className="text-xs font-arabic" style={{ color: 'var(--color-text-secondary)' }}>{lesson.title_ar}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${lesson.status === 'published' ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#f59e0b]/15 text-[#f59e0b]'}`}>{lesson.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={e => { e.stopPropagation(); startEdit(lesson); }} className="icon-btn w-8 h-8"><Edit3 size={14} /></button>
                      <button onClick={e => { e.stopPropagation(); handleDelete(lesson.id); }} className="icon-btn w-8 h-8 text-[#FF3333]"><Trash2 size={14} /></button>
                      <ChevronDown size={16} className={`text-[#a0a0a0] transition-transform ${expanded === lesson.id ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {expanded === lesson.id && (
                    <motion.div className="px-5 pb-5 border-t border-white/5" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                      {editing === lesson.id ? (
                        <div className="space-y-4 pt-4">
                          <LessonForm form={editForm} setForm={setEditForm} />
                          <div className="flex gap-2">
                            <button onClick={() => handleSave(lesson.id)} className="btn-primary text-sm" disabled={actionLoading}>
                              {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <><Save size={14} /> Save</>}
                            </button>
                            <button onClick={() => setEditing(null)} className="btn-secondary text-sm"><X size={14} /> Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-4 space-y-4">
                          <div>
                            <p className="text-xs text-[#a0a0a0] mb-1">Learning Objective</p>
                            <p className="text-sm text-white">{lesson.objective_en}</p>
                            <p className="text-sm font-arabic" style={{ color: 'var(--color-text-secondary)' }}>{lesson.objective_ar}</p>
                          </div>
                          <div className="flex gap-4 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                            <span>{lesson.estimated_minutes} minutes</span>
                            <span>Status: {lesson.status}</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

function LessonForm({ form, setForm }: { form: typeof editForm; setForm: (f: typeof editForm) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs text-white mb-1">Title (EN)</label><input type="text" value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF3333]/50" /></div>
        <div><label className="block text-xs text-white mb-1">Title (AR)</label><input type="text" value={form.title_ar} onChange={e => setForm({ ...form, title_ar: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm font-arabic focus:outline-none focus:border-[#FF3333]/50" /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs text-white mb-1">Objective (EN)</label><input type="text" value={form.objective_en} onChange={e => setForm({ ...form, objective_en: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF3333]/50" /></div>
        <div><label className="block text-xs text-white mb-1">Objective (AR)</label><input type="text" value={form.objective_ar} onChange={e => setForm({ ...form, objective_ar: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm font-arabic focus:outline-none focus:border-[#FF3333]/50" /></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><label className="block text-xs text-white mb-1">Order</label><input type="number" value={form.order_num} onChange={e => setForm({ ...form, order_num: Number(e.target.value) })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF3333]/50" /></div>
        <div><label className="block text-xs text-white mb-1">Minutes</label><input type="number" value={form.estimated_minutes} onChange={e => setForm({ ...form, estimated_minutes: Number(e.target.value) })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF3333]/50" /></div>
        <div><label className="block text-xs text-white mb-1">Status</label><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'draft' | 'published' })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF3333]/50"><option value="draft" className="bg-[#1a1a1a]">Draft</option><option value="published" className="bg-[#1a1a1a]">Published</option></select></div>
      </div>
    </div>
  );
}

const editForm = { title_en: '', title_ar: '', objective_en: '', objective_ar: '', status: 'published' as 'draft' | 'published', order_num: 1, estimated_minutes: 20 };

// ===================== VOCABULARY TAB =====================
function VocabularyTab() {
  const [vocab, setVocab] = useState<VocabRow[]>([]);
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [newWord, setNewWord] = useState({ lesson_id: '', chinese: '', pinyin: '', arabic: '', english: '', order_num: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [vData, lData] = await Promise.all([fetchVocabulary(), fetchLessons()]);
      setVocab(vData);
      setLessons(lData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = vocab.filter(v => {
    const q = search.toLowerCase();
    return v.chinese.includes(q) || v.pinyin.toLowerCase().includes(q) || v.english.toLowerCase().includes(q) || v.arabic.includes(q);
  });

  const handleSave = async (id: string, data: Record<string, unknown>) => {
    setActionLoading(true);
    try {
      await updateVocabItem(id, data);
      setEditing(null);
      await loadData();
    } catch (err) {
      alert('Save failed: ' + (err instanceof Error ? err.message : ''));
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newWord.lesson_id || !newWord.chinese) return;
    setActionLoading(true);
    try {
      await createVocabItem(newWord);
      setShowAdd('');
      setNewWord({ lesson_id: '', chinese: '', pinyin: '', arabic: '', english: '', order_num: 0 });
      await loadData();
    } catch (err) {
      alert('Create failed: ' + (err instanceof Error ? err.message : ''));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this word?')) return;
    setActionLoading(true);
    try {
      await deleteVocabItem(id);
      await loadData();
    } catch (err) {
      alert('Delete failed: ' + (err instanceof Error ? err.message : ''));
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-white">Vocabulary Manager ({vocab.length} words)</h2>
        <button onClick={() => setShowAdd(showAdd ? '' : 'vocab')} className="btn-primary text-sm py-2 px-4"><Plus size={14} /> Add Word</button>
      </div>

      {showAdd && (
        <motion.div className="liquid-glass-strong p-6 mb-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="font-display font-bold text-white mb-4">Add New Word</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-xs text-white mb-1">Lesson</label>
              <select value={newWord.lesson_id} onChange={e => setNewWord({ ...newWord, lesson_id: e.target.value })} className="w-full h-10 px-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm">
                <option value="" className="bg-[#1a1a1a]">Select...</option>
                {lessons.map(l => <option key={l.id} value={l.id} className="bg-[#1a1a1a]">{l.title_en}</option>)}
              </select>
            </div>
            <div><label className="block text-xs text-white mb-1">Chinese</label><input type="text" value={newWord.chinese} onChange={e => setNewWord({ ...newWord, chinese: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm font-chinese" placeholder="字" /></div>
            <div><label className="block text-xs text-white mb-1">Pinyin</label><input type="text" value={newWord.pinyin} onChange={e => setNewWord({ ...newWord, pinyin: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm" placeholder="zì" /></div>
            <div><label className="block text-xs text-white mb-1">Arabic</label><input type="text" value={newWord.arabic} onChange={e => setNewWord({ ...newWord, arabic: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm font-arabic" placeholder="كلمة" /></div>
            <div><label className="block text-xs text-white mb-1">English</label><input type="text" value={newWord.english} onChange={e => setNewWord({ ...newWord, english: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm" placeholder="word" /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} className="btn-primary text-sm" disabled={actionLoading}>
              {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <><Save size={14} /> Save</>}
            </button>
            <button onClick={() => setShowAdd('')} className="btn-secondary text-sm"><X size={14} /> Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF3333]/50" placeholder="Search vocabulary..." />
        </div>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
        {filtered.map(word => (
          <div key={word.id} className="liquid-glass p-4 flex items-center gap-4">
            {editing === word.id ? (
              <div className="flex-1 grid grid-cols-5 gap-2">
                <input type="text" value={word.chinese} onChange={e => handleSave(word.id, { chinese: e.target.value })} className="h-9 px-2 rounded bg-white/[0.03] border border-white/10 text-white text-sm font-chinese" />
                <input type="text" value={word.pinyin} onChange={e => handleSave(word.id, { pinyin: e.target.value })} className="h-9 px-2 rounded bg-white/[0.03] border border-white/10 text-white text-sm" />
                <input type="text" value={word.arabic} onChange={e => handleSave(word.id, { arabic: e.target.value })} className="h-9 px-2 rounded bg-white/[0.03] border border-white/10 text-white text-sm font-arabic" />
                <input type="text" value={word.english} onChange={e => handleSave(word.id, { english: e.target.value })} className="h-9 px-2 rounded bg-white/[0.03] border border-white/10 text-white text-sm" />
                <div className="flex gap-1">
                  <button onClick={() => setEditing(null)} className="btn-primary text-xs py-1 px-2"><Save size={12} /></button>
                  <button onClick={() => setEditing(null)} className="btn-secondary text-xs py-1 px-2"><X size={12} /></button>
                </div>
              </div>
            ) : (
              <>
                <span className="font-chinese text-2xl text-white w-16 text-center">{word.chinese}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm text-[#a0a0a0]">{word.pinyin}</div>
                  <div className="flex items-center gap-3 text-xs mt-1">
                    <span className="font-arabic" style={{ color: 'var(--color-text-secondary)' }}>{word.arabic}</span>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>{word.english}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(word.id)} className="icon-btn w-8 h-8"><Edit3 size={12} /></button>
                  <button onClick={() => handleDelete(word.id)} className="icon-btn w-8 h-8 text-[#FF3333]"><Trash2 size={12} /></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ===================== EXERCISES TAB =====================
function ExercisesTab() {
  const [questions, setQuestions] = useState<QuizQuestionRow[]>([]);
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [selectedLesson, setSelectedLesson] = useState('');
  const [showBuilder, setShowBuilder] = useState(false);
  const [newQ, setNewQ] = useState({ question_en: '', question_ar: '', opt_a: '', opt_b: '', opt_c: '', opt_d: '', correct: 'a', question_type: 'multiple_choice' as const });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [qData, lData] = await Promise.all([fetchQuizQuestions(), fetchLessons()]);
      setQuestions(qData);
      setLessons(lData);
      if (lData.length > 0 && !selectedLesson) setSelectedLesson(lData[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const lessonQuestions = questions.filter(q => q.lesson_id === selectedLesson);

  const handleSave = async () => {
    if (!selectedLesson || !newQ.question_en) return;
    setActionLoading(true);
    try {
      await createQuizQuestion({
        lesson_id: selectedLesson,
        question_type: newQ.question_type,
        question_en: newQ.question_en,
        question_ar: newQ.question_ar,
        options: [
          { id: 'a', textEn: newQ.opt_a, textAr: '' },
          { id: 'b', textEn: newQ.opt_b, textAr: '' },
          { id: 'c', textEn: newQ.opt_c, textAr: '' },
          { id: 'd', textEn: newQ.opt_d, textAr: '' },
        ],
        correct_option_id: newQ.correct,
        order_num: lessonQuestions.length + 1,
      });
      setShowBuilder(false);
      setNewQ({ question_en: '', question_ar: '', opt_a: '', opt_b: '', opt_c: '', opt_d: '', correct: 'a', question_type: 'multiple_choice' });
      await loadData();
    } catch (err) {
      alert('Save failed: ' + (err instanceof Error ? err.message : ''));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this question?')) return;
    try {
      await deleteQuizQuestion(id);
      await loadData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-white">Exercise Builder</h2>
        <button onClick={() => setShowBuilder(!showBuilder)} className="btn-primary text-sm py-2 px-4"><Plus size={14} /> Add Question</button>
      </div>

      <select value={selectedLesson} onChange={e => setSelectedLesson(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm mb-6 focus:outline-none focus:border-[#FF3333]/50">
        {lessons.map(l => <option key={l.id} value={l.id} className="bg-[#1a1a1a]">{l.order_num}. {l.title_en}</option>)}
      </select>

      {showBuilder && (
        <motion.div className="liquid-glass-strong p-6 mb-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="font-display font-bold text-white mb-4">New Question</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs text-white mb-1">Question (EN)</label><input type="text" value={newQ.question_en} onChange={e => setNewQ({ ...newQ, question_en: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm" /></div>
              <div><label className="block text-xs text-white mb-1">Question (AR)</label><input type="text" value={newQ.question_ar} onChange={e => setNewQ({ ...newQ, question_ar: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm font-arabic" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(['a', 'b', 'c', 'd'] as const).map(opt => (
                <div key={opt}><label className="block text-xs text-white mb-1">Option {opt.toUpperCase()}</label><input type="text" value={newQ[`opt_${opt}` as keyof typeof newQ] as string} onChange={e => setNewQ({ ...newQ, [`opt_${opt}`]: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm" /></div>
              ))}
            </div>
            <div>
              <label className="block text-xs text-white mb-1">Correct Answer</label>
              <div className="flex gap-2">
                {(['a', 'b', 'c', 'd'] as const).map(opt => (
                  <button key={opt} onClick={() => setNewQ({ ...newQ, correct: opt })} className={`w-10 h-10 rounded-lg font-display font-bold text-sm ${newQ.correct === opt ? 'bg-[#10b981] text-white' : 'bg-white/[0.03] border border-white/10 text-[#a0a0a0]'}`}>{opt.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn-primary text-sm" disabled={actionLoading}>
                {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <><Save size={14} /> Save</>}
              </button>
              <button onClick={() => setShowBuilder(false)} className="btn-secondary text-sm"><X size={14} /> Cancel</button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {lessonQuestions.map((q, i) => (
          <div key={q.id} className="liquid-glass p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF3333]/15 flex items-center justify-center font-display font-bold text-[#FF3333] text-xs">{i + 1}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5" style={{ color: 'var(--color-text-tertiary)' }}>{q.question_type}</span>
                </div>
                <p className="text-sm text-white mb-1">{q.question_en}</p>
                <p className="text-xs font-arabic mb-3" style={{ color: 'var(--color-text-secondary)' }}>{q.question_ar}</p>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map(opt => (
                    <div key={opt.id} className={`text-xs px-3 py-2 rounded-lg border ${opt.id === q.correct_option_id ? 'border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981]' : 'border-white/5 bg-white/[0.02] text-[#a0a0a0]'}`}>
                      {opt.id.toUpperCase()}. {opt.textEn}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => handleDelete(q.id)} className="icon-btn w-8 h-8 text-[#FF3333]"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ===================== UPLOAD TAB =====================
function UploadTab() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const filePath = `pdfs/${Date.now()}-${file.name}`;
      const result = await uploadFile(BUCKETS.pdfUploads, filePath, file);
      setUploadedUrl(result.publicUrl);
      // Save metadata to pdf_uploads table
      await supabase.from('pdf_uploads').insert({
        file_name: file.name,
        storage_path: filePath,
        public_url: result.publicUrl,
        file_size: file.size,
        extraction_status: 'pending',
      });
    } catch (err) {
      alert('Upload failed: ' + (err instanceof Error ? err.message : ''));
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <h2 className="font-display font-bold text-2xl text-white mb-6">Upload PDF Book</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div
            className={`liquid-glass p-8 text-center border-2 border-dashed transition-colors ${dragActive ? 'border-[#FF3333]/50 bg-[#FF3333]/5' : 'border-white/10'}`}
            style={{ borderRadius: 16 }}
            onDragEnter={() => setDragActive(true)} onDragLeave={() => setDragActive(false)} onDragOver={e => e.preventDefault()} onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={e => e.target.files?.[0] && setFile(e.target.files[0])} />
            <Upload size={40} className="text-[#FF3333] mx-auto mb-4" />
            <p className="text-white font-display font-semibold mb-2">Drop your PDF here or click to browse</p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Supports: Chinese textbooks, HSK books</p>
          </div>

          {file && (
            <motion.div className="liquid-glass p-4 mt-4 flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-[#FF3333]" />
                <div>
                  <p className="text-sm text-white">{file.name}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={handleUpload} disabled={uploading} className="btn-primary text-sm">
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : 'Upload'}
                </button>
                <button onClick={() => { setFile(null); setUploadedUrl(''); }} className="icon-btn w-10 h-10"><X size={16} /></button>
              </div>
            </motion.div>
          )}

          {uploadedUrl && (
            <div className="mt-4 p-4 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30">
              <p className="text-sm text-[#10b981]">Uploaded successfully!</p>
              <p className="text-xs break-all mt-1" style={{ color: 'var(--color-text-secondary)' }}>{uploadedUrl}</p>
            </div>
          )}
        </div>

        <div className="liquid-glass p-6">
          <h3 className="font-display font-bold text-white mb-4">Uploaded PDFs</h3>
          <PdfList />
        </div>
      </div>
    </motion.div>
  );
}

function PdfList() {
  const [pdfs, setPdfs] = useState<Array<{ id: string; file_name: string; extraction_status: string; created_at: string }>>([]);

  useEffect(() => {
    supabase.from('pdf_uploads').select('id, file_name, extraction_status, created_at').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setPdfs(data);
    });
  }, []);

  if (pdfs.length === 0) return <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>No PDFs uploaded yet.</p>;

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto">
      {pdfs.map(pdf => (
        <div key={pdf.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <FileText size={16} className="text-[#FF3333]" />
            <div>
              <p className="text-sm text-white">{pdf.file_name}</p>
              <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{new Date(pdf.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${pdf.extraction_status === 'completed' ? 'bg-[#10b981]/15 text-[#10b981]' : pdf.extraction_status === 'failed' ? 'bg-[#FF3333]/15 text-[#FF3333]' : 'bg-[#f59e0b]/15 text-[#f59e0b]'}`}>{pdf.extraction_status}</span>
        </div>
      ))}
    </div>
  );
}

// ===================== SETTINGS TAB =====================
function SettingsTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <h2 className="font-display font-bold text-2xl text-white mb-6">Admin Settings</h2>
      <div className="space-y-6 max-w-[600px]">
        <div className="liquid-glass p-6">
          <h3 className="font-display font-bold text-white mb-4">Platform Info</h3>
          <div className="space-y-3">
            {[{ label: 'Platform Name', value: 'NiHao' }, { label: 'Version', value: '2.0.0 (Supabase)' }, { label: 'Languages', value: 'English, Arabic, Chinese' }, { label: 'Backend', value: 'Supabase' }].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.label}</span>
                <span className="text-sm text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="liquid-glass p-6">
          <h3 className="font-display font-bold text-white mb-4">Export / Import</h3>
          <div className="space-y-3">
            <button onClick={async () => {
              const { data: lessons } = await supabase.from('lessons').select('*');
              const { data: vocab } = await supabase.from('vocabulary').select('*');
              const blob = new Blob([JSON.stringify({ lessons, vocabulary: vocab }, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url; a.download = 'nihao-data-export.json'; a.click();
            }} className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left">
              <Download size={16} className="text-[#10b981]" /><span className="text-sm text-white">Export All Data (JSON)</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
