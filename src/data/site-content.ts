export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
}

export interface BatchItem {
  id: string;
  title: string;
  category: "all" | "class-9" | "class-10" | "class-11-12" | "competitive";
  classLevel: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  startDate: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  bio: string;
  avatar: string;
}

export interface TopperItem {
  id: string;
  name: string;
  score: string;
  exam: string;
  year: string;
  rank?: string;
  testimonialSnippet: string;
  avatar: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  batch: string;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "admissions" | "classes" | "fees" | "doubts";
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  aspect: "tall" | "wide" | "square";
}

export const siteContent = {
  brand: {
    name: "STA Classes",
    tagline: "Empowering Minds, Shaping Achievers",
    shortDescription:
      "Premier coaching institute delivering concept-first learning, personalized attention, and proven academic excellence for Class 9–12 and competitive foundations.",
    foundedYear: 2012,
  },

  navigation: [
    { label: "Home", href: "#hero" },
    { label: "Batches", href: "#batches" },
    { label: "Faculty", href: "#faculty" },
    { label: "Toppers", href: "#results" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Gallery", href: "#gallery" },
    { label: "FAQs", href: "#faqs" },
    { label: "Contact", href: "#contact" },
  ] as NavItem[],

  hero: {
    badge: "Admissions Open for Session 2026–27",
    headline: "Transform Your Potential into Top Ranks with",
    highlightWord: "STA Classes",
    subheadline:
      "Experience structured offline and online learning designed for conceptual mastery. Live interactive sessions, detailed chapter notes, rigorous test series, and 1-on-1 doubt resolution.",
    primaryCta: {
      text: "Join Now",
      href: "#contact",
    },
    secondaryCta: {
      text: "Explore Batches",
      href: "#batches",
    },
    statsSnippet: [
      { label: "Google Rating", value: "4.9 ★" },
      { label: "Selection Rate", value: "98.4%" },
      { label: "Taught So Far", value: "5,000+" },
    ],
  },

  stats: [
    {
      value: 5000,
      suffix: "+",
      label: "Students Mentored",
      description: "Across Board Exams & Entrance Foundations",
    },
    {
      value: 45,
      suffix: "+",
      label: "Active Batches",
      description: "Tailored by grade level and learning pace",
    },
    {
      value: 98,
      suffix: ".4%",
      decimals: 1,
      label: "Success & Pass Rate",
      description: "Consistent distinction record year-over-year",
    },
    {
      value: 14,
      suffix: "+",
      label: "Years of Trust",
      description: "Nurturing top state and district ranks since 2012",
    },
  ] as StatItem[],

  batchCategories: [
    { id: "all", label: "All Batches" },
    { id: "class-10", label: "Class 10 Boards" },
    { id: "class-11-12", label: "Class 11 & 12 Science" },
    { id: "class-9", label: "Class 9 Foundation" },
    { id: "competitive", label: "JEE / NEET Foundation" },
  ],

  batches: [
    {
      id: "b-1",
      title: "Class 10 Board Excellence 2026-27",
      category: "class-10",
      classLevel: "Class 10th",
      description: "Full syllabus mastery of Science, Mathematics, English & Social Science with rigorous sample paper drills.",
      price: 14999,
      originalPrice: 19999,
      duration: "10 Months",
      startDate: "15 April 2026",
      badge: "Most Popular",
      isPopular: true,
      features: [
        "Daily Live + Classroom Sessions",
        "Printed & In-App Study Modules",
        "Weekly Chapter-Wise Mock Tests",
        "Instant Photo Doubt Engine",
        "Past 10 Years PYQ Marathon",
      ],
    },
    {
      id: "b-2",
      title: "Class 12 Board + CUET Sprint",
      category: "class-11-12",
      classLevel: "Class 12th",
      description: "Specialized Physics, Chemistry, and Mathematics/Biology batch geared towards 95%+ in Boards and top CUET percentiles.",
      price: 18999,
      originalPrice: 24999,
      duration: "10 Months",
      startDate: "20 April 2026",
      badge: "High Demand",
      isPopular: false,
      features: [
        "Concept Deep-Dive by Senior Mentors",
        "Comprehensive Derivation Booklets",
        "Bi-Weekly All-India Pattern Tests",
        "Dedicated Personal Mentor",
        "Board Answer Writing Workshops",
      ],
    },
    {
      id: "b-3",
      title: "JEE & NEET Early Foundation (Class 11)",
      category: "competitive",
      classLevel: "Class 11th",
      description: "Strengthen advanced problem-solving techniques in Mechanics, Organic Chemistry, Calculus, and Plant Physiology.",
      price: 22999,
      originalPrice: 29999,
      duration: "1 Year",
      startDate: "1 May 2026",
      badge: "Target 2028",
      isPopular: true,
      features: [
        "Advanced Level Question Banks",
        "Speed & Accuracy Speed Drills",
        "Computer-Based CBT Test Engine",
        "Formula Sheets & Mind Maps",
        "Parent-Teacher Monthly Review",
      ],
    },
    {
      id: "b-4",
      title: "Class 9th Foundation & Olympiad",
      category: "class-9",
      classLevel: "Class 9th",
      description: "Build an unbreakable base in STEM. Ideal for Olympiad aspirants (NTSE, NSO, IMO) and early high school toppers.",
      price: 12999,
      originalPrice: 16999,
      duration: "10 Months",
      startDate: "15 April 2026",
      badge: "Concept Booster",
      isPopular: false,
      features: [
        "Interactive Visual Animations",
        "Hands-On Problem Solving",
        "NCERT Exemplar & Olympiad Drills",
        "Micro-quizzes after every lecture",
        "Gamified Rank Leaderboards",
      ],
    },
  ] as BatchItem[],

  faculty: [
    {
      id: "f-1",
      name: "Er. S. T. Agrawal",
      subject: "Physics & Mechanics",
      qualification: "B.Tech (IIT Roorkee Alumni)",
      experience: "14+ Years Teaching Experience",
      bio: "Renowned for simplifying complex rotational mechanics and electromagnetism with relatable everyday analogies.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "f-2",
      name: "Dr. Ananya Sharma",
      subject: "Chemistry & Biochemistry",
      qualification: "Ph.D. in Organic Chemistry",
      experience: "11+ Years Teaching Experience",
      bio: "Master trainer whose students regularly score 98%+ in Chemistry. Expert in organic reaction mechanisms and visual mind maps.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "f-3",
      name: "Prof. Rajesh Verma",
      subject: "Pure & Applied Mathematics",
      qualification: "M.Sc. Mathematics (Gold Medalist)",
      experience: "15+ Years Teaching Experience",
      bio: "Specializes in speed mathematics, calculus shortcuts, and eliminating math anxiety with progressive difficulty problem sets.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "f-4",
      name: "Neha Rastogi",
      subject: "Biology & Life Sciences",
      qualification: "M.Sc. Biotechnology",
      experience: "9+ Years Teaching Experience",
      bio: "Brings NCERT line-by-line decoding, 3D anatomical charts, and mnemonics that make memorization effortless.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    },
  ] as FacultyMember[],

  toppers: [
    {
      id: "t-1",
      name: "Aarav Patel",
      score: "98.8%",
      exam: "Class 10 CBSE Board 2025",
      rank: "City Rank 1",
      testimonialSnippet:
        "The chapter tests and doubt sessions at STA Classes made the difference. Every concept was crystal clear before the exam.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "t-2",
      name: "Pooja Malhotra",
      score: "99.4 Percentile",
      exam: "JEE Mains (Physics 100/100)",
      rank: "AIR 842",
      testimonialSnippet:
        "Agrawal Sir's Physics lectures removed all fear. The continuous tests and analysis report showed exactly where I was slipping.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "t-3",
      name: "Rohan Deshmukh",
      score: "97.6%",
      exam: "Class 12 CBSE Science",
      rank: "District Rank 3",
      testimonialSnippet:
        "Handwritten notes and quick formula sheets saved hundreds of revision hours. STA Classes is the best decision I made.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "t-4",
      name: "Meera Kulkarni",
      score: "685 / 720",
      exam: "NEET UG Entrance",
      rank: "State Rank 24",
      testimonialSnippet:
        "Personal attention from teachers and prompt doubt clearance even late at night gave me tremendous confidence.",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    },
  ] as TopperItem[],

  testimonials: [
    {
      id: "tm-1",
      name: "Sunil K. Verma",
      role: "Parent of Class 10 Student",
      rating: 5,
      quote:
        "As a parent, I love the regular attendance updates and weekly test performance messages on WhatsApp. STA Classes takes true accountability.",
      batch: "Class 10 Board Batch",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "tm-2",
      name: "Tanvi Sharma",
      role: "Student, Class 12 Science",
      rating: 5,
      quote:
        "The digital app support alongside classroom lectures is phenomenal. When I missed a lecture due to fever, I watched it on the app without losing track.",
      batch: "Class 12th PCM",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "tm-3",
      name: "Vikram Singhania",
      role: "Parent of JEE Aspirant",
      rating: 5,
      quote:
        "The teachers are easily accessible and do not treat children as roll numbers. Highly disciplined yet compassionate learning atmosphere.",
      batch: "JEE Foundation Batch",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
  ] as TestimonialItem[],

  gallery: [
    {
      id: "g-1",
      title: "Interactive Classroom Session",
      category: "Classroom",
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
      aspect: "wide",
    },
    {
      id: "g-2",
      title: "Annual Toppers Felicitation Ceremony",
      category: "Celebration",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      aspect: "tall",
    },
    {
      id: "g-3",
      title: "Science & Physics Demonstration Lab",
      category: "Laboratory",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      aspect: "square",
    },
    {
      id: "g-4",
      title: "Focused Study & Library Room",
      category: "Campus",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      aspect: "tall",
    },
    {
      id: "g-5",
      title: "1-on-1 Doubt Clearing Sessions",
      category: "Mentorship",
      imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
      aspect: "wide",
    },
    {
      id: "g-6",
      title: "Sunday Mock Exam Test Arena",
      category: "Examination",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      aspect: "square",
    },
  ] as GalleryItem[],

  faqs: [
    {
      id: "faq-1",
      question: "How do I enroll in a batch at STA Classes?",
      answer:
        "You can enroll online by clicking 'Join Now' or 'Explore Batches' on this website, or by visiting our campus directly. Once you choose your course, our admissions counselor will guide you through batch timing and study materials.",
      category: "admissions",
    },
    {
      id: "faq-2",
      question: "Are both offline classroom and online live modes available?",
      answer:
        "Yes! STA Classes offers a hybrid model. Students enrolled in offline batches also get full access to live lecture broadcasts, recordings, chapter PDFs, and the digital doubt engine on our web and mobile app.",
      category: "classes",
    },
    {
      id: "faq-3",
      question: "How does the Doubt Resolution System work?",
      answer:
        "Students can either ask questions directly in classroom sessions or take a photo of the problem in our app. Our subject faculty reviews the doubt and replies with step-by-step explanations promptly.",
      category: "doubts",
    },
    {
      id: "faq-4",
      question: "What is the fee payment schedule and can it be paid in installments?",
      answer:
        "Yes, we support easy monthly or quarterly installment plans as well as one-time payment discounts. Payment can be made online via UPI/Card or at the campus counter.",
      category: "fees",
    },
    {
      id: "faq-5",
      question: "Is there a scholarship or admission entrance test?",
      answer:
        "Yes, we conduct the STA Talent Scholarship Test (STST) every quarter offering up to 100% fee waivers for meritorious students across Class 9 to 12.",
      category: "admissions",
    },
  ] as FaqItem[],

  contact: {
    campusName: "STA Classes Main Academic Campus",
    address: "Plot 42, Education Hub, Near Central Park, M.G. Road, Lucknow, Uttar Pradesh - 226001",
    phone: "+91 98765 43210",
    alternatePhone: "+91 87654 32109",
    whatsappNumber: "919876543210",
    whatsappPreFilledText: "Hello STA Classes! I would like to inquire about batch admissions.",
    email: "admissions@staclasses.com",
    workingHours: "Monday – Saturday: 8:00 AM – 8:00 PM | Sunday: 9:00 AM – 2:00 PM",
    googleMapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.23192078652!2d80.8715876008139!3d26.848596489370605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    socialLinks: {
      youtube: "https://youtube.com/@staclasses",
      instagram: "https://instagram.com/staclasses",
      telegram: "https://t.me/staclasses",
      facebook: "https://facebook.com/staclasses",
    },
  },
};

