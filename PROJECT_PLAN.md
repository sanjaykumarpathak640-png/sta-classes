# STA Classes - Online Coaching Platform Architecture

> **Platform Name:** STA Classes  
> **Brand Color:** `#5B3DF5` (Modern Ed-Tech Purple)  
> **Design Philosophy:** Mobile-first, rounded-2xl cards, Poppins font, Capacitor-ready for Android APK.

---

## 🛠️ Tech Stack Overview

- **Frontend Framework:** Next.js 14 (App Router) + TypeScript
- **Styling & UI:** Tailwind CSS, shadcn/ui, `lucide-react` icons
- **Backend & Database:** Supabase (PostgreSQL, Auth, Storage, Edge Functions) via `@supabase/ssr`
- **Video Delivery:** YouTube Unlisted / Embeds (Initial phase), Bunny Stream ready (Phase 8)
- **Payment Gateway:** Razorpay (Checkout, Orders API, Webhooks)
- **Mobile App:** Progressive Web App (PWA) -> Capacitor Android APK
- **Hosting:** Vercel

---

## 👥 Roles & Feature Matrix

| Feature | Student Experience | Admin / Teacher Capabilities |
| :--- | :--- | :--- |
| **Authentication** | Email/password, phone, class selection, profile view | Approve/reject signups, block/unblock students |
| **Batches** | View enrolled courses, explore new batches | Create/edit/archive batches with thumbnail, pricing |
| **Lectures** | Watch subject > chapter > lecture videos, mark completed | Add YouTube unlisted URLs or video uploads, reorder |
| **Notes & PDFs** | View & download chapter notes in-app (signed URLs) | Upload study materials to private Supabase bucket |
| **Live Classes** | Timetable view, 1-click meeting join (10m before) | Schedule live session with Google Meet/Zoom/YT link |
| **Tests & Quizzes** | Timed CBT interface, auto-submit, rank, review | Create MCQ tests, single/bulk question import |
| **Doubt Engine** | Ask questions with photo attachments, status alerts | Inbox for doubts, reply with text/images |
| **Attendance & Fees** | Attendance %, monthly calendar, fee dues/receipts | Daily attendance marking, fee records, WhatsApp alerts |
| **Notices** | Central notice board with unread badges | Broadcast announcements to batch or all students |
| **Payments** | Buy batches with Razorpay (UPI, Cards, Netbanking) | Payment ledger, revenue analytics, coupon codes |

---

## 📅 10-Phase Roadmap & Status

### ✅ Phase 1: Project Setup + Master Plan (COMPLETED)
- [x] Initialized Next.js 14 with TypeScript, Tailwind CSS, App Router, `src/` directory.
- [x] Installed shadcn/ui components (`button`, `card`, `input`, `label`, `dialog`, `tabs`, `badge`, `avatar`, `dropdown-menu`, `sheet`, `table`, `toast`, `select`, `textarea`, `progress`).
- [x] Configured `@supabase/ssr` and `@supabase/supabase-js` helpers (`client.ts`, `server.ts`, `middleware.ts`).
- [x] Set up `.env.local` placeholder template and verified `.gitignore`.
- [x] Customized design tokens: Primary color `#5B3DF5`, rounded-2xl cards, Poppins font, dark mode foundation.
- [x] Created `PROJECT_PLAN.md` master document.
- [x] Verified build and dev server.

---

### ✅ Phase 2: Database Schema & Supabase RLS (COMPLETED)
- [x] Generated `supabase/schema.sql` covering 26 tables:
  - Core Coaching: `profiles`, `batches`, `batch_features`, `enrollments`, `subjects`, `chapters`, `lectures`, `notes`, `live_classes`, `tests`, `questions`, `test_attempts`, `doubts`, `attendance`, `fees`, `notices`, `lecture_progress`.
  - Website CMS: `site_settings`, `hero_slides`, `stats`, `faculty`, `toppers`, `testimonials`, `faqs`, `gallery_images`, `announcements_banner`, `section_settings`.
- [x] Trigger `on_auth_user_created` for automatic student profile creation on signup.
- [x] Function `is_admin()` for role-based security checks.
- [x] Row Level Security (RLS) on all tables with Admin Full Access and Public Read where needed.
- [x] Comprehensive initial seed data for immediate out-of-the-box readiness.
- [x] TypeScript database definitions in `src/types/database.ts`.

---

