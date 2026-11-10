-- ==============================================================================
-- STA CLASSES - COMPLETE SUPABASE DATABASE SCHEMA
-- Includes: Core Coaching Platform + Dynamic Website CMS + RLS Policies + Storage
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & HELPERS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'student');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE video_type_enum AS ENUM ('youtube', 'upload', 'bunnystream');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE attendance_status_enum AS ENUM ('present', 'absent', 'late');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE fee_status_enum AS ENUM ('paid', 'pending', 'overdue');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE doubt_status_enum AS ENUM ('pending', 'answered', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. CORE PLATFORM TABLES
-- ==============================================================================

-- PROFILES (Linked to Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    class_grade TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'student'::user_role NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE NOT NULL,
    is_blocked BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- BATCHES
CREATE TABLE IF NOT EXISTS public.batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT DEFAULT 'class-10' NOT NULL,
    class_level TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    price NUMERIC(10, 2) DEFAULT 0 NOT NULL,
    original_price NUMERIC(10, 2) DEFAULT 0 NOT NULL,
    duration TEXT,
    start_date TEXT,
    badge TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_popular BOOLEAN DEFAULT FALSE NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- BATCH FEATURES
CREATE TABLE IF NOT EXISTS public.batch_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
    feature_text TEXT NOT NULL,
    order_index INT DEFAULT 0 NOT NULL
);

-- ENROLLMENTS
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
    enrolled_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    valid_till TIMESTAMPTZ,
    status TEXT DEFAULT 'active' NOT NULL,
    UNIQUE(student_id, batch_id)
);

-- SUBJECTS
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- CHAPTERS
CREATE TABLE IF NOT EXISTS public.chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- LECTURES
CREATE TABLE IF NOT EXISTS public.lectures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    video_type video_type_enum DEFAULT 'youtube'::video_type_enum NOT NULL,
    video_url TEXT NOT NULL,
    duration TEXT DEFAULT '45 mins',
    order_index INT DEFAULT 0 NOT NULL,
    is_free_preview BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- NOTES (PDFs & Documents)
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size TEXT,
    order_index INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- LIVE CLASSES
CREATE TABLE IF NOT EXISTS public.live_classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    meeting_link TEXT NOT NULL,
    meeting_platform TEXT DEFAULT 'Google Meet' NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ,
    recording_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- TESTS / EXAMINATIONS
CREATE TABLE IF NOT EXISTS public.tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    duration_minutes INT DEFAULT 60 NOT NULL,
    total_marks INT DEFAULT 100 NOT NULL,
    negative_marking NUMERIC(4, 2) DEFAULT 0.25 NOT NULL,
    starts_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    ends_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- QUESTIONS
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES public.tests(id) ON DELETE CASCADE NOT NULL,
    question_text TEXT NOT NULL,
    image_url TEXT,
    options JSONB NOT NULL, -- e.g. [{"id": "A", "text": "..."}, {"id": "B", "text": "..."}]
    correct_option TEXT NOT NULL, -- "A", "B", "C", "D"
    marks INT DEFAULT 4 NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- TEST ATTEMPTS
CREATE TABLE IF NOT EXISTS public.test_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES public.tests(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    answers JSONB DEFAULT '{}'::jsonb NOT NULL,
    score NUMERIC(6, 2) DEFAULT 0 NOT NULL,
    total_correct INT DEFAULT 0 NOT NULL,
    total_wrong INT DEFAULT 0 NOT NULL,
    total_skipped INT DEFAULT 0 NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- DOUBTS
CREATE TABLE IF NOT EXISTS public.doubts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE SET NULL,
    question TEXT NOT NULL,
    image_url TEXT,
    answer TEXT,
    answered_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    answered_at TIMESTAMPTZ,
    status doubt_status_enum DEFAULT 'pending'::doubt_status_enum NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ATTENDANCE
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    status attendance_status_enum DEFAULT 'present'::attendance_status_enum NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(batch_id, student_id, date)
);

