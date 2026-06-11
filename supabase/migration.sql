-- ============================================================
-- NiHao Chinese Learning Platform - Full Database Migration
-- Run this in Supabase SQL Editor to set up everything
-- ============================================================

-- ============================================================
-- 1. EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 2. PROFILES TABLE (extends Supabase Auth users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  native_language TEXT DEFAULT 'en',
  streak_days INTEGER DEFAULT 0,
  last_study_date DATE,
  total_study_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. USER ROLES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'student')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- ============================================================
-- 4. LEVELS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_num INTEGER NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  image_url TEXT,
  estimated_hours NUMERIC(4,1) DEFAULT 1.0,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. LESSONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level_id UUID NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
  order_num INTEGER NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  objective_en TEXT,
  objective_ar TEXT,
  estimated_minutes INTEGER DEFAULT 20,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(level_id, order_num)
);

-- ============================================================
-- 6. VOCABULARY TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  chinese TEXT NOT NULL,
  pinyin TEXT NOT NULL,
  arabic TEXT NOT NULL,
  english TEXT NOT NULL,
  audio_url TEXT,
  image_url TEXT,
  order_num INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. SENTENCES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS sentences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  chinese TEXT NOT NULL,
  pinyin TEXT NOT NULL,
  arabic TEXT NOT NULL,
  english TEXT NOT NULL,
  audio_url TEXT,
  order_num INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 8. QUIZ QUESTIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'match', 'pinyin', 'listen', 'fill_blank')),
  question_en TEXT NOT NULL,
  question_ar TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_option_id TEXT NOT NULL,
  audio_url TEXT,
  hint TEXT,
  order_num INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. QUIZ RESULTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  passed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. USER PROGRESS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completion_percentage INTEGER DEFAULT 0,
  quiz_score INTEGER,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- ============================================================
-- 11. PRONUNCIATION RESULTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS pronunciation_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  target_text TEXT NOT NULL,
  spoken_text TEXT,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 12. MEDIA ASSETS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'audio', 'video')),
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  file_name TEXT,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 13. PDF UPLOADS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS pdf_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  file_size INTEGER,
  extraction_status TEXT DEFAULT 'pending' CHECK (extraction_status IN ('pending', 'processing', 'completed', 'failed')),
  extracted_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 14. ROW LEVEL SECURITY (RLS) ENABLE
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE sentences ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE pronunciation_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdf_uploads ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 15. RLS POLICIES - PROFILES
-- ============================================================
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all" ON profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 16. RLS POLICIES - USER ROLES
-- ============================================================
CREATE POLICY "user_roles_select_own" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_roles_admin_all" ON user_roles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 17. RLS POLICIES - LEVELS (public read, admin write)
-- ============================================================
CREATE POLICY "levels_select_all" ON levels
  FOR SELECT USING (true);

CREATE POLICY "levels_admin_all" ON levels
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 18. RLS POLICIES - LESSONS (students read published only, admin all)
-- ============================================================
CREATE POLICY "lessons_select_published" ON lessons
  FOR SELECT USING (
    status = 'published' OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "lessons_admin_all" ON lessons
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 19. RLS POLICIES - VOCABULARY (public read, admin write)
-- ============================================================
CREATE POLICY "vocabulary_select_all" ON vocabulary
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lessons l
      WHERE l.id = vocabulary.lesson_id
      AND (l.status = 'published' OR
        EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'))
    )
  );

CREATE POLICY "vocabulary_admin_all" ON vocabulary
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 20. RLS POLICIES - SENTENCES (public read, admin write)
-- ============================================================
CREATE POLICY "sentences_select_all" ON sentences
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lessons l
      WHERE l.id = sentences.lesson_id
      AND (l.status = 'published' OR
        EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'))
    )
  );

CREATE POLICY "sentences_admin_all" ON sentences
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 21. RLS POLICIES - QUIZ QUESTIONS (public read, admin write)
-- ============================================================
CREATE POLICY "quiz_questions_select_all" ON quiz_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lessons l
      WHERE l.id = quiz_questions.lesson_id
      AND (l.status = 'published' OR
        EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin'))
    )
  );