### ⏳ Phase 3: Login, Signup, Roles & Student Landing Pages
- [ ] `/login` and `/signup` with role-based routing and approval banner (`is_approved = true`).
- [ ] Forgot password flow.
- [ ] Next.js middleware protecting `/admin/*` and `/student/*`.
- [ ] Dynamic landing page connected to Supabase CMS.

---

### ✅ Phase 4: Admin Management Panel (COMPLETED)
- [x] Master Admin Control Deck at `/admin` with responsive sidebar (`Sheet` on mobile).
- [x] Dashboard: Total students, active batches, pending approvals, fees pending, today's live classes, with Recharts analytics.
- [x] Website Editor CMS: Full visual customizer for branding, hero, faculty, toppers, reviews, FAQs, gallery, and section show/hide toggles.
- [x] Students Directory: List, search, filter by batch, 1-click approve/revoke, block/unblock, and full academic dossier report.
- [x] Curriculum Explorer: Batches -> Subjects -> Chapters -> Lectures & Notes with free preview toggles and direct links.
- [x] Live Class Scheduler: Timetable management with Google Meet & Zoom meeting link dispatch.
- [x] Examination Engine: Test setup with duration, total marks, negative marking, and CSV bulk question import.
- [x] Photo Doubts Inbox: Filter pending/answered questions with student photo review and reply dispatch.
- [x] Attendance Register: Daily batch register with 1-click "Mark All Present/Absent" shortcuts.
- [x] Fees Ledger: Installment tracking, cash/UPI receipt recording, and 1-click WhatsApp reminder generator.
- [x] Notice Board: Broadcast circulars with sticky pin support.
- [x] Instant server-side cache revalidation (`revalidatePath`).

---

### ⏳ Phase 5: Student Mobile App Experience
- [ ] Mobile app layout with bottom navigation bar: **Home**, **My Batches**, **Tests**, **Doubts**, **Profile**.
- [ ] Home: Continue watching card, upcoming live class banner with countdown, latest notices.
- [ ] Curriculum viewer: Subjects tabs -> Chapters -> Lecture player with progress tracking.
- [ ] In-app PDF viewer for notes using short-lived signed URLs.
- [ ] Profile with attendance percentage, fee status, and account settings.

---

### ⏳ Phase 6: Tests & Quiz Examination Engine
- [ ] Admin test builder: Duration, total marks, negative marking, start/end windows.
- [ ] Bulk question upload via CSV/Excel + manual question builder.
- [ ] Student examination interface: Countdown timer, question palette, state persistence (localStorage).
- [ ] Secure server-side grading and batch leaderboard.

---

### ⏳ Phase 7: Doubts, Attendance, Fees & Notice Board
- [ ] Photo doubt capture & upload module with admin reply thread.
- [ ] Admin 1-click batch attendance register and student monthly calendar view.
- [ ] Fee tracker with WhatsApp reminder generator (`wa.me` links).
- [ ] Notice board with unread notification badges.

---

### ⏳ Phase 8: Video Security & Live Class System
- [ ] Server-verified enrollment validation prior to generating media URLs.
- [ ] Dynamic moving watermark (student name + phone number) overlaying video.
- [ ] Prevention of right-click, keyboard shortcuts, and media downloads.
- [ ] Modular `VideoPlayer` component supporting YouTube and Bunny Stream.
- [ ] Post-class archive: convert live sessions into recorded lectures.

---

### ⏳ Phase 9: Online Payments (Razorpay Integration)
- [ ] Batch detail checkout page with syllabus breakdown and free preview clips.
- [ ] Razorpay Orders API route handler and signature verification.
- [ ] Automated enrollment creation and fee receipt generation upon payment confirmation.
- [ ] Backup Razorpay webhook handler.
- [ ] Discount coupon engine (`coupons` table).

---

### ⏳ Phase 10: Polish, PWA, SEO & Hardening
- [ ] PWA manifest (`manifest.json`), service worker, offline fallback, and install banner.
- [ ] Web Push notification triggers for live classes & urgent announcements.
- [ ] Hindi / English bilingual toggle for student UI.
- [ ] Security audit: RLS policies, input sanitization, route protection.
- [ ] SEO metadata, Open Graph cards, `sitemap.xml`, `robots.txt`.

---

### 🚀 Production Deployment & Android APK
- **Step A:** Git repository setup and Vercel production deployment.
- **Step B:** Capacitor setup (`@capacitor/core`, `@capacitor/android`), splash screen, `FLAG_SECURE` screen capture prevention, and APK/AAB build.