-- FEES
CREATE TABLE IF NOT EXISTS public.fees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    paid_on DATE,
    status fee_status_enum DEFAULT 'pending'::fee_status_enum NOT NULL,
    payment_id TEXT,
    payment_mode TEXT DEFAULT 'UPI', -- 'Cash', 'UPI', 'Razorpay', 'Card'
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- NOTICES & ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE, -- NULL = Broadcast to all
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- LECTURE PROGRESS
CREATE TABLE IF NOT EXISTS public.lecture_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    lecture_id UUID REFERENCES public.lectures(id) ON DELETE CASCADE NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    watched_seconds INT DEFAULT 0 NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(student_id, lecture_id)
);

-- ==============================================================================
-- 4. WEBSITE CMS TABLES (Full Dynamic Control from Admin Panel)
-- ==============================================================================

-- SITE SETTINGS (Singleton Row)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    tuition_name TEXT DEFAULT 'STA Classes' NOT NULL,
    tagline TEXT DEFAULT 'Empowering Minds, Shaping Achievers',
    short_description TEXT DEFAULT 'Premier coaching institute delivering concept-first learning, personalized attention, and proven academic excellence for Class 9–12 and competitive foundations.',
    logo_url TEXT,
    phone TEXT DEFAULT '+91 98765 43210',
    alternate_phone TEXT DEFAULT '+91 87654 32109',
    whatsapp_number TEXT DEFAULT '919876543210',
    whatsapp_prefilled_text TEXT DEFAULT 'Hello STA Classes! I would like to inquire about batch admissions.',
    email TEXT DEFAULT 'admissions@staclasses.com',
    address TEXT DEFAULT 'Plot 42, Education Hub, Near Central Park, M.G. Road, Lucknow, Uttar Pradesh - 226001',
    working_hours TEXT DEFAULT 'Monday – Saturday: 8:00 AM – 8:00 PM | Sunday: 9:00 AM – 2:00 PM',
    google_map_embed_url TEXT DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.23192078652!2d80.8715876008139!3d26.848596489370605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    primary_color TEXT DEFAULT '#5B3DF5',
    social_links JSONB DEFAULT '{"youtube":"https://youtube.com/@staclasses","instagram":"https://instagram.com/staclasses","telegram":"https://t.me/staclasses","facebook":"https://facebook.com/staclasses"}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- HERO SLIDES & CONTENT
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    badge TEXT DEFAULT 'Admissions Open for Session 2026–27',
    headline TEXT DEFAULT 'Transform Your Potential into Top Ranks with',
    highlight_word TEXT DEFAULT 'STA Classes',
    subheadline TEXT DEFAULT 'Experience structured offline and online learning designed for conceptual mastery. Live interactive sessions, detailed chapter notes, rigorous test series, and 1-on-1 doubt resolution.',
    primary_cta_text TEXT DEFAULT 'Join Now',
    primary_cta_href TEXT DEFAULT '#contact',
    secondary_cta_text TEXT DEFAULT 'Explore Batches',
    secondary_cta_href TEXT DEFAULT '#batches',
    order_index INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- STATS COUNTERS
CREATE TABLE IF NOT EXISTS public.stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    value NUMERIC(10, 1) NOT NULL,
    suffix TEXT DEFAULT '+' NOT NULL,
    decimals INT DEFAULT 0 NOT NULL,
    label TEXT NOT NULL,
    description TEXT,
    order_index INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- FACULTY MEMBERS
CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    qualification TEXT NOT NULL,
    experience TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- TOPPERS / RESULTS
