export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "admin" | "student";
export type VideoType = "youtube" | "upload" | "bunnystream";
export type AttendanceStatus = "present" | "absent" | "late";
export type FeeStatus = "paid" | "pending" | "overdue";
export type DoubtStatus = "pending" | "answered" | "closed";

export interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  class_grade: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_approved: boolean;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
}

export interface Batch {
  id: string;
  name: string;
  category: string;
  class_level: string;
  description: string | null;
  thumbnail_url: string | null;
  price: number;
  original_price: number;
  duration: string | null;
  start_date: string | null;
  badge: string | null;
  is_active: boolean;
  is_popular: boolean;
  order_index: number;
  created_at: string;
  features?: BatchFeature[];
}

export interface BatchFeature {
  id: string;
  batch_id: string;
  feature_text: string;
  order_index: number;
}

export interface Enrollment {
  id: string;
  student_id: string;
  batch_id: string;
  enrolled_at: string;
  valid_till: string | null;
  status: string;
  student?: Profile;
  batch?: Batch;
}

export interface Subject {
  id: string;
  batch_id: string;
  name: string;
  order_index: number;
  created_at: string;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  subject_id: string;
  name: string;
  order_index: number;
  created_at: string;
  lectures?: Lecture[];
  notes?: Note[];
}

export interface Lecture {
  id: string;
  chapter_id: string;
  title: string;
  description: string | null;
  video_type: VideoType;
  video_url: string;
  duration: string;
  order_index: number;
  is_free_preview: boolean;
  created_at: string;
}

export interface Note {
  id: string;
  chapter_id: string;
  title: string;
  file_url: string;
  file_size: string | null;
  order_index: number;
  created_at: string;
}

export interface LiveClass {
  id: string;
  batch_id: string;
  title: string;
  meeting_link: string;
  meeting_platform: string;
  starts_at: string;
  ends_at: string | null;
  recording_url: string | null;
  created_at: string;
  batch?: Batch;
}

export interface Test {
  id: string;
  batch_id: string;
  title: string;
  duration_minutes: number;
  total_marks: number;
  negative_marking: number;
  starts_at: string;
  ends_at: string | null;
  is_active: boolean;
  created_at: string;
  batch?: Batch;
  questions?: Question[];
}

export interface Question {
  id: string;
  test_id: string;
  question_text: string;
  image_url: string | null;
  options: { id: string; text: string }[];
  correct_option: string;
  marks: number;
  order_index: number;
  created_at: string;
}

export interface TestAttempt {
  id: string;
  test_id: string;
  student_id: string;
  answers: Record<string, string>;
  score: number;
  total_correct: number;
  total_wrong: number;
  total_skipped: number;
  submitted_at: string;
  created_at: string;
  student?: Profile;
  test?: Test;
}

export interface Doubt {
  id: string;
  student_id: string;
  batch_id: string;
  chapter_id: string | null;
  question: string;
  image_url: string | null;
  answer: string | null;
  answered_by: string | null;
  answered_at: string | null;
  status: DoubtStatus;
  created_at: string;
  student?: Profile;
  batch?: Batch;
  chapter?: Chapter;
}

export interface AttendanceRecord {
  id: string;
  batch_id: string;
  student_id: string;
  date: string;
  status: AttendanceStatus;
  created_at: string;
  student?: Profile;
}

export interface FeeRecord {
  id: string;
  student_id: string;
  batch_id: string;
  amount: number;
  due_date: string;
  paid_on: string | null;
  status: FeeStatus;
  payment_id: string | null;
  payment_mode: string;
  remarks: string | null;
  created_at: string;
  student?: Profile;
  batch?: Batch;
}

export interface Notice {
  id: string;
  batch_id: string | null;
  title: string;
  body: string;
  is_pinned: boolean;
  created_at: string;
  batch?: Batch;
}

export interface LectureProgress {
  id: string;
  student_id: string;
  lecture_id: string;
  completed: boolean;
  watched_seconds: number;
  updated_at: string;
}

// CMS Types
export interface SiteSettings {
  id: number;
  tuition_name: string;
  tagline: string;
  short_description: string;
  logo_url: string | null;
  phone: string;
  alternate_phone: string;
  whatsapp_number: string;
  whatsapp_prefilled_text: string;
  email: string;
  address: string;
  working_hours: string;
  google_map_embed_url: string;
  primary_color: string;
  social_links: {
    youtube?: string;
    instagram?: string;
    telegram?: string;
    facebook?: string;
  };
  updated_at: string;
}

export interface HeroSlide {
  id: string;
  badge: string;
  headline: string;
  highlight_word: string;
  subheadline: string;
  primary_cta_text: string;
  primary_cta_href: string;
  secondary_cta_text: string;
  secondary_cta_href: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface StatRecord {
  id: string;
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  description: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface FacultyRecord {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  bio: string | null;
  avatar_url: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface TopperRecord {
  id: string;
  name: string;
  score: string;
  exam: string;
  year: string;
  rank: string | null;
  testimonial_snippet: string | null;
  avatar_url: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface TestimonialRecord {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  batch: string;
  avatar_url: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface FaqRecord {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface GalleryRecord {
  id: string;
  title: string;
  category: string;
  image_url: string;
  aspect: "tall" | "wide" | "square";
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface SectionSetting {
  section_key: string;
  is_visible: boolean;
  custom_title: string | null;
  custom_subtitle: string | null;
  order_index: number;
  updated_at: string;
}

