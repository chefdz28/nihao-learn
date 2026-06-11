// Supabase database table types

export interface ProfileRow {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  native_language: string;
  streak_days: number;
  last_study_date: string | null;
  total_study_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface UserRoleRow {
  id: string;
  user_id: string;
  role: 'admin' | 'student';
  created_at: string;
}

export interface LevelRow {
  id: string;
  order_num: number;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  image_url: string | null;
  estimated_hours: number;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface LessonRow {
  id: string;
  level_id: string;
  order_num: number;
  title_en: string;
  title_ar: string;
  objective_en: string | null;
  objective_ar: string | null;
  estimated_minutes: number;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface VocabRow {
  id: string;
  lesson_id: string;
  chinese: string;
  pinyin: string;
  arabic: string;
  english: string;
  audio_url: string | null;
  image_url: string | null;
  order_num: number;
  created_at: string;
}

export interface SentenceRow {
  id: string;
  lesson_id: string;
  chinese: string;
  pinyin: string;
  arabic: string;
  english: string;
  audio_url: string | null;
  order_num: number;
  created_at: string;
}

export interface QuizQuestionRow {
  id: string;
  lesson_id: string;
  question_type: 'multiple_choice' | 'match' | 'pinyin' | 'listen' | 'fill_blank';
  question_en: string;
  question_ar: string;
  options: Array<{ id: string; textEn: string; textAr: string }>;
  correct_option_id: string;
  audio_url: string | null;
  hint: string | null;
  order_num: number;
  created_at: string;
}

export interface QuizResult {
  id: string;
  user_id: string;
  lesson_id: string;
  score: number;
  total_questions: number;
  answers: Array<{ questionId: string; selectedOptionId: string; correct: boolean }>;
  passed: boolean;
  created_at: string;
  lessons?: Record<string, string>;
}

export interface UserProgressItem {
  id: string;
  user_id: string;
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completion_percentage: number;
  quiz_score: number | null;
  last_accessed_at: string;
  created_at: string;
  updated_at: string;
  lessons?: Record<string, string>;
}

export interface PronunciationResult {
  id: string;
  user_id: string;
  lesson_id: string | null;
  target_text: string;
  spoken_text: string | null;
  score: number | null;
  feedback: string | null;
  created_at: string;
}

export interface MediaAssetRow {
  id: string;
  lesson_id: string | null;
  file_type: 'image' | 'audio' | 'video';
  storage_path: string;
  public_url: string;
  file_name: string | null;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
}

export interface PdfUploadRow {
  id: string;
  uploaded_by: string | null;
  file_name: string;
  storage_path: string;
  public_url: string | null;
  file_size: number | null;
  extraction_status: 'pending' | 'processing' | 'completed' | 'failed';
  extracted_data: Record<string, unknown> | null;
  created_at: string;
}
