import { createClient } from "@/lib/supabase/server";
import { siteContent, type BatchItem } from "@/data/site-content";
import type { 
  SiteSettings, 
  HeroSlide, 
  StatRecord, 
  FacultyRecord, 
  TopperRecord, 
  TestimonialRecord, 
  FaqRecord, 
  GalleryRecord, 
  SectionSetting 
} from "@/types/database";

export interface FullLandingContent {
  settings: SiteSettings;
  hero: HeroSlide;
  stats: StatRecord[];
  batches: BatchItem[];
  faculty: FacultyRecord[];
  toppers: TopperRecord[];
  testimonials: TestimonialRecord[];
  faqs: FaqRecord[];
  gallery: GalleryRecord[];
  sections: Record<string, boolean>;
}

export async function getLandingPageContent(): Promise<FullLandingContent> {
  // Default fallback data directly mapped from siteContent
  const defaultFallback: FullLandingContent = {
    settings: {
      id: 1,
      tuition_name: siteContent.brand.name,
      tagline: siteContent.brand.tagline,
      short_description: siteContent.brand.shortDescription,
      logo_url: null,
      phone: siteContent.contact.phone,
      alternate_phone: siteContent.contact.alternatePhone,
      whatsapp_number: siteContent.contact.whatsappNumber,
      whatsapp_prefilled_text: siteContent.contact.whatsappPreFilledText,
      email: siteContent.contact.email,
      address: siteContent.contact.address,
      working_hours: siteContent.contact.workingHours,
      google_map_embed_url: siteContent.contact.googleMapEmbedUrl,
      primary_color: "#5B3DF5",
      social_links: siteContent.contact.socialLinks,
      updated_at: new Date().toISOString(),
    },
    hero: {
      id: "default-hero",
      badge: siteContent.hero.badge,
      headline: siteContent.hero.headline,
      highlight_word: siteContent.hero.highlightWord,
      subheadline: siteContent.hero.subheadline,
      primary_cta_text: siteContent.hero.primaryCta.text,
      primary_cta_href: siteContent.hero.primaryCta.href,
      secondary_cta_text: siteContent.hero.secondaryCta.text,
      secondary_cta_href: siteContent.hero.secondaryCta.href,
      order_index: 1,
      is_active: true,
      created_at: new Date().toISOString(),
    },
    stats: siteContent.stats.map((s, idx) => ({
      id: `stat-${idx}`,
      value: s.value,
      suffix: s.suffix,
      decimals: s.decimals || 0,
      label: s.label,
      description: s.description,
      order_index: idx + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    })),
    batches: siteContent.batches,
    faculty: siteContent.faculty.map((f, idx) => ({
      id: f.id,
      name: f.name,
      subject: f.subject,
      qualification: f.qualification,
      experience: f.experience,
      bio: f.bio,
      avatar_url: f.avatar,
      order_index: idx + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    })),
    toppers: siteContent.toppers.map((t, idx) => ({
      id: t.id,
      name: t.name,
      score: t.score,
      exam: t.exam,
      year: t.year,
      rank: t.rank || null,
      testimonial_snippet: t.testimonialSnippet,
      avatar_url: t.avatar,
      order_index: idx + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    })),
    testimonials: siteContent.testimonials.map((tm, idx) => ({
      id: tm.id,
      name: tm.name,
      role: tm.role,
      rating: tm.rating,
      quote: tm.quote,
      batch: tm.batch,
      avatar_url: tm.avatar,
      order_index: idx + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    })),
    faqs: siteContent.faqs.map((q, idx) => ({
      id: q.id,
      question: q.question,
      answer: q.answer,
      category: q.category,
      order_index: idx + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    })),
    gallery: siteContent.gallery.map((g, idx) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      image_url: g.imageUrl,
      aspect: g.aspect,
      order_index: idx + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    })),
    sections: {
      hero: true,
      stats: true,
      batches: true,
      faculty: true,
      results: true,
      testimonials: true,
      gallery: true,
      faqs: true,
      contact: true,
    },
  };

  try {
    const supabase = createClient();

    // Parallel fetch from Supabase
    const [
      settingsRes,
      heroRes,
      statsRes,
      batchesRes,
      facultyRes,
      toppersRes,
      testimonialsRes,
      faqsRes,
      galleryRes,
      sectionsRes,
    ] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("hero_slides").select("*").eq("is_active", true).order("order_index").limit(1).maybeSingle(),
      supabase.from("stats").select("*").eq("is_active", true).order("order_index"),
      supabase.from("batches").select("*, batch_features(*)").eq("is_active", true).order("order_index"),
      supabase.from("faculty").select("*").eq("is_active", true).order("order_index"),
      supabase.from("toppers").select("*").eq("is_active", true).order("order_index"),
      supabase.from("testimonials").select("*").eq("is_active", true).order("order_index"),
      supabase.from("faqs").select("*").eq("is_active", true).order("order_index"),
      supabase.from("gallery_images").select("*").eq("is_active", true).order("order_index"),
      supabase.from("section_settings").select("*"),
    ]);

    const settings = settingsRes.data ? (settingsRes.data as SiteSettings) : defaultFallback.settings;
    const hero = heroRes.data ? (heroRes.data as HeroSlide) : defaultFallback.hero;
    const stats = (statsRes.data && statsRes.data.length > 0) ? (statsRes.data as StatRecord[]) : defaultFallback.stats;
    const faculty = (facultyRes.data && facultyRes.data.length > 0) ? (facultyRes.data as FacultyRecord[]) : defaultFallback.faculty;
    const toppers = (toppersRes.data && toppersRes.data.length > 0) ? (toppersRes.data as TopperRecord[]) : defaultFallback.toppers;
    const testimonials = (testimonialsRes.data && testimonialsRes.data.length > 0) ? (testimonialsRes.data as TestimonialRecord[]) : defaultFallback.testimonials;
    const faqs = (faqsRes.data && faqsRes.data.length > 0) ? (faqsRes.data as FaqRecord[]) : defaultFallback.faqs;
    const gallery = (galleryRes.data && galleryRes.data.length > 0) ? (galleryRes.data as GalleryRecord[]) : defaultFallback.gallery;

    // Batches formatting with fallback
    let batches = defaultFallback.batches;
    if (batchesRes.data && batchesRes.data.length > 0) {
      batches = batchesRes.data.map((b: any) => ({
        id: b.id,
        title: b.name,
        category: (b.category || "all") as any,
        classLevel: b.class_level,
        description: b.description || "",
        price: Number(b.price) || 0,
        originalPrice: Number(b.original_price) || 0,
        duration: b.duration || "10 Months",
        startDate: b.start_date || "Coming Soon",
        badge: b.badge || undefined,
        isPopular: b.is_popular || false,
        features: b.batch_features && b.batch_features.length > 0
          ? b.batch_features.sort((x: any, y: any) => x.order_index - y.order_index).map((f: any) => f.feature_text)
          : ["Comprehensive Syllabus Coverage", "Weekly Mock Tests", "Doubt Clearing"],
      }));
    }

    // Sections visibility map
    const sections: Record<string, boolean> = { ...defaultFallback.sections };
    if (sectionsRes.data && sectionsRes.data.length > 0) {
      sectionsRes.data.forEach((s: SectionSetting) => {
        sections[s.section_key] = s.is_visible;
      });
    }

    return {
      settings,
      hero,
      stats,
      batches,
      faculty,
      toppers,
      testimonials,
      faqs,
      gallery,
      sections,
    };
  } catch {
    // If Supabase is unconfigured or offline, return default robust fallback
    return defaultFallback;
  }
}