CREATE TABLE IF NOT EXISTS public.toppers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    score TEXT NOT NULL,
    exam TEXT NOT NULL,
    year TEXT DEFAULT '2025' NOT NULL,
    rank TEXT,
    testimonial_snippet TEXT,
    avatar_url TEXT NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    rating INT DEFAULT 5 NOT NULL,
    quote TEXT NOT NULL,
    batch TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- FAQS
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'admissions' NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- GALLERY IMAGES
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    aspect TEXT DEFAULT 'wide' NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ANNOUNCEMENTS BANNER
CREATE TABLE IF NOT EXISTS public.announcements_banner (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    text TEXT NOT NULL,
    link_text TEXT,
    link_url TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- SECTION SETTINGS (Show/Hide toggles and custom headers)
CREATE TABLE IF NOT EXISTS public.section_settings (
    section_key TEXT PRIMARY KEY,
    is_visible BOOLEAN DEFAULT TRUE NOT NULL,
    custom_title TEXT,
    custom_subtitle TEXT,
    order_index INT DEFAULT 0 NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) & HELPER FUNCTIONS
-- ==============================================================================

-- Helper Function: Check if currently authenticated user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Auto-create profile trigger on auth.users sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, class_grade, avatar_url, role, is_approved)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student User'),
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'class_grade',
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'::user_role),
    -- First user or designated email can be auto-approved, default false for student safety
    FALSE
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batch_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doubts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lecture_progress ENABLE ROW LEVEL SECURITY;

-- Website CMS Tables RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.toppers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements_banner ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_settings ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 6. RLS POLICIES
-- ==============================================================================

-- --- ADMIN ACCESS (Universal Full Access) ---
-- Admin can do everything on all tables
CREATE POLICY "Admin full access on profiles" ON public.profiles FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on batches" ON public.batches FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on batch_features" ON public.batch_features FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on enrollments" ON public.enrollments FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on subjects" ON public.subjects FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on chapters" ON public.chapters FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on lectures" ON public.lectures FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on notes" ON public.notes FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on live_classes" ON public.live_classes FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on tests" ON public.tests FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on questions" ON public.questions FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on test_attempts" ON public.test_attempts FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on doubts" ON public.doubts FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on attendance" ON public.attendance FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on fees" ON public.fees FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on notices" ON public.notices FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on lecture_progress" ON public.lecture_progress FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Admin CMS Full Access
CREATE POLICY "Admin full access on site_settings" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on hero_slides" ON public.hero_slides FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on stats" ON public.stats FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on faculty" ON public.faculty FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on toppers" ON public.toppers FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on faqs" ON public.faqs FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on gallery_images" ON public.gallery_images FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on announcements_banner" ON public.announcements_banner FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin full access on section_settings" ON public.section_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- --- PUBLIC / ANONYMOUS READ POLICIES (Landing page & Visitor Access) ---
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT TO public USING (true);
CREATE POLICY "Public can view active hero slides" ON public.hero_slides FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public can view active stats" ON public.stats FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public can view active faculty" ON public.faculty FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public can view active toppers" ON public.toppers FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public can view active testimonials" ON public.testimonials FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public can view active faqs" ON public.faqs FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public can view active gallery images" ON public.gallery_images FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public can view active announcements" ON public.announcements_banner FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public can view section settings" ON public.section_settings FOR SELECT TO public USING (true);
CREATE POLICY "Public can view active batches" ON public.batches FOR SELECT TO public USING (is_active = true);
CREATE POLICY "Public can view batch features" ON public.batch_features FOR SELECT TO public USING (true);
CREATE POLICY "Public can view free preview lectures" ON public.lectures FOR SELECT TO public USING (is_free_preview = true);

-- --- STUDENT ACCESS POLICIES ---
-- Profiles: Students can read and update their own profile
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Enrollments: Students can view their own enrollments
CREATE POLICY "Students view own enrollments" ON public.enrollments FOR SELECT TO authenticated USING (auth.uid() = student_id);

