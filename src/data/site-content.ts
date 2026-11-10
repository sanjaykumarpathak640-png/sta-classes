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
  category: "all" | "junior" | "middle" | "secondary" | "senior";
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
    tagline: "Strong Fundamentals. Personal Attention. Lifelong Success.",
    shortDescription:
      "Premier tuition center for Class 4th to 12th in Barh, Bihar. Online & Offline both batches available with proven concept mastery and special guest mentorship by IIT Patna scholars.",
    foundedYear: 2012,
  },

  navigation: [
    { label: "Home", href: "#hero" },
    { label: "Batches (Online & Offline)", href: "#batches" },
    { label: "Faculty", href: "#faculty" },
    { label: "Toppers", href: "#results" },
    { label: "Parent Reviews", href: "#testimonials" },
    { label: "Tuition Gallery", href: "#gallery" },
    { label: "FAQs", href: "#faqs" },
    { label: "Tuition Visit", href: "#contact" },
  ] as NavItem[],

  hero: {
    badge: "🌟 Historic Milestone: IIT Patna Students Visiting First Time Ever in Any Barh Coaching Institute!",
    headline: "Online & Offline Both Batches Available for",
    highlightWord: "Class 4 to 12",
    subheadline:
      "Comprehensive tuition learning with personalized attention for every child. Regular interactive guest sessions by IIT Patna students — a first-time privilege in Barh! Offline classroom tuition near Biryani Mahal, Block ke paas, Barh + complete online live streaming for 100+ students with replays, notes, and 24x7 AI doubt solving.",
    primaryCta: {
      text: "Join / Inquire Batch",
      href: "#contact",
    },
    secondaryCta: {
      text: "Explore Class 4-12 Batches",
      href: "#batches",
    },
    statsSnippet: [
      { label: "Batch Modes", value: "Online + Offline Both" },
      { label: "Historic Highlight", value: "IIT Patna Mentorship" },
      { label: "Direct Sir Helpline", value: "+91 62016 30760" },
    ],
  },

  stats: [
    {
      value: 12,
      suffix: " Grades",
      label: "Class 4th to 12th",
      description: "Junior, Middle, High School & Senior Wings",
    },
    {
      value: 20,
      suffix: " Max",
      label: "Small Batch Strength",
      description: "Individual attention to every student's learning pace",
    },
    {
      value: 99,
      suffix: "%",
      label: "Board & School Pass Rate",
      description: "Consistent distinction & school topper track record",
    },
    {
      value: 14,
      suffix: "+",
      label: "Years of Academic Trust",
      description: "Nurturing confident, disciplined young minds since 2012",
    },
  ] as StatItem[],

  batchCategories: [
    { id: "all", label: "All Classes (4 to 12)" },
    { id: "junior", label: "Junior Wing (Class 4 – 5)" },
    { id: "middle", label: "Middle School (Class 6 – 8)" },
    { id: "secondary", label: "High School (Class 9 – 10)" },
    { id: "senior", label: "Senior Secondary (Class 11 – 12)" },
  ],

  batches: [
    {
      id: "b-1",
      title: "Class 4 & 5 Junior Foundation Program",
      category: "junior",
      classLevel: "Class 4th – 5th",
      description: "Nurturing curiosity, strong mental maths, basic science exploration, reading comprehension, and daily homework guidance in a warm, encouraging environment.",
      price: 0,
      originalPrice: 0,
      duration: "Full Session 2026–27",
      startDate: "New Admissions Open",
      badge: "Junior Foundation",
      isPopular: false,
      features: [
        "Interactive Activity-Based Learning",
        "Mental Maths & Speed Arithmetic Drills",
        "English Grammar & Reading Habits",
        "Daily Homework Assistance",
        "Weekly Friendly Progress Quizzes",
      ],
    },
    {
      id: "b-2",
      title: "Class 6, 7 & 8 Middle School Mastery",
      category: "middle",
      classLevel: "Class 6th – 8th",
      description: "Complete coverage of Science, Mathematics, English & Social Science. Building strong analytical foundations for Olympiads (IMO, NSO) and high school.",
      price: 0,
      originalPrice: 0,
      duration: "Full Session 2026–27",
      startDate: "New Admissions Open",
      badge: "Concept Booster",
      isPopular: true,
      features: [
        "NCERT & Exemplar Concept Building",
        "Science Lab Demonstrations & Visual Models",
        "Mathematics Step-by-Step Problem Solving",
        "Weekly Chapter Revision Tests",
        "Regular WhatsApp Updates for Parents",
      ],
    },
    {
      id: "b-3",
      title: "Class 9 & 10 Board Excellence Program",
      category: "secondary",
      classLevel: "Class 9th & 10th",
      description: "Targeted CBSE, ICSE & State Board preparation. Intensive focus on Science (Physics, Chemistry, Biology) and Mathematics with sample paper marathons.",
      price: 0,
      originalPrice: 0,
      duration: "Full Session 2026–27",
      startDate: "New Admissions Open",
      badge: "Board Special",
      isPopular: true,
      features: [
        "In-Depth Chapter Analysis & Derivations",
        "Handwritten Revision Notes & Formula Booklets",
        "Weekly Subjective Answer Writing Practice",
        "Past 10 Years Board Papers Solving",
        "1-on-1 Faculty Doubt Clearing After Class",
      ],
    },
    {
      id: "b-4",
      title: "Class 11 & 12 Board & Career Foundation",
      category: "senior",
      classLevel: "Class 11th & 12th",
      description: "Advanced coaching for Science (Physics, Chemistry, Maths, Biology) and Commerce streams. Structured to secure 95%+ in Board exams with strong entrance fundamentals.",
      price: 0,
      originalPrice: 0,
      duration: "Full Session 2026–27",
      startDate: "New Admissions Open",
      badge: "Senior Wing",
      isPopular: false,
      features: [
        "Comprehensive Syllabus Coverage by Senior Mentors",
        "NCERT Line-by-Line Decoded Study Notes",
        "Bi-Weekly Timed Exam Pattern Tests",
        "Personalized Academic Mentor Support",
        "Complete Board Practical & Viva Guidance",
      ],
    },
  ] as BatchItem[],

  faculty: [
    {
      id: "f-1",
      name: "Er. S. T. Agrawal",
      subject: "Senior Physics & Mathematics (Class 9-12)",
      qualification: "B.Tech (IIT Roorkee Alumni)",
      experience: "14+ Years Teaching Experience",
      bio: "Master teacher known for turning tough mathematics and physics concepts into simple, intuitive ideas that every student can grasp.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "f-2",
      name: "Dr. Ananya Sharma",
      subject: "Science & Chemistry (Class 6-12)",
      qualification: "Ph.D. in Chemistry",
      experience: "11+ Years Teaching Experience",
      bio: "Passionate educator who uses real-world demonstrations, mind maps, and engaging questions to build genuine love for science.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "f-3",
      name: "Prof. Rajesh Verma",
      subject: "Mathematics & Analytical Thinking (Class 6-10)",
      qualification: "M.Sc. Mathematics (Gold Medalist)",
      experience: "15+ Years Teaching Experience",
      bio: "Specialist in removing math phobia, teaching speed calculation methods, and instilling systematic step-by-step problem-solving skills.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "f-4",
      name: "Neha Rastogi",
      subject: "Junior Foundation & Middle Wing (Class 4-8)",
      qualification: "M.Sc., B.Ed. (Child Pedagogy Specialist)",
      experience: "9+ Years Teaching Experience",
      bio: "Dedicated mentor for younger learners, ensuring individual attention, patient guidance, and solid early learning habits.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    },
  ] as FacultyMember[],

  toppers: [
    {
      id: "t-1",
      name: "Aarav Patel",
      score: "98.8%",
      exam: "Class 10 CBSE Board 2025",
      rank: "School Topper",
      testimonialSnippet:
        "The personal attention from teachers at STA Classes made all the difference. Every single doubt was cleared before the board exams.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "t-2",
      name: "Pooja Malhotra",
      score: "97.4%",
      exam: "Class 12 CBSE Science",
      rank: "District Rank 2",
      testimonialSnippet:
        "Agrawal Sir's physics lectures and the handwritten notes saved me hundreds of hours. The test series mirrored the exact board exam pattern.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "t-3",
      name: "Rohan Deshmukh",
      score: "96.5%",
      exam: "Class 8 School Annual Exam",
      rank: "Class Rank 1",
      testimonialSnippet:
        "I used to struggle with algebra and science formulas, but STA teachers explained everything with visual examples. My confidence shot up!",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "t-4",
      name: "Meera Kulkarni",
      score: "98.2%",
      exam: "Class 10 ICSE Board",
      rank: "City Rank 3",
      testimonialSnippet:
        "The chapter-wise test series and instant doubt solving on the mobile app gave me a huge advantage throughout the academic year.",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    },
  ] as TopperItem[],

  testimonials: [
    {
      id: "tm-1",
      name: "Sunil K. Verma",
      role: "Parent of Class 8 Student",
      rating: 5,
      quote:
        "As a working parent, having regular attendance notifications on WhatsApp and knowing my son is getting individual attention in small batches gives me immense peace of mind.",
      batch: "Class 6-8 Middle Wing",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "tm-2",
      name: "Tanvi Sharma",
      role: "Class 10 Board Student",
      rating: 5,
      quote:
        "The digital student app alongside classroom teaching is so convenient. Whenever I miss a lecture or need to revise before school unit tests, I watch it on the app.",
      batch: "Class 10 Board Excellence",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "tm-3",
      name: "Dr. Kavita Singhal",
      role: "Parent of Class 5 Student",
      rating: 5,
      quote:
        "STA Classes is very different from crowded commercial coaching centres. The teachers here know every child by name, understand their weaknesses, and build real conceptual clarity.",
      batch: "Junior Foundation Batch",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
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
      title: "Annual Student Felicitation Ceremony",
      category: "Celebration",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      aspect: "tall",
    },
    {
      id: "g-3",
      title: "Hands-on Science & Model Demonstration",
      category: "Laboratory",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      aspect: "square",
    },
    {
      id: "g-4",
      title: "Quiet Study & Self-Revision Library",
      category: "Campus",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      aspect: "tall",
    },
    {
      id: "g-5",
      title: "1-on-1 Faculty Doubt Clearing Desk",
      category: "Mentorship",
      imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
      aspect: "wide",
    },
    {
      id: "g-6",
      title: "Weekend Chapter-wise Mock Exam",
      category: "Examination",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      aspect: "square",
    },
  ] as GalleryItem[],

  faqs: [
    {
      id: "faq-1",
      question: "Which classes and grades are taught at STA Classes?",
      answer:
        "We provide comprehensive tuition and foundation coaching for students from Class 4th up to Class 12th. We cover CBSE, ICSE, and State Board curriculum across all core subjects.",
      category: "admissions",
    },
    {
      id: "faq-2",
      question: "How many students are there in each batch?",
      answer:
        "We strictly maintain small batches of 20 to 25 students maximum. This ensures that every child receives personal teacher attention, asks questions without hesitation, and never gets lost in the crowd.",
      category: "classes",
    },
    {
      id: "faq-3",
      question: "Do you help students with daily school homework and upcoming school unit tests?",
      answer:
        "Yes! Along with completing the syllabus ahead of school schedules, our mentors actively resolve school homework doubts and conduct special revision drills before school periodic tests and term exams.",
      category: "classes",
    },
    {
      id: "faq-4",
      question: "How does the Doubt Clearance System work?",
      answer:
        "Students can ask questions directly after each classroom session or take a photo of any difficult question using our student mobile app. Our subject teachers answer with clear step-by-step explanations.",
      category: "doubts",
    },
    {
      id: "faq-5",
      question: "How are parents informed about attendance and academic progress?",
      answer:
        "We believe in strong partnership with parents. We send instant WhatsApp attendance alerts when your child arrives, weekly test marks, and hold regular 1-on-1 parent-teacher progress review meetings.",
      category: "admissions",
    },
    {
      id: "faq-6",
      question: "What are the fee payment options and installment plans?",
      answer:
        "We offer affordable monthly, quarterly, and annual fee installment options. Parents can pay conveniently online via UPI/QR code or directly at our tuition center desk with instant receipts.",
      category: "fees",
    },
  ] as FaqItem[],

  contact: {
    campusName: "STA Classes Tuition Center (Barh)",
    address: "Near Biryani Mahal, Block Ke Paas, Barh, Bihar - 803213",
    phone: "+91 62016 30760",
    alternatePhone: "+91 62016 30760",
    whatsappNumber: "916201630760",
    whatsappPreFilledText: "Hello Sir! I would like to inquire about Online & Offline tuition admission for Class 4 to 12 in Barh.",
    email: "sanjaykumarpathak640@gmail.com",
    workingHours: "Monday – Saturday: 6:30 AM – 8:00 PM | Sunday: 7:30 AM – 1:30 PM",
    googleMapEmbedUrl:
      "https://maps.google.com/maps?q=Barh%2C%20Bihar%20Near%20Biryani%20Mahal&t=&z=15&ie=UTF8&iwloc=&output=embed",
    socialLinks: {
      youtube: "https://youtube.com/@staclasses",
      instagram: "https://instagram.com/staclasses",
      telegram: "https://t.me/staclasses",
      facebook: "https://facebook.com/staclasses",
    },
  },
};
