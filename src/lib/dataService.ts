import { supabase, BUCKETS } from './supabase';

// ========================
// LEVELS
// ========================
export async function fetchLevels() {
  const { data, error } = await supabase
    .from('levels')
    .select('*')
    .order('order_num');
  if (error) throw error;
  return data || [];
}

export async function createLevel(level: Record<string, unknown>) {
  const { data, error } = await supabase.from('levels').insert(level).select().single();
  if (error) throw error;
  return data;
}

export async function updateLevel(id: string, level: Record<string, unknown>) {
  const { data, error } = await supabase.from('levels').update(level).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteLevel(id: string) {
  const { error } = await supabase.from('levels').delete().eq('id', id);
  if (error) throw error;
}

// ========================
// LESSONS
// ========================
export async function fetchLessons(levelId?: string) {
  let query = supabase.from('lessons').select('*').order('order_num');
  if (levelId) query = query.eq('level_id', levelId);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function fetchLessonById(id: string) {
  const { data, error } = await supabase.from('lessons').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function createLesson(lesson: Record<string, unknown>) {
  const { data, error } = await supabase.from('lessons').insert(lesson).select().single();
  if (error) throw error;
  return data;
}

export async function updateLesson(id: string, lesson: Record<string, unknown>) {
  const { data, error } = await supabase.from('lessons').update(lesson).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteLesson(id: string) {
  const { error } = await supabase.from('lessons').delete().eq('id', id);
  if (error) throw error;
}

// ========================
// VOCABULARY
// ========================
export async function fetchVocabulary(lessonId?: string) {
  let query = supabase.from('vocabulary').select('*, lessons(level_id)').order('order_num');
  if (lessonId) query = query.eq('lesson_id', lessonId);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createVocabItem(item: Record<string, unknown>) {
  const { data, error } = await supabase.from('vocabulary').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateVocabItem(id: string, item: Record<string, unknown>) {
  const { data, error } = await supabase.from('vocabulary').update(item).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteVocabItem(id: string) {
  const { error } = await supabase.from('vocabulary').delete().eq('id', id);
  if (error) throw error;
}

// ========================
// SENTENCES
// ========================
export async function fetchSentences(lessonId?: string) {
  let query = supabase.from('sentences').select('*').order('order_num');
  if (lessonId) query = query.eq('lesson_id', lessonId);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createSentence(item: Record<string, unknown>) {
  const { data, error } = await supabase.from('sentences').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateSentence(id: string, item: Record<string, unknown>) {
  const { data, error } = await supabase.from('sentences').update(item).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteSentence(id: string) {
  const { error } = await supabase.from('sentences').delete().eq('id', id);
  if (error) throw error;
}

// ========================
// QUIZ QUESTIONS
// ========================
export async function fetchQuizQuestions(lessonId?: string) {
  let query = supabase.from('quiz_questions').select('*').order('order_num');
  if (lessonId) query = query.eq('lesson_id', lessonId);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createQuizQuestion(item: Record<string, unknown>) {
  const { data, error } = await supabase.from('quiz_questions').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateQuizQuestion(id: string, item: Record<string, unknown>) {
  const { data, error } = await supabase.from('quiz_questions').update(item).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteQuizQuestion(id: string) {
  const { error } = await supabase.from('quiz_questions').delete().eq('id', id);
  if (error) throw error;
}

// ========================
// QUIZ RESULTS
// ========================
export async function saveQuizResult(result: Record<string, unknown>) {
  const { data, error } = await supabase.from('quiz_results').insert(result).select().single();
  if (error) throw error;
  return data;
}

export async function fetchQuizResults(userId?: string) {
  let query = supabase.from('quiz_results')
    .select('*, lessons(title_en, title_ar)')
    .order('created_at', { ascending: false });
  if (userId) query = query.eq('user_id', userId);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// ========================
// USER PROGRESS
// ========================
export async function fetchUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*, lessons(title_en, title_ar, level_id)')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function upsertUserProgress(progress: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert(progress, { onConflict: 'user_id,lesson_id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ========================
// PRONUNCIATION RESULTS
// ========================
export async function savePronunciationResult(result: Record<string, unknown>) {
  const { data, error } = await supabase.from('pronunciation_results').insert(result).select().single();
  if (error) throw error;
  return data;
}

export async function fetchPronunciationResults(userId: string) {
  const { data, error } = await supabase
    .from('pronunciation_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// ========================
// ADMIN STATS
// ========================
export async function fetchAdminStats() {
  const { data: lessons, error: le } = await supabase.from('lessons').select('id');
  const { data: vocab, error: ve } = await supabase.from('vocabulary').select('id');
  const { data: students, error: se } = await supabase.from('user_roles').select('user_id').eq('role', 'student');
  const { data: results, error: re } = await supabase.from('quiz_results').select('id');

  if (le || ve || se || re) throw new Error('Failed to fetch stats');

  return {
    totalLessons: lessons?.length || 0,
    totalVocabulary: vocab?.length || 0,
    totalStudents: students?.length || 0,
    totalQuizResults: results?.length || 0,
  };
}

// ========================
// STORAGE UPLOAD
// ========================
export async function uploadFile(bucket: string, filePath: string, file: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    upsert: true,
  });
  if (error) throw error;

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return { path: data.path, publicUrl: urlData.publicUrl };
}

export async function deleteFile(bucket: string, filePath: string) {
  const { error } = await supabase.storage.from(bucket).remove([filePath]);
  if (error) throw error;
}

export { BUCKETS };