-- Enrolled Course Content: Students can view curriculum of enrolled batches
CREATE POLICY "Students view enrolled subjects" ON public.subjects FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.enrollments WHERE enrollments.student_id = auth.uid() AND enrollments.batch_id = subjects.batch_id AND enrollments.status = 'active')
);
CREATE POLICY "Students view enrolled chapters" ON public.chapters FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.subjects JOIN public.enrollments ON enrollments.batch_id = subjects.batch_id WHERE subjects.id = chapters.subject_id AND enrollments.student_id = auth.uid() AND enrollments.status = 'active')
);
CREATE POLICY "Students view enrolled lectures" ON public.lectures FOR SELECT TO authenticated USING (
    is_free_preview = true OR EXISTS (
        SELECT 1 FROM public.chapters 
        JOIN public.subjects ON subjects.id = chapters.subject_id 
        JOIN public.enrollments ON enrollments.batch_id = subjects.batch_id 
        WHERE chapters.id = lectures.chapter_id AND enrollments.student_id = auth.uid() AND enrollments.status = 'active'
    )
);
CREATE POLICY "Students view enrolled notes" ON public.notes FOR SELECT TO authenticated USING (
    EXISTS (
        SELECT 1 FROM public.chapters 
        JOIN public.subjects ON subjects.id = chapters.subject_id 
        JOIN public.enrollments ON enrollments.batch_id = subjects.batch_id 
        WHERE chapters.id = notes.chapter_id AND enrollments.student_id = auth.uid() AND enrollments.status = 'active'
    )
);
CREATE POLICY "Students view enrolled live classes" ON public.live_classes FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.enrollments WHERE enrollments.student_id = auth.uid() AND enrollments.batch_id = live_classes.batch_id AND enrollments.status = 'active')
);
CREATE POLICY "Students view enrolled tests" ON public.tests FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.enrollments WHERE enrollments.student_id = auth.uid() AND enrollments.batch_id = tests.batch_id AND enrollments.status = 'active')
);
CREATE POLICY "Students view test questions" ON public.questions FOR SELECT TO authenticated USING (
    EXISTS (
        SELECT 1 FROM public.tests 
        JOIN public.enrollments ON enrollments.batch_id = tests.batch_id 
        WHERE tests.id = questions.test_id AND enrollments.student_id = auth.uid() AND enrollments.status = 'active'
    )
);

-- Attempts, Doubts, Attendance, Fees, Notices
CREATE POLICY "Students manage own attempts" ON public.test_attempts FOR ALL TO authenticated USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students manage own doubts" ON public.doubts FOR ALL TO authenticated USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students view own attendance" ON public.attendance FOR SELECT TO authenticated USING (auth.uid() = student_id);
CREATE POLICY "Students view own fees" ON public.fees FOR SELECT TO authenticated USING (auth.uid() = student_id);
CREATE POLICY "Students view relevant notices" ON public.notices FOR SELECT TO authenticated USING (
    batch_id IS NULL OR EXISTS (SELECT 1 FROM public.enrollments WHERE enrollments.student_id = auth.uid() AND enrollments.batch_id = notices.batch_id AND enrollments.status = 'active')
);
CREATE POLICY "Students track lecture progress" ON public.lecture_progress FOR ALL TO authenticated USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);

-- ==============================================================================
-- 7. INITIAL SEED DATA (Ready Out-of-the-Box)
-- ==============================================================================

-- Seed Site Settings
INSERT INTO public.site_settings (id, tuition_name, tagline, short_description, phone, alternate_phone, whatsapp_number, email, address, primary_color)
VALUES (
    1,
    'STA Classes',
    'Strong Fundamentals. Personal Attention. Lifelong Success.',
    'Dedicated coaching institute for Class 4th to 12th students. We build unbreakable concept foundations, guide disciplined study habits, and ensure school & board exam excellence with small batches and personalized teacher mentorship.',
    '+91 98765 43210',
    '+91 87654 32109',
    '919876543210',
    'admissions@staclasses.com',
    'Near Biryani Mahal, Block Ke Paas, Barh, Bihar - 803213',
    '#5B3DF5'
) ON CONFLICT (id) DO NOTHING;

