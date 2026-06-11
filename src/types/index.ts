export interface VocabularyItem {
  id: string;
  chinese: string;
  pinyin: string;
  arabic: string;
  english: string;
  audioUrl?: string;
  imageUrl?: string;
}

export interface ExampleSentence {
  id: string;
  chinese: string;
  pinyin: string;
  arabic: string;
  english: string;
  audioUrl?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'match' | 'pinyin' | 'listen' | 'fill_blank';
  questionEn: string;
  questionAr: string;
  options: { id: string; textEn: string; textAr: string; imageUrl?: string }[];
  correctOptionId: string;
  audioUrl?: string;
  hint?: string;
}

export interface Exercise {
  id: string;
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  levelId: string;
  order: number;
  titleEn: string;
  titleAr: string;
  objectiveEn: string;
  objectiveAr: string;
  estimatedMinutes: number;
  vocabulary: VocabularyItem[];
  sentences: ExampleSentence[];
  exercise: Exercise;
}

export interface Level {
  id: string;
  order: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  lessonCount: number;
  estimatedHours: number;
  isPremium: boolean;
  lessons: Lesson[];
}

export interface UserProgress {
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completionPercentage: number;
  quizScore?: number;
  lastAccessedAt?: Date;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  nativeLanguage: 'ar' | 'en' | 'other';
  streakDays: number;
  lastStudyDate?: Date;
  totalStudyMinutes: number;
  progress: UserProgress[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  text: string;
  name: string;
  location: string;
  initial: string;
  color: string;
  rating: number;
}
