# NiHao - Bilingual Chinese Learning Platform

> 你好 | Learn Chinese with audio, Pinyin, Arabic & English translations

A production-ready bilingual Chinese learning platform with Supabase backend, real authentication, persistent data, and admin panel.

---

## Framework

- **React 19** + TypeScript
- **Vite 7** (build tool)
- **Tailwind CSS 3** + shadcn/ui
- **Framer Motion** (animations)
- **Supabase** (backend, auth, database, storage)
- **React Router v6** (SPA routing)
- **Web Speech API** (pronunciation)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 3.4 + shadcn/ui |
| Routing | React Router v6 (SPA) |
| Animations | Framer Motion |
| WebGL | Native WebGL (hero shader) |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| Audio | Web Speech API (free, browser-native) |
| Icons | Lucide React |
| Fonts | Barlow Condensed, Inter, Noto Sans Arabic, Noto Serif SC |

---

## Quick Start

### 1. Prerequisites

- Node.js 20+
- A Supabase account (free at [supabase.com](https://supabase.com))

### 2. Install

```bash
git clone https://github.com/chefdz28/nihao-learn.git
cd nihao-learn
npm install
```

### 3. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to **Project Settings → API**
3. Copy the **URL** and **anon/public** key
4. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

5. Fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
ADMIN_EMAIL=your-email@example.com
```

### 4. Run Database Migration

1. In Supabase, go to the **SQL Editor**
2. Open the file `supabase/migration.sql` from this project
3. Copy the entire contents and paste into the SQL Editor
4. Click **Run**

This creates all tables, indexes, triggers, RLS policies, and storage buckets.

### 5. Create Your Admin Account

1. Start the dev server: `npm run dev`
2. Go to `http://localhost:5173/register`
3. Sign up with your email and password
4. Go back to Supabase **Table Editor → `user_roles`**
5. Click **Insert → Row**
6. Set `user_id` to your user's UUID (find it in **Auth → Users**)
7. Set `role` to `admin`
8. Click **Save**

Or run this SQL in the SQL Editor:

```sql
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'your-email@example.com'
ON CONFLICT DO NOTHING;
```

### 6. Seed Initial Data

After logging in as admin, go to `/admin` and use the **Lessons** tab to add your first level and lessons. Or seed via SQL:

```sql
-- Add a level
INSERT INTO levels (order_num, title_en, title_ar, description_en, description_ar, estimated_hours, is_premium)
VALUES (1, 'Chinese Basics', 'أساسيات الصينية', 'Learn fundamentals', 'تعلم الأساسيات', 4, false);

-- Then add lessons, vocabulary, sentences, and quiz questions via the admin panel
```

### 7. Local Development

```bash
npm run dev
# Open http://localhost:5173
```

### 8. Production Build

```bash
npm run build
# Output folder: dist/
```

---

## RunCloud Deployment Settings

### Git Repository Settings

| Setting | Value |
|---------|-------|
| **Source** | GitHub |
| **Repository** | `chefdz28/nihao-learn` |
| **Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Webroot** | `dist` |
| **Node Version** | `20` |

### Nginx SPA Routing (Important!)

Add this to your RunCloud **Nginx Configuration**:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Environment Variables on RunCloud

Add these to your RunCloud environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Your Supabase anon/public key |

---

## Project Structure

```
nihao-learn/
├── public/                    # Static assets (images, videos, 404.html)
│   ├── images/                # Lesson illustrations, backgrounds
│   ├── videos/                # Hero video
│   └── 404.html               # SPA fallback
├── supabase/
│   └── migration.sql          # Full database setup
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx    # Auth provider (Supabase)
│   ├── components/            # Reusable components
│   │   ├── Header.tsx         # Navigation with auth state
│   │   ├── Footer.tsx         # Site footer
│   │   ├── Layout.tsx         # Page layout wrapper
│   │   └── AudioButton.tsx    # Text-to-speech button
│   ├── data/                  # Static data (fallback)
│   ├── hooks/                 # Custom React hooks
│   ├── i18n/                  # Internationalization
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client config
│   │   └── dataService.ts     # All Supabase CRUD operations
│   ├── pages/                 # Route pages (17 pages)
│   ├── types/                 # TypeScript definitions
│   │   ├── index.ts           # App types
│   │   ├── supabase.ts        # Database types
│   │   └── speech.d.ts        # SpeechRecognition types
│   ├── App.tsx                # Root component with routes
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── .env.example               # Environment variable template
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

---

## Available Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Home | Public |
| `/courses` | Courses | Public |
| `/courses/:levelId/:lessonId` | Lesson | Public (tracks progress if logged in) |
| `/quiz/:levelId` | Quiz | Public (saves if logged in) |
| `/vocabulary` | Vocabulary | Public |
| `/practice` | Practice | Public |
| `/pronunciation` | Pronunciation | Public (saves if logged in) |
| `/login` | Login | Redirects if authenticated |
| `/register` | Register | Redirects if authenticated |
| `/dashboard` | Dashboard | **Requires login** |
| `/profile` | Profile | **Requires login** |
| `/results` | Quiz Results | **Requires login** |
| `/certificate` | Certificate | **Requires login** |
| `/admin` | Admin Panel | **Requires admin role** |
| `/about`, `/blog`, `/contact`, `/faq` | Static pages | Public |

---

## Database Schema

### Tables

| Table | Purpose |
|-------|---------|
| `profiles` | User profile data (extends auth.users) |
| `user_roles` | User roles (admin/student) |
| `levels` | Course levels (HSK 1, HSK 2, etc.) |
| `lessons` | Individual lessons |
| `vocabulary` | Chinese words per lesson |
| `sentences` | Example sentences per lesson |
| `quiz_questions` | Quiz questions with options |
| `quiz_results` | Student quiz scores |
| `user_progress` | Student lesson progress |
| `pronunciation_results` | Pronunciation test scores |
| `media_assets` | Uploaded images/audio/video |
| `pdf_uploads` | Uploaded PDF books |

### Storage Buckets

| Bucket | Access | Purpose |
|--------|--------|---------|
| `lesson-images` | Public read, Admin write | Lesson illustrations |
| `lesson-audio` | Public read, Admin write | Audio files |
| `certificates` | Public read, Auth write | Generated certificates |
| `pdf-uploads` | Admin only | Uploaded textbooks |

### Security

- **Row Level Security (RLS)** enabled on all tables
- Students can only read published lessons and their own data
- Admin can manage all content
- Authentication via Supabase Auth (email/password)
- Auto-profile creation on signup via database trigger

---

## Admin Panel Features

- **Overview**: Stats dashboard with student activity
- **Lessons**: CRUD for levels and lessons (published/draft status)
- **Vocabulary**: Search, add, edit, delete words
- **Exercises**: Build quiz questions per lesson
- **Upload PDF**: Upload textbooks to Supabase Storage
- **Settings**: Export all data as JSON

---

## Authentication Flow

1. User registers at `/register` → Supabase Auth creates account
2. Database trigger auto-creates profile + assigns `student` role
3. User logs in at `/login` → JWT token stored in localStorage
4. AuthContext provides user state to all components
5. Protected routes redirect unauthenticated users
6. Admin routes redirect non-admin users

---

## Bilingual Support

- **Languages:** English (LTR) and Arabic (RTL)
- **Switch:** Header language toggle (EN / عربي)
- **Fonts:** Barlow Condensed (headings), Inter (body), Noto Sans Arabic (Arabic), Noto Serif SC (Chinese)
- **i18n System:** React Context with `useI18n()` hook

---

## Audio System

- Uses **Web Speech API** (free, built into browsers)
- No external audio files needed
- Click any speaker icon to hear Chinese pronunciation
- Works on vocabulary tables, example sentences, and pronunciation tests

---

## License

All rights reserved. NiHao Learning Platform.
