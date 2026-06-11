# NiHao Supabase MVP - Test Checklist

## Pre-Test Setup
- [ ] Run `supabase/migration.sql` in Supabase SQL Editor
- [ ] Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`
- [ ] Create admin account via SQL: `INSERT INTO user_roles (user_id, role) SELECT id, 'admin' FROM auth.users WHERE email = 'YOUR_EMAIL'`
- [ ] Seed at least one level and lesson via admin panel

## Authentication Tests
- [ ] Register new student account at `/register`
- [ ] Check email confirmation (if enabled) or auto-login
- [ ] Login at `/login` with valid credentials
- [ ] Login with invalid credentials shows error
- [ ] Logout from header clears session
- [ ] Authenticated user redirected from `/login` to `/dashboard`
- [ ] Unauthenticated user redirected from `/dashboard` to `/login`
- [ ] Unauthenticated user redirected from `/admin` to `/dashboard`

## Student Dashboard (`/dashboard`)
- [ ] Shows welcome message with user's name
- [ ] Displays lesson completion count
- [ ] Shows average quiz score
- [ ] Shows streak (static for MVP)
- [ ] Shows "Continue Learning" with next lesson
- [ ] Lists recent quiz results
- [ ] Shows lesson progress bars
- [ ] Shows achievements
- [ ] Shows weak areas to practice

## Courses (`/courses`)
- [ ] Loads levels from Supabase
- [ ] Shows lesson count per level
- [ ] "Start Learning" button links to first lesson
- [ ] Premium levels show lock badge

## Lesson Page (`/courses/:levelId/:lessonId`)
- [ ] Loads lesson data from Supabase
- [ ] Shows title (EN + AR)
- [ ] Shows vocabulary table with audio buttons
- [ ] Shows example sentences with audio
- [ ] Writing practice canvas works
- [ ] Quiz questions load from Supabase
- [ ] Quiz score saves to `quiz_results` table
- [ ] Quiz progress saves to `user_progress` table
- [ ] Passing score (70%+) marks lesson as completed

## Vocabulary (`/vocabulary`)
- [ ] Loads all vocabulary from Supabase
- [ ] Search filters by Chinese, Pinyin, Arabic, English
- [ ] Audio button works on each card

## Pronunciation (`/pronunciation`)
- [ ] Loads vocabulary from Supabase
- [ ] Previous/Next navigation works
- [ ] Listen button speaks Chinese
- [ ] Record button activates (or simulates)
- [ ] Score displays after recording
- [ ] Result saves to `pronunciation_results` table

## Quiz (`/quiz/:levelId`)
- [ ] Loads questions from Supabase
- [ ] Progress bar updates
- [ ] Correct/incorrect feedback shows
- [ ] Final score displays
- [ ] Result saves to `quiz_results`
- [ ] `user_progress` updates after quiz

## Admin Panel (`/admin`)
- [ ] Only accessible by admin users
- [ ] **Overview tab**: Shows stats (lessons, vocab, students, results)
- [ ] **Lessons tab**: Lists lessons by level
- [ ] Can add new lesson
- [ ] Can edit lesson (title, objective, status, etc.)
- [ ] Can delete lesson
- [ ] **Vocabulary tab**: Lists all words
- [ ] Can add new word
- [ ] Can edit word
- [ ] Can delete word
- [ ] Search filters vocabulary
- [ ] **Exercises tab**: Lists quiz questions per lesson
- [ ] Can add new quiz question
- [ ] Can delete quiz question
- [ ] **Upload tab**: Can upload PDF files
- [ ] **Settings tab**: Shows platform info
- [ ] Can export data as JSON

## Profile (`/profile`)
- [ ] Shows user info (name, email, role)
- [ ] Can update full name
- [ ] Shows quiz count, avg score, completed lessons

## Results (`/results`)
- [ ] Shows quiz history with scores
- [ ] Shows pronunciation history
- [ ] Shows stats cards

## Security
- [ ] Student cannot access `/admin`
- [ ] Student can only see published lessons
- [ ] Student can only see own quiz results
- [ ] Student can only see own progress
- [ ] Admin can see all data
- [ ] API requests without auth token are rejected for protected routes
