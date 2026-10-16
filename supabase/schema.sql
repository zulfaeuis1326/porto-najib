-- ============================================================
-- Portfolio CMS — skema database (Supabase / PostgreSQL)
-- Jalankan sekali di Supabase: Dashboard -> SQL Editor -> New query
-- ============================================================

-- ===== Profil (satu baris, id='main') =====
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  headline TEXT NOT NULL DEFAULT '',
  bio TEXT NOT NULL DEFAULT '',
  photo_url TEXT NOT NULL DEFAULT '',
  cv_url TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  links JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- ===== Proyek =====
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  cover_url TEXT NOT NULL DEFAULT '',
  images TEXT[] NOT NULL DEFAULT '{}',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  demo_url TEXT NOT NULL DEFAULT '',
  repo_url TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects(sort_order);

-- ===== Artikel =====
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_url TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  read_time INTEGER NOT NULL DEFAULT 5,
  published_at DATE NOT NULL DEFAULT CURRENT_DATE
);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC);

-- ===== Skill =====
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'other',
  level TEXT NOT NULL DEFAULT 'beginner',
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ===== Pengalaman (kerja + pendidikan) =====
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL DEFAULT 'work',
  title TEXT NOT NULL DEFAULT '',
  organization TEXT NOT NULL DEFAULT '',
  start_date DATE,
  end_date DATE,
  description TEXT NOT NULL DEFAULT '',
  current BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ===== Pesan masuk (form kontak) =====
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);

-- ============================================================
-- Row Level Security: publik hanya boleh BACA konten + KIRIM pesan.
-- Tulis/hapus/baca pesan hanya via service_role (dipakai server admin).
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read profiles" ON profiles;
CREATE POLICY "public read profiles" ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "public read projects" ON projects;
CREATE POLICY "public read projects" ON projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "public read articles" ON articles;
CREATE POLICY "public read articles" ON articles FOR SELECT USING (true);

DROP POLICY IF EXISTS "public read skills" ON skills;
CREATE POLICY "public read skills" ON skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "public read experiences" ON experiences;
CREATE POLICY "public read experiences" ON experiences FOR SELECT USING (true);

DROP POLICY IF EXISTS "public insert messages" ON messages;
CREATE POLICY "public insert messages" ON messages FOR INSERT WITH CHECK (true);