-- Seed Section Settings
INSERT INTO public.section_settings (section_key, is_visible, custom_title, custom_subtitle, order_index) VALUES
('hero', true, 'Personalized Tuition & Concept Mastery', 'Admissions Open for Classes 4th to 12th', 1),
('stats', true, 'Proven Track Record of Excellence', 'Our numbers speak for our dedication', 2),
('batches', true, 'Explore Our Comprehensive Batches', 'Class 4th to 12th Academic & Board Batches', 3),
('faculty', true, 'Learn from Experienced Mentors', 'Subject teachers dedicated to small-batch learning', 4),
('results', true, 'Our School & Board Achievers', 'Celebrating the champions of STA Classes', 5),
('testimonials', true, 'What Parents & Students Say', 'Honest experiences from our learning community', 6),
('gallery', true, 'Life at STA Classes', 'Modern classrooms, labs, and student achievements', 7),
('faqs', true, 'Frequently Asked Questions', 'Clear answers to admissions, classes, and fees', 8),
('contact', true, 'Visit Campus or Request Callback', 'Our counselors are available 7 days a week', 9)
ON CONFLICT (section_key) DO NOTHING;

-- Seed Hero Slide
INSERT INTO public.hero_slides (badge, headline, highlight_word, subheadline, primary_cta_text, primary_cta_href, secondary_cta_text, secondary_cta_href, order_index, is_active)
VALUES (
    'Admissions Open for Classes 4th to 12th • Session 2026–27',
    'Personalized Tuition & Concept Mastery for',
    'Class 4 to 12',
    'Small batch learning where every child gets personal teacher guidance. Combining daily offline classroom teaching with our modern student mobile app for lecture replays, handwritten notes, weekly test series, and 1-on-1 doubt clearing.',
    'Enroll Your Child',
    '#contact',
    'View Classes & Batches',
    '#batches',
    1,
    true
) ON CONFLICT DO NOTHING;

-- Seed Stats
INSERT INTO public.stats (value, suffix, decimals, label, description, order_index, is_active) VALUES
(5000, '+', 0, 'Students Mentored', 'Across Board Exams & Entrance Foundations', 1, true),
(45, '+', 0, 'Active Batches', 'Tailored by grade level and learning pace', 2, true),
(98, '.4%', 1, 'Success & Pass Rate', 'Consistent distinction record year-over-year', 3, true),
(14, '+', 0, 'Years of Trust', 'Nurturing top state and district ranks since 2012', 4, true)
ON CONFLICT DO NOTHING;

-- Seed Faculty
INSERT INTO public.faculty (name, subject, qualification, experience, bio, avatar_url, order_index, is_active) VALUES
('Er. S. T. Agrawal', 'Physics & Mechanics', 'B.Tech (IIT Roorkee Alumni)', '14+ Years Teaching Experience', 'Renowned for simplifying complex rotational mechanics and electromagnetism with relatable everyday analogies.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80', 1, true),
('Dr. Ananya Sharma', 'Chemistry & Biochemistry', 'Ph.D. in Organic Chemistry', '11+ Years Teaching Experience', 'Master trainer whose students regularly score 98%+ in Chemistry. Expert in organic reaction mechanisms and visual mind maps.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80', 2, true),
('Prof. Rajesh Verma', 'Pure & Applied Mathematics', 'M.Sc. Mathematics (Gold Medalist)', '15+ Years Teaching Experience', 'Specializes in speed mathematics, calculus shortcuts, and eliminating math anxiety with progressive difficulty problem sets.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80', 3, true),
('Neha Rastogi', 'Biology & Life Sciences', 'M.Sc. Biotechnology', '9+ Years Teaching Experience', 'Brings NCERT line-by-line decoding, 3D anatomical charts, and mnemonics that make memorization effortless.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80', 4, true)
ON CONFLICT DO NOTHING;