CREATE POLICY "quiz_questions_admin_all" ON quiz_questions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 22. RLS POLICIES - QUIZ RESULTS (own data only)
-- ============================================================
CREATE POLICY "quiz_results_select_own" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "quiz_results_insert_own" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "quiz_results_admin_all" ON quiz_results
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 23. RLS POLICIES - USER PROGRESS (own data only)
-- ============================================================
CREATE POLICY "user_progress_select_own" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_progress_insert_own" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_progress_update_own" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "user_progress_admin_all" ON user_progress
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 24. RLS POLICIES - PRONUNCIATION RESULTS (own data only)
-- ============================================================
CREATE POLICY "pronunciation_results_select_own" ON pronunciation_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "pronunciation_results_insert_own" ON pronunciation_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "pronunciation_results_admin_all" ON pronunciation_results
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 25. RLS POLICIES - MEDIA ASSETS (public read, admin write)
-- ============================================================
CREATE POLICY "media_assets_select_all" ON media_assets
  FOR SELECT USING (true);

CREATE POLICY "media_assets_admin_all" ON media_assets
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 26. RLS POLICIES - PDF UPLOADS (admin only)
-- ============================================================
CREATE POLICY "pdf_uploads_admin_all" ON pdf_uploads
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 27. STORAGE BUCKETS
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES
  ('lesson-images', 'lesson-images', true),
  ('lesson-audio', 'lesson-audio', true),
  ('pdf-uploads', 'pdf-uploads', false),
  ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 28. STORAGE RLS POLICIES
-- ============================================================
CREATE POLICY "lesson_images_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'lesson-images');

CREATE POLICY "lesson_images_admin_write" ON storage.objects
  FOR ALL USING (
    bucket_id = 'lesson-images' AND
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "lesson_audio_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'lesson-audio');

CREATE POLICY "lesson_audio_admin_write" ON storage.objects
  FOR ALL USING (
    bucket_id = 'lesson-audio' AND
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "certificates_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'certificates');

CREATE POLICY "certificates_authenticated_write" ON storage.objects
  FOR ALL USING (
    bucket_id = 'certificates' AND auth.role() = 'authenticated'
  );

CREATE POLICY "pdf_uploads_admin_all" ON storage.objects
  FOR ALL USING (
    bucket_id = 'pdf-uploads' AND
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 29. FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-create profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, created_at, updated_at)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student')
  ON CONFLICT DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_levels_updated_at ON levels;
CREATE TRIGGER update_levels_updated_at BEFORE UPDATE ON levels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_lessons_updated_at ON lessons;
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- 30. HELPER FUNCTION: Check if user is admin
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = user_uuid AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 31. SEED DATA - HSK 1 LEVEL
-- ============================================================
INSERT INTO levels (order_num, title_en, title_ar, description_en, description_ar, image_url, estimated_hours, is_premium)
VALUES (1, 'Chinese Basics', 'أساسيات الصينية', 'Learn the fundamentals of Chinese language with HSK 1 vocabulary, greetings, numbers, family, and introductions', 'تعلم أساسيات اللغة الصينية مع مفردات HSK 1 والتحيات والأرقام والعائلة والتعاريف', '/images/lesson-chinese-basics.jpg', 4, false)
ON CONFLICT DO NOTHING;

-- Note: After running this migration, you need to:
-- 1. Create a user in Supabase Auth with your email
-- 2. Run the admin INSERT below to make yourself admin
-- 3. Seed lessons data (use the admin panel or import)

-- ============================================================
-- 32. MAKE YOURSELF ADMIN (run after creating your account)
-- ============================================================
-- REPLACE 'YOUR-USER-UUID-HERE' with your actual user UUID from auth.users
-- Or use the function below after signing up:

-- Option A: If you know your UUID:
-- INSERT INTO user_roles (user_id, role) VALUES ('YOUR-USER-UUID', 'admin');

-- Option B: After signing up, run this with your email:
-- INSERT INTO user_roles (user_id, role)
-- SELECT id, 'admin' FROM auth.users WHERE email = 'your-email@example.com'
-- ON CONFLICT DO NOTHING;