-- Seed Toppers
INSERT INTO public.toppers (name, score, exam, year, rank, testimonial_snippet, avatar_url, order_index, is_active) VALUES
('Aarav Patel', '98.8%', 'Class 10 CBSE Board 2025', '2025', 'City Rank 1', 'The chapter tests and doubt sessions at STA Classes made the difference. Every concept was crystal clear before the exam.', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80', 1, true),
('Pooja Malhotra', '99.4 Percentile', 'JEE Mains (Physics 100/100)', '2025', 'AIR 842', 'Agrawal Sir''s Physics lectures removed all fear. The continuous tests and analysis report showed exactly where I was slipping.', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', 2, true),
('Rohan Deshmukh', '97.6%', 'Class 12 CBSE Science', '2025', 'District Rank 3', 'Handwritten notes and quick formula sheets saved hundreds of revision hours. STA Classes is the best decision I made.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', 3, true),
('Meera Kulkarni', '685 / 720', 'NEET UG Entrance', '2025', 'State Rank 24', 'Personal attention from teachers and prompt doubt clearance even late at night gave me tremendous confidence.', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80', 4, true)
ON CONFLICT DO NOTHING;

-- Seed Testimonials
INSERT INTO public.testimonials (name, role, rating, quote, batch, avatar_url, order_index, is_active) VALUES
('Sunil K. Verma', 'Parent of Class 10 Student', 5, 'As a parent, I love the regular attendance updates and weekly test performance messages on WhatsApp. STA Classes takes true accountability.', 'Class 10 Board Batch', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', 1, true),
('Tanvi Sharma', 'Student, Class 12 Science', 5, 'The digital app support alongside classroom lectures is phenomenal. When I missed a lecture due to fever, I watched it on the app without losing track.', 'Class 12th PCM', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 2, true),
('Vikram Singhania', 'Parent of JEE Aspirant', 5, 'The teachers are easily accessible and do not treat children as roll numbers. Highly disciplined yet compassionate learning atmosphere.', 'JEE Foundation Batch', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', 3, true)
ON CONFLICT DO NOTHING;

-- Seed FAQs
INSERT INTO public.faqs (question, answer, category, order_index, is_active) VALUES
('How do I enroll in a batch at STA Classes?', 'You can enroll online by clicking ''Join Now'' or ''Explore Batches'' on this website, or by visiting our campus directly. Once you choose your course, our admissions counselor will guide you through batch timing and study materials.', 'admissions', 1, true),
('Are both offline classroom and online live modes available?', 'Yes! STA Classes offers a hybrid model. Students enrolled in offline batches also get full access to live lecture broadcasts, recordings, chapter PDFs, and the digital doubt engine on our web and mobile app.', 'classes', 2, true),
('How does the Doubt Resolution System work?', 'Students can either ask questions directly in classroom sessions or take a photo of the problem in our app. Our subject faculty reviews the doubt and replies with step-by-step explanations promptly.', 'doubts', 3, true),
('What is the fee payment schedule and can it be paid in installments?', 'Yes, we support easy monthly or quarterly installment plans as well as one-time payment discounts. Payment can be made online via UPI/Card or at the campus counter.', 'fees', 4, true),
('Is there a scholarship or admission entrance test?', 'Yes, we conduct the STA Talent Scholarship Test (STST) every quarter offering up to 100% fee waivers for meritorious students across Class 9 to 12.', 'admissions', 5, true)
ON CONFLICT DO NOTHING;

-- Seed Gallery
INSERT INTO public.gallery_images (title, category, image_url, aspect, order_index, is_active) VALUES
('Interactive Classroom Session', 'Classroom', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80', 'wide', 1, true),
('Annual Toppers Felicitation Ceremony', 'Celebration', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', 'tall', 2, true),
('Science & Physics Demonstration Lab', 'Laboratory', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80', 'square', 3, true),
('Focused Study & Library Room', 'Campus', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80', 'tall', 4, true),
('1-on-1 Doubt Clearing Sessions', 'Mentorship', 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80', 'wide', 5, true),
('Sunday Mock Exam Test Arena', 'Examination', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80', 'square', 6, true)
ON CONFLICT DO NOTHING;

-- Seed Batches & Features
-- Seed Batches & Features (Class 4th to 12th)
INSERT INTO public.batches (id, name, category, class_level, description, price, original_price, duration, start_date, badge, is_popular, order_index, is_active)
VALUES 
('11111111-1111-1111-1111-111111111111', 'Class 4 & 5 Junior Foundation Program', 'junior', 'Class 4th – 5th', 'Nurturing curiosity, strong mental maths, basic science exploration, reading comprehension, and daily homework guidance.', 0, 0, 'Full Session 2026–27', 'New Admissions Open', 'Junior Foundation', false, 1, true),
('22222222-2222-2222-2222-222222222222', 'Class 6, 7 & 8 Middle School Mastery', 'middle', 'Class 6th – 8th', 'Complete coverage of Science, Mathematics, English & Social Science with analytical skills for Olympiads and school exams.', 0, 0, 'Full Session 2026–27', 'New Admissions Open', 'Concept Booster', true, 2, true),
('33333333-3333-3333-3333-333333333333', 'Class 9 & 10 Board Excellence Program', 'secondary', 'Class 9th & 10th', 'Targeted CBSE, ICSE & State Board preparation. Intensive focus on Science and Mathematics with past papers and sample drills.', 0, 0, 'Full Session 2026–27', 'New Admissions Open', 'Board Special', true, 3, true),
('44444444-4444-4444-4444-444444444444', 'Class 11 & 12 Board & Career Foundation', 'senior', 'Class 11th & 12th', 'Advanced coaching for Science and Commerce streams. Structured to secure 95%+ in Board exams with strong fundamentals.', 0, 0, 'Full Session 2026–27', 'New Admissions Open', 'Senior Wing', false, 4, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.batch_features (batch_id, feature_text, order_index) VALUES
('11111111-1111-1111-1111-111111111111', 'Interactive Activity-Based Learning', 1),
('11111111-1111-1111-1111-111111111111', 'Mental Maths & Speed Arithmetic Drills', 2),
('11111111-1111-1111-1111-111111111111', 'English Grammar & Reading Habits', 3),
('11111111-1111-1111-1111-111111111111', 'Daily Homework Assistance', 4),
('11111111-1111-1111-1111-111111111111', 'Weekly Friendly Progress Quizzes', 5),

('22222222-2222-2222-2222-222222222222', 'NCERT & Exemplar Concept Building', 1),
('22222222-2222-2222-2222-222222222222', 'Science Lab Demonstrations & Visual Models', 2),
('22222222-2222-2222-2222-222222222222', 'Mathematics Step-by-Step Problem Solving', 3),
('22222222-2222-2222-2222-222222222222', 'Weekly Chapter Revision Tests', 4),
('22222222-2222-2222-2222-222222222222', 'Regular WhatsApp Updates for Parents', 5),

('33333333-3333-3333-3333-333333333333', 'In-Depth Chapter Analysis & Derivations', 1),
('33333333-3333-3333-3333-333333333333', 'Handwritten Revision Notes & Formula Booklets', 2),
('33333333-3333-3333-3333-333333333333', 'Weekly Subjective Answer Writing Practice', 3),
('33333333-3333-3333-3333-333333333333', 'Past 10 Years Board Papers Solving', 4),
('33333333-3333-3333-3333-333333333333', '1-on-1 Faculty Doubt Clearing After Class', 5),

('44444444-4444-4444-4444-444444444444', 'Comprehensive Syllabus Coverage by Senior Mentors', 1),
('44444444-4444-4444-4444-444444444444', 'NCERT Line-by-Line Decoded Study Notes', 2),
('44444444-4444-4444-4444-444444444444', 'Bi-Weekly Timed Exam Pattern Tests', 3),
('44444444-4444-4444-4444-444444444444', 'Personalized Academic Mentor Support', 4),
('44444444-4444-4444-4444-444444444444', 'Complete Board Practical & Viva Guidance', 5)
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- 11. PREVIOUS YEAR QUESTIONS (PYQs) TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.pyqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    exam_year TEXT NOT NULL,
    board_exam TEXT NOT NULL DEFAULT 'CBSE Board',
    file_url TEXT NOT NULL,
    solution_url TEXT,
    order_index INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pyqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access on pyqs" ON public.pyqs FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Students and public can view pyqs" ON public.pyqs FOR SELECT TO public USING (true);


