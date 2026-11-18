"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Home as HomeIcon, 
  BookOpen, 
  Award, 
  HelpCircle, 
  User, 
  Radio, 
  Play, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText, 
  ChevronRight, 
  ExternalLink, 
  Download, 
  Send, 
  Upload, 
  LogOut, 
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Bell,
  Bot,
  MessageSquare,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Share2,
  Printer,
  TrendingUp,
  AlertCircle,
  Star,
  CheckCircle,
  BarChart3,
  Flame,
  PhoneCall
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface StudentReportData {
  studentName: string;
  phone: string;
  classGrade: string;
  rollNo: string;
  reportingPeriod: string;
  weeklyAttendance: { attended: number; total: number; percent: number };
  monthlyAttendance: { attended: number; total: number; percent: number };
  disciplineRating: number;
  batchRank: string;
  weeklyOverallPercent: number;
  monthlyOverallPercent: number;
  weeklySubjects: Array<{ subject: string; score: number; maxScore: number; status: string; remark: string }>;
  monthlySubjects: Array<{ subject: string; score: number; maxScore: number; status: string; remark: string }>;
  homeworkRate: number;
  teacherRemark: string;
  strengths: string[];
  focusAreas: string[];
  nextTestDate: string;
}

export default function StudentPortalPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState<"home" | "batches" | "reports" | "doubts" | "profile">("home");

  // Persistent Student State
  const [student, setStudent] = React.useState({
    name: "Aarav Patel",
    phone: "+91 62016 30760",
    classGrade: "Class 10th",
    enrolledBatch: "Class 10 Board Excellence 2026-27",
    attendancePercent: 96,
    feeStatus: "Paid (No Dues)",
    overallProgress: 42,
  });

  // Load persistent student session on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("sta_student_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) {
          setStudent((prev) => ({
            ...prev,
            name: parsed.name,
            phone: parsed.phone || prev.phone,
            classGrade: parsed.classGrade || prev.classGrade,
            enrolledBatch: parsed.enrolledBatch || `${parsed.classGrade || "Class 10th"} Excellence Batch 2026-27`,
          }));
        }
      }
    } catch {}
  }, []);

  // Helper to convert any YouTube URL to embed
  const getYouTubeEmbedUrl = (url?: string): string => {
    if (!url) return "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?modestbranding=1&rel=0";
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/))([\w-]{11})/);
    if (match && match[1]) {
      return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&modestbranding=1&rel=0`;
    }
    if (url.includes("/embed/")) return url;
    return url;
  };

  // Video Lecture Player State
  const [activeLecture, setActiveLecture] = React.useState<{
    title: string;
    chapter: string;
    duration: string;
    videoUrl: string;
    completed: boolean;
  } | null>(null);

  // Enrolled lectures list synced from admin
  const [enrolledLectures, setEnrolledLectures] = React.useState<Array<{
    id: string;
    chapterId?: string;
    title: string;
    videoUrl: string;
    duration: string;
    isFreePreview?: boolean;
    completed?: boolean;
  }>>([
    {
      id: "lec-1",
      title: "Lecture 01: Introduction to Spherical Mirrors & Ray Diagrams",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "48 mins",
      isFreePreview: true,
      completed: true,
    },
    {
      id: "lec-2",
      title: "Lecture 02: Mirror Formula & Numerical Problem Solving",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "54 mins",
      isFreePreview: false,
      completed: false,
    },
  ]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("sta_lectures_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEnrolledLectures(parsed);
        }
      }
    } catch {}
  }, []);

  // ================= PARENT & STUDENT PERFORMANCE REPORT STATE =================
  const [reportType, setReportType] = React.useState<"weekly" | "monthly">("weekly");
  const [reportData, setReportData] = React.useState<StudentReportData>({
    studentName: student.name,
    phone: student.phone,
    classGrade: student.classGrade,
    rollNo: "STA-2026-042",
    reportingPeriod: "November 2026 (Week 2)",
    weeklyAttendance: { attended: 6, total: 6, percent: 100 },
    monthlyAttendance: { attended: 25, total: 26, percent: 96.2 },
    disciplineRating: 5,
    batchRank: "Rank #3 in Batch (Top 5%)",
    weeklyOverallPercent: 94.0,
    monthlyOverallPercent: 92.5,
    weeklySubjects: [
      { subject: "Mathematics (गणित)", score: 24, maxScore: 25, status: "Outstanding", remark: "Algebra & Linear Equations me excellent concepts. Sabhi steps clean likhe." },
      { subject: "Science (विज्ञान)", score: 23, maxScore: 25, status: "Excellent", remark: "Physics numericals me acchi speed hai. Ray diagrams neat banayein." },
      { subject: "Social Science (SST)", score: 22, maxScore: 25, status: "Very Good", remark: "History dates aur Geography map work me full marks mile." },
      { subject: "English & Grammar", score: 25, maxScore: 25, status: "Perfect Score", remark: "Active-Passive voice aur Tenses me 100% accuracy rahi." },
    ],
    monthlySubjects: [
      { subject: "Mathematics (गणित)", score: 95, maxScore: 100, status: "Outstanding (A+)", remark: "Monthly Grand Test me 95/100 score kiya. Geometry proofs me full marks." },
      { subject: "Science (विज्ञान)", score: 91, maxScore: 100, status: "Excellent (A+)", remark: "Chemistry chemical equations & Biology life processes clear hain." },
      { subject: "Social Science (SST)", score: 90, maxScore: 100, status: "Excellent (A)", remark: "Answer writing format aur subheadings bohot achhi tarah se likhi." },
      { subject: "English & Grammar", score: 94, maxScore: 100, status: "Outstanding (A+)", remark: "Formal letter format aur grammar exercises me top score." },
    ],
    homeworkRate: 98,
    teacherRemark: "विद्यार्थी कक्षा में रोज़ समय पर उपस्थित रहता है और बहुत लगन से पढ़ता है। मैथ्स और साइंस में इसकी समझ बहुत गहरी है। अभिभावक से अनुरोध है कि घर पर रोज़ रात को 1.5 घंटे सेल्फ-स्टडी और फ़ॉर्मूला रिवीजन का समय तय करें। किसी भी सहायता के लिए शिक्षक से 6201630760 पर सीधे बात कर सकते हैं।",
    strengths: [
      "नियमित उपस्थिति (96%+ Attendance Record)",
      "कक्षा में सक्रिय भागीदारी और तुरंत डाउट पूछना",
      "गणित व विज्ञान के फॉर्मूलों पर मजबूत पकड़",
      "साप्ताहिक टेस्ट में लगातार टॉप 5% में स्थान",
    ],
    focusAreas: [
      "लॉन्ग आंसर (5-मार्क्स) में मुख्य शब्दों को अंडरलाइन करने की आदत डालें",
      "फिजिक्स के कठिन न्यूमेरिकल्स में अंतिम उत्तर के साथ SI Unit लिखना न भूलें",
      "संडे टेस्ट से पहले 15 मिनट फॉर्मूला रिवीजन शीट दोहराएं",
    ],
    nextTestDate: "आगामी संडे टेस्ट: रविवार सुबह 10:00 AM (Mathematics & Science)",
  });

  // Sync report student name
  React.useEffect(() => {
    setReportData((prev) => ({
      ...prev,
      studentName: student.name,
      phone: student.phone,
      classGrade: student.classGrade,
    }));
  }, [student.name, student.phone, student.classGrade]);

  // Load custom teacher reports from localStorage if admin updated it
  React.useEffect(() => {
    try {
      const storedReports = localStorage.getItem("sta_student_custom_report");
      if (storedReports) {
        const parsed = JSON.parse(storedReports);
        if (parsed) {
          setReportData((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {}
  }, []);

  const handleShareToWhatsApp = () => {
    const isWeekly = reportType === "weekly";
    const percent = isWeekly ? reportData.weeklyOverallPercent : reportData.monthlyOverallPercent;
    const att = isWeekly ? reportData.weeklyAttendance : reportData.monthlyAttendance;
    const subs = isWeekly ? reportData.weeklySubjects : reportData.monthlySubjects;

    let text = `📊 *STA CLASSES, BARH — ${isWeekly ? "साप्ताहिक" : "मासिक"} प्रगति रिपोर्ट (Parent Report)*\n`;
    text += `👤 *विद्यार्थी:* ${student.name} (${student.classGrade})\n`;
    text += `📅 *अवधि:* ${reportData.reportingPeriod}\n`;
    text += `🏆 *बैच रैंक:* ${reportData.batchRank}\n`;
    text += `📈 *कुल प्राप्तांक:* ${percent}%\n`;
    text += `🗓️ *उपस्थिति:* ${att.attended}/${att.total} दिन (${att.percent}% Present)\n`;
    text += `✍️ *गृहकार्य (HW):* ${reportData.homeworkRate}% पूर्ण\n\n`;
    text += `*विषयवार अंक:*\n`;
    subs.forEach((s) => {
      text += `• ${s.subject}: ${s.score}/${s.maxScore} (${s.status})\n`;
    });
    text += `\n👨‍🏫 *शिक्षक की टिप्पणी:* ${reportData.teacherRemark}\n\n`;
    text += `📞 *STA Classes Barh:* +91 62016 30760 (Near Biryani Mahal, Block ke paas, Barh)\n`;
    text += `🌐 *ऑनलाइन पोर्टल:* https://sta-classes.vercel.app`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handlePrintReport = () => {
    window.print();
  };

  // ================= AI DOUBT SOLVER UPGRADED STATE =================
  const [doubtSubTab, setDoubtSubTab] = React.useState<"ai" | "faculty">("ai");
  const [aiInput, setAiInput] = React.useState("");
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiLanguage, setAiLanguage] = React.useState<"hinglish" | "english" | "hindi">("hinglish");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = React.useState<string>("All");
  const [speakingMessageId, setSpeakingMessageId] = React.useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = React.useState<string | null>(null);

  const [aiMessages, setAiMessages] = React.useState<Array<{
    id: string;
    sender: "user" | "ai";
    text: string;
    time: string;
  }>>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "👋 Namaste! Main STA Classes ka AI Study Mentor hu.\n\nClass 4th se 12th tak Physics, Chemistry, Maths, Biology ya English me koi bhi doubt poochhein — main step-by-step saral bhasha me samjhaunga!\n\nAap niche diye gaye topics par click kar sakte hain ya apna question type kar sakte hain.",
      time: "Online",
    },
  ]);

  // Text to Speech
  const handleSpeakText = (msgId: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast({ title: "Speech not supported in this browser." });
      return;
    }

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown characters before speech
    const cleanText = text.replace(/[*#$_\\]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.lang = aiLanguage === "hindi" ? "hi-IN" : "en-IN";

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Voice Input (Microphone)
  const [isListening, setIsListening] = React.useState(false);
  const handleToggleVoiceInput = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        title: "Voice Input Unsupported",
        description: "Aapke browser me voice recognition support nahi hai. Kripya type karein.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = aiLanguage === "hindi" ? "hi-IN" : "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        toast({ title: "🎙️ Listening...", description: "Apna doubt boliye..." });
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setAiInput(spokenText);
        setIsListening(false);
        toast({ title: "Voice Captured!", description: `"${spokenText}"` });
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSendAiDoubt = async (queryText?: string) => {
    const q = (queryText || aiInput).trim();
    if (!q || aiLoading) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: "user" as const,
      text: q,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setAiMessages((prev) => [...prev, userMsg]);
    setAiInput("");
    setAiLoading(true);

    try {
      const res = await fetch("/api/ai-doubt-solver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          classGrade: student.classGrade,
          subject: selectedSubjectFilter,
          language: aiLanguage,
        }),
      });
      const data = await res.json();
      if (data.answer) {
        setAiMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "ai",
            text: data.answer,
            time: data.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch {
      setAiMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: "Network issue ya connection timeout. Kripya punah prayas karein.",
          time: "Just now",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // Faculty Doubt State
  const [doubtText, setDoubtText] = React.useState("");
  const [doubtsList, setDoubtsList] = React.useState([
    {
      id: "d-1",
      question: "Why do we take focal length of concave mirror as negative?",
      chapter: "Light Reflection & Refraction",
      status: "pending",
      date: "Today, 10:15 AM",
    },
    {
      id: "d-2",
      question: "How do we balance redox reactions using oxidation number method?",
      chapter: "Chemical Reactions",
      status: "answered",
      answer: "Equate total increase in oxidation state with total decrease by multiplying coefficients.",
      date: "02 May 2026",
    },
  ]);

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;

    const newDoubt = {
      id: `d-${Date.now()}`,
      question: doubtText,
      chapter: "Current Electricity & Magnetism",
      status: "pending",
      date: "Just now",
    };

    setDoubtsList([newDoubt, ...doubtsList]);
    setDoubtText("");
    toast({
      title: "Question Sent to Teacher!",
      description: "Teacher will review and answer in your doubt inbox.",
    });
  };

  // Logout / Switch Account
  const handleLogout = () => {
    try {
      localStorage.removeItem("sta_student_session");
      document.cookie = "sta_student_auth=; path=/; max-age=0";
    } catch {}
    toast({
      title: "Logged Out Successfully",
      description: "Redirecting to login portal...",
    });
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background pb-20 md:pb-8 flex flex-col w-full max-w-full overflow-x-hidden relative">
      {/* Top Mobile Bar */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border/80 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between shadow-sm w-full max-w-full overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md shrink-0">
            <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-xs sm:text-sm text-foreground flex items-center gap-1.5 truncate">
              <span>STA CLASSES</span>
              <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold shrink-0">
                Live
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-muted-foreground font-semibold truncate">
              {student.name} • {student.classGrade}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setActiveTab("reports")}
            className="text-[10px] font-bold px-2 py-1 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/20 transition-all flex items-center gap-1"
          >
            <BarChart3 className="h-3 w-3" />
            <span className="hidden xs:inline sm:inline">Parent</span> Report
          </button>
          <div 
            onClick={() => setActiveTab("profile")}
            className="h-8 w-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm cursor-pointer shrink-0"
            title="Open Profile"
          >
            {student.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Main Tab Views */}
      <main className="flex-1 container max-w-4xl mx-auto p-3 sm:p-6 space-y-5 sm:space-y-6 w-full max-w-full overflow-x-hidden">
        {/* ================= HOME TAB ================= */}
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Student Greeting Card with Quick Status */}
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold bg-white/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-300" /> Session 2026-27 Active
                </span>
                <span className="text-[11px] font-mono bg-black/20 px-2 py-0.5 rounded-full">
                  {student.classGrade}
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  Namaste, {student.name}! 👋
                </h2>
                <p className="text-white/85 text-xs sm:text-sm mt-0.5">
                  Welcome to your personalized study portal. Parents can check your weekly report below.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="text-[10px] text-white/70 uppercase font-semibold">Attendance</div>
                  <div className="text-base font-black text-white mt-0.5">{student.attendancePercent}%</div>
                  <div className="text-[10px] text-emerald-300">Regular • No Absent</div>
                </div>

                <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="text-[10px] text-white/70 uppercase font-semibold">Weekly Test</div>
                  <div className="text-base font-black text-white mt-0.5">94% (Top 5%)</div>
                  <div className="text-[10px] text-amber-300">Rank #3 in Batch</div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-2.5 rounded-2xl bg-white/10 backdrop-blur-sm flex sm:flex-col justify-between items-center sm:items-start">
                  <div>
                    <div className="text-[10px] text-white/70 uppercase font-semibold">Parents Deck</div>
                    <div className="text-xs font-bold text-white mt-0.5">Verified Report</div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setActiveTab("reports")}
                    className="h-7 text-[11px] rounded-xl bg-white text-indigo-700 font-bold hover:bg-white/90 shadow-sm mt-1"
                  >
                    View Report Card →
                  </Button>
                </div>
              </div>
            </div>

            {/* Today's Live Class Banner */}
            <Card className="rounded-3xl border border-red-500/30 bg-red-500/[0.03] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" /> Today&apos;s Live Class
                </span>
                <span className="text-xs font-mono font-bold text-foreground">07:00 PM – 08:15 PM</span>
              </div>

              <div>
                <h3 className="font-bold text-base text-foreground">
                  Carbon & Its Compounds: Hydrocarbons & Covalent Bonds
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Subject: Science & Chemistry • Live Class</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-600 font-bold">100+ Live Students Capacity</span>
                  <span className="text-muted-foreground">• Low Latency Smooth Join</span>
                </div>
                <Button asChild size="sm" className="rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs h-9 px-4 gap-1.5 shadow-md shadow-red-500/20">
                  <a href="https://meet.google.com/xyz-uvwx-rst" target="_blank" rel="noopener noreferrer">
                    <Radio className="h-3.5 w-3.5 animate-pulse" /> Join Live Stream Now (100+)
                  </a>
                </Button>
              </div>
            </Card>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("reports")}
                className="p-4 rounded-3xl bg-card border border-border/80 hover:border-primary/50 text-left transition-all hover:scale-[1.02] shadow-sm space-y-2 group"
              >
                <div className="h-10 w-10 rounded-2xl bg-violet-500/10 text-violet-600 flex items-center justify-center font-bold">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div className="font-bold text-sm text-foreground group-hover:text-primary">
                  Study Report for Parents
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Weekly & monthly marks, attendance, teacher notes
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("doubts")}
                className="p-4 rounded-3xl bg-card border border-border/80 hover:border-primary/50 text-left transition-all hover:scale-[1.02] shadow-sm space-y-2 group"
              >
                <div className="h-10 w-10 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="font-bold text-sm text-foreground group-hover:text-primary">
                  AI Doubt Solver 24x7
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Maths, Science, English step-by-step doubt clearing
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("batches")}
                className="col-span-2 sm:col-span-1 p-4 rounded-3xl bg-card border border-border/80 hover:border-primary/50 text-left transition-all hover:scale-[1.02] shadow-sm space-y-2 group"
              >
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <Play className="h-5 w-5" />
                </div>
                <div className="font-bold text-sm text-foreground group-hover:text-primary">
                  Recorded Video Classes
                </div>
                <p className="text-[11px] text-muted-foreground">
                  YouTube lectures & chapter revision notes (PDF)
                </p>
              </button>
            </div>

            {/* Continue Watching Lecture */}
            <Card className="rounded-3xl border border-border/80 p-5 shadow-sm bg-card space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold text-primary">Continue Watching</span>
                <span>48 mins total</span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="h-14 w-20 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Play className="h-6 w-6 text-primary fill-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">
                    Spherical Mirrors, Focal Length & Sign Conventions
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Physics • Chapter 10</p>
                </div>
              </div>

              <Button
                size="sm"
                className="w-full rounded-2xl text-xs h-10 shadow-sm"
                onClick={() => {
                  const firstLec = enrolledLectures[0];
                  setActiveLecture({
                    title: firstLec?.title || "Spherical Mirrors, Focal Length & Sign Conventions",
                    chapter: "Light Reflection & Refraction",
                    duration: firstLec?.duration || "48 mins",
                    videoUrl: firstLec?.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    completed: false,
                  });
                  setActiveTab("batches");
                }}
              >
                Resume Lecture Video
              </Button>
            </Card>
          </div>
        )}

        {/* ================= PARENTS & STUDY REPORT TAB (NEW PERSONAL DASHBOARD) ================= */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            {/* Header with Switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-violet-600" />
                  <span>Student Study Report (अभिभावक रिपोर्ट कार्ड)</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Weekly & Monthly academic performance dossier for parents & teachers
                </p>
              </div>

              {/* Weekly vs Monthly Toggle */}
              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-2xl border border-border/60">
                <Button
                  size="sm"
                  variant={reportType === "weekly" ? "default" : "ghost"}
                  onClick={() => setReportType("weekly")}
                  className="rounded-xl text-xs h-8 font-bold gap-1.5"
                >
                  <Calendar className="h-3.5 w-3.5" /> साप्ताहिक (Weekly)
                </Button>
                <Button
                  size="sm"
                  variant={reportType === "monthly" ? "default" : "ghost"}
                  onClick={() => setReportType("monthly")}
                  className="rounded-xl text-xs h-8 font-bold gap-1.5"
                >
                  <Award className="h-3.5 w-3.5" /> मासिक (Monthly)
                </Button>
              </div>
            </div>

            {/* Official Report Card Box */}
            <Card className="rounded-3xl border border-border/80 shadow-xl bg-card overflow-hidden">
              {/* Institution Stamp Header */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-700 text-white space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/20 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-2xl bg-white text-indigo-700 flex items-center justify-center font-extrabold shadow-md">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-black text-base sm:text-lg">STA CLASSES • BARH</div>
                      <div className="text-[10px] text-white/80">Near Biryani Mahal, Block ke Paas, Barh (Bihar)</div>
                    </div>
                  </div>
                  <Badge className="bg-amber-400 text-slate-950 font-extrabold border-none text-[11px] self-start sm:self-center">
                    {reportType === "weekly" ? "Weekly Performance Audit" : "Monthly Grand Report Card"}
                  </Badge>
                </div>

                {/* Student Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-white/70 block text-[10px]">Student Name:</span>
                    <span className="font-bold text-white text-sm">{reportData.studentName}</span>
                  </div>
                  <div>
                    <span className="text-white/70 block text-[10px]">Class / Grade:</span>
                    <span className="font-bold text-white">{reportData.classGrade}</span>
                  </div>
                  <div>
                    <span className="text-white/70 block text-[10px]">Roll Number:</span>
                    <span className="font-mono font-bold text-white">{reportData.rollNo}</span>
                  </div>
                  <div>
                    <span className="text-white/70 block text-[10px]">Report Period:</span>
                    <span className="font-semibold text-white/95">{reportData.reportingPeriod}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-6">
                {/* Score & Attendance Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">Overall Score</div>
                    <div className="text-xl sm:text-2xl font-black text-foreground mt-1">
                      {reportType === "weekly" ? `${reportData.weeklyOverallPercent}%` : `${reportData.monthlyOverallPercent}%`}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Grade A+ (Distinction)</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">Batch Rank</div>
                    <div className="text-base sm:text-lg font-black text-primary mt-1">
                      #3 in Batch
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Top 5% of 45 Students</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">Attendance</div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
                      {reportType === "weekly" ? `${reportData.weeklyAttendance.percent}%` : `${reportData.monthlyAttendance.percent}%`}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {reportType === "weekly"
                        ? `${reportData.weeklyAttendance.attended}/${reportData.weeklyAttendance.total} Days Present`
                        : `${reportData.monthlyAttendance.attended}/${reportData.monthlyAttendance.total} Days Present`}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">Homework & DPP</div>
                    <div className="text-xl sm:text-2xl font-black text-foreground mt-1">
                      {reportData.homeworkRate}%
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Fully Submitted</div>
                  </div>
                </div>

                {/* Subject-Wise Detailed Score Sheet */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm sm:text-base text-foreground flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-primary" />
                      <span>Subject-Wise Marks & Progress (विषयवार अंक व प्रगति)</span>
                    </h3>
                    <span className="text-[11px] text-muted-foreground">
                      {reportType === "weekly" ? "Weekly Unit Test" : "Monthly Grand Examination"}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {(reportType === "weekly" ? reportData.weeklySubjects : reportData.monthlySubjects).map((sub, sIdx) => {
                      const pct = Math.round((sub.score / sub.maxScore) * 100);
                      return (
                        <div key={sIdx} className="p-3.5 rounded-2xl bg-muted/30 border border-border/60 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-foreground text-sm">{sub.subject}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-[10px] font-bold text-emerald-600 border-emerald-500/30">
                                {sub.status}
                              </Badge>
                              <span className="font-mono font-black text-foreground text-sm">
                                {sub.score} / {sub.maxScore} ({pct}%)
                              </span>
                            </div>
                          </div>

                          <Progress value={pct} className="h-2 bg-muted" />

                          <div className="text-[11px] text-muted-foreground flex items-start gap-1.5 pt-0.5">
                            <span className="text-primary font-bold shrink-0">Teacher Feedback:</span>
                            <span>{sub.remark}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Teacher's Personal Handwritten Diary Note for Parents */}
                <div className="p-4 sm:p-5 rounded-3xl bg-amber-500/[0.06] border border-amber-500/25 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                      <span>शिक्षक की व्यक्तिगत टिप्पणी (Teacher&apos;s Advice for Parents)</span>
                    </span>
                    <Badge variant="secondary" className="text-[10px]">Certified by STA Faculty</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed italic">
                    &ldquo;{reportData.teacherRemark}&rdquo;
                  </p>
                </div>

                {/* Strengths & Focus Areas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-2">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 text-xs">
                      <CheckCircle2 className="h-4 w-4" /> मजबूत पक्ष (Key Strengths)
                    </span>
                    <ul className="space-y-1.5 text-muted-foreground text-[11px]">
                      {reportData.strengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold shrink-0">✓</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-500/[0.04] border border-sky-500/20 space-y-2">
                    <span className="font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1.5 text-xs">
                      <AlertCircle className="h-4 w-4" /> सुधार योग्य क्षेत्र (Action Plan)
                    </span>
                    <ul className="space-y-1.5 text-muted-foreground text-[11px]">
                      {reportData.focusAreas.map((foc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-sky-600 font-bold shrink-0">→</span>
                          <span>{foc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Upcoming Target Strip */}
                <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 text-xs flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Clock className="h-3.5 w-3.5 text-primary" /> {reportData.nextTestDate}
                  </span>
                  <span className="text-primary font-bold text-[11px]">Syllabus Available in Batches</span>
                </div>

                {/* Action Buttons: WhatsApp to Parents & Download PDF */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    onClick={handleShareToWhatsApp}
                    className="w-full sm:flex-1 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-11 gap-2 shadow-md shadow-emerald-600/20"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>WhatsApp Report to Parents (माता-पिता को भेजें)</span>
                  </Button>
                  <Button
                    onClick={handlePrintReport}
                    variant="outline"
                    className="w-full sm:w-auto rounded-2xl font-bold text-xs h-11 px-5 gap-2 border-border/80"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print / Save PDF</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ================= MY BATCHES & LECTURES TAB ================= */}
        {activeTab === "batches" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">My Enrolled Course Curriculum</h2>
              <p className="text-xs text-muted-foreground">{student.enrolledBatch}</p>
            </div>

            {/* Active Lecture Player Box */}
            {activeLecture ? (
              <Card className="rounded-3xl border border-border/80 overflow-hidden shadow-xl bg-card space-y-4">
                <div className="relative aspect-video bg-black flex items-center justify-center text-white overflow-hidden select-none">
                  <iframe
                    className="w-full h-full"
                    src={getYouTubeEmbedUrl(activeLecture.videoUrl)}
                    title={activeLecture.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white/70 text-[10px] font-mono px-2 py-0.5 rounded pointer-events-none">
                    STA CLASSES • {student.name} ({student.phone})
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs font-semibold text-primary">
                      {activeLecture.chapter}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground">{activeLecture.duration}</span>
                  </div>

                  <h3 className="text-base font-bold text-foreground">{activeLecture.title}</h3>

                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button
                      size="sm"
                      className="rounded-xl text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => {
                        toast({ title: "Marked Completed!", description: "Progress updated in your curriculum register." });
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4" /> Mark as Completed
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl text-xs"
                      onClick={() => setActiveLecture(null)}
                    >
                      Close Player
                    </Button>
                  </div>
                </div>
              </Card>
            ) : null}

            {/* Subject Curriculum Explorer */}
            <Tabs defaultValue="physics" className="w-full space-y-4">
              <TabsList className="grid grid-cols-3 rounded-2xl h-10 p-1">
                <TabsTrigger value="physics" className="rounded-xl text-xs font-semibold">Physics</TabsTrigger>
                <TabsTrigger value="chemistry" className="rounded-xl text-xs font-semibold">Chemistry</TabsTrigger>
                <TabsTrigger value="maths" className="rounded-xl text-xs font-semibold">Mathematics</TabsTrigger>
              </TabsList>

              <TabsContent value="physics" className="space-y-4">
                <Card className="rounded-3xl border border-border/80 p-5 bg-card space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">Chapter 1: Light Reflection & Refraction</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{enrolledLectures.length} Video Lectures • PDF Notes</p>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-none text-[10px]">Active Chapter</Badge>
                  </div>

                  <div className="space-y-2 pt-2 border-t text-xs">
                    {enrolledLectures.map((lec, idx) => (
                      <div
                        key={lec.id || idx}
                        className={`p-3 rounded-2xl transition-colors flex items-center justify-between cursor-pointer ${
                          activeLecture?.title === lec.title
                            ? "bg-primary/10 border border-primary/30 shadow-sm"
                            : "bg-muted/40 hover:bg-muted/70"
                        }`}
                        onClick={() => {
                          setActiveLecture({
                            title: lec.title,
                            chapter: "Light Reflection & Refraction",
                            duration: lec.duration,
                            videoUrl: lec.videoUrl,
                            completed: !!lec.completed,
                          });
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <Play className={`h-4 w-4 shrink-0 ${activeLecture?.title === lec.title ? "text-primary fill-primary" : "text-primary"}`} />
                          <span className="font-semibold text-foreground">{lec.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground">{lec.duration}</span>
                          {activeLecture?.title === lec.title ? (
                            <span className="text-[10px] text-primary font-bold animate-pulse">PLAYING NOW 🔊</span>
                          ) : lec.completed ? (
                            <span className="text-[10px] text-emerald-600 font-bold">COMPLETED</span>
                          ) : (
                            <span className="text-[10px] text-primary font-bold">WATCH ▶</span>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* PDF Note Download */}
                    <div className="p-3 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="font-semibold text-foreground">Handwritten Revision Notes (PDF)</span>
                          <span className="text-[10px] text-muted-foreground block">3.2 MB • Verified Teacher Notes</span>
                        </div>
                      </div>
                      <Button asChild size="sm" variant="outline" className="h-7 text-xs rounded-lg gap-1 border-emerald-500/30 text-emerald-600">
                        <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" rel="noopener noreferrer">
                          <Download className="h-3 w-3" /> Download PDF
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="chemistry">
                <Card className="rounded-3xl border border-dashed p-10 text-center text-xs text-muted-foreground">
                  Chemistry chapters: Chemical Reactions & Equations, Acids Bases and Salts.
                </Card>
              </TabsContent>

              <TabsContent value="maths">
                <Card className="rounded-3xl border border-dashed p-10 text-center text-xs text-muted-foreground">
                  Mathematics chapters: Real Numbers, Polynomials, Quadratic Equations.
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* ================= DOUBTS RESOLUTION TAB (UPGRADED AI + VOICE + MULTI-LANG) ================= */}
        {activeTab === "doubts" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary" />
                  <span>24x7 AI Doubt Solver (डाउट समाधान केंद्र)</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Class 4 to 12 Maths, Science, English step-by-step solutions with audio explanations
                </p>
              </div>

              {/* Sub-tab Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-2xl border border-border/60">
                <Button
                  size="sm"
                  variant={doubtSubTab === "ai" ? "default" : "ghost"}
                  onClick={() => setDoubtSubTab("ai")}
                  className="rounded-xl text-xs h-8 gap-1.5 font-bold"
                >
                  <Bot className="h-3.5 w-3.5" /> 🤖 AI Solver (Instant)
                </Button>
                <Button
                  size="sm"
                  variant={doubtSubTab === "faculty" ? "default" : "ghost"}
                  onClick={() => setDoubtSubTab("faculty")}
                  className="rounded-xl text-xs h-8 gap-1.5 font-bold"
                >
                  <User className="h-3.5 w-3.5" /> 👨‍🏫 Ask Teacher (Photo)
                </Button>
              </div>
            </div>

            {/* SUB-TAB 1: UPGRADED AI CHATBOT */}
            {doubtSubTab === "ai" && (
              <div className="space-y-4">
                {/* Language & Subject Control Bar */}
                <div className="p-3.5 rounded-3xl bg-card border border-border/80 flex flex-wrap items-center justify-between gap-3">
                  {/* Language Selector */}
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-[11px] font-bold text-muted-foreground mr-1">Bhasha:</span>
                    <button
                      type="button"
                      onClick={() => setAiLanguage("hinglish")}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                        aiLanguage === "hinglish"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      🇮🇳 Hinglish
                    </button>
                    <button
                      type="button"
                      onClick={() => setAiLanguage("hindi")}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                        aiLanguage === "hindi"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      हिंदी (Hindi)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAiLanguage("english")}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                        aiLanguage === "english"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      English
                    </button>
                  </div>

                  {/* Subject Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                    {["All", "Maths", "Physics", "Chemistry", "Biology", "English"].map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setSelectedSubjectFilter(sub)}
                        className={`text-[11px] px-2.5 py-0.5 rounded-xl font-semibold transition-all shrink-0 ${
                          selectedSubjectFilter === sub
                            ? "bg-violet-600 text-white"
                            : "bg-muted/70 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Topic Chips */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-muted-foreground">Quick Doubt Topics (Click to ask):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Photosynthesis equation samjhao 🌿",
                      "Ohm's Law formula & numerical ⚡",
                      "Pythagoras theorem proof 📐",
                      "Mitochondria powerhouse kyu? 🧬",
                      "Newton's 3 laws of motion 🚀",
                      "Quadratic equation roots formula 🧮",
                      "Chemical equation balance karna ⚖️",
                      "Active to Passive voice rules ✍️",
                    ].map((topic, tIdx) => (
                      <button
                        key={tIdx}
                        type="button"
                        onClick={() => handleSendAiDoubt(topic)}
                        className="text-[11px] px-2.5 py-1 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold border border-primary/20 transition-all hover:scale-105 active:scale-95"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Chat Window */}
                <Card className="rounded-3xl border border-border/80 shadow-md bg-card overflow-hidden flex flex-col h-[540px]">
                  {/* Chat Header */}
                  <div className="p-3.5 px-4 bg-muted/40 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-foreground flex items-center gap-1.5">
                          STA Master AI Tutor
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {student.classGrade} • {aiLanguage.toUpperCase()} Mode • Instant Step-by-Step
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setAiMessages([
                            {
                              id: `w-${Date.now()}`,
                              sender: "ai",
                              text: "✨ Chat cleared! Poochiye apna naya doubt.",
                              time: "Just now",
                            },
                          ]);
                        }}
                        className="h-7 text-[10px] text-muted-foreground hover:text-foreground"
                      >
                        Clear Chat
                      </Button>
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-slate-950/20">
                    {aiMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 max-w-[92%] sm:max-w-[85%] ${
                          msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                        }`}
                      >
                        <div
                          className={`h-8 w-8 rounded-2xl flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
                            msg.sender === "user"
                              ? "bg-gradient-to-tr from-sky-500 to-blue-600 text-white"
                              : "bg-gradient-to-tr from-violet-600 to-indigo-600 text-white"
                          }`}
                        >
                          {msg.sender === "user" ? student.name.charAt(0) : <Bot className="h-4 w-4" />}
                        </div>

                        <div
                          className={`rounded-3xl p-4 text-xs space-y-2 shadow-sm leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-none font-medium"
                              : "bg-card border border-border/80 text-foreground rounded-tl-none whitespace-pre-wrap"
                          }`}
                        >
                          <div>{msg.text}</div>

                          <div
                            className={`text-[10px] pt-1.5 border-t border-border/40 flex items-center justify-between ${
                              msg.sender === "user" ? "text-primary-foreground/75" : "text-muted-foreground"
                            }`}
                          >
                            <span>{msg.time}</span>
                            {msg.sender === "ai" && (
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleSpeakText(msg.id, msg.text)}
                                  className="hover:text-primary transition-colors flex items-center gap-1 font-semibold"
                                  title="Listen answer aloud"
                                >
                                  {speakingMessageId === msg.id ? (
                                    <>
                                      <VolumeX className="h-3.5 w-3.5 text-red-500" />
                                      <span className="text-red-500">Stop</span>
                                    </>
                                  ) : (
                                    <>
                                      <Volume2 className="h-3.5 w-3.5 text-primary" />
                                      <span>Listen 🔊</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(msg.text);
                                    setCopiedMsgId(msg.id);
                                    setTimeout(() => setCopiedMsgId(null), 2000);
                                    toast({ title: "Answer copied to clipboard!" });
                                  }}
                                  className="hover:text-primary transition-colors flex items-center gap-1 font-semibold"
                                  title="Copy answer"
                                >
                                  {copiedMsgId === msg.id ? (
                                    <>
                                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                                      <span className="text-emerald-500">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3.5 w-3.5" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* AI Loading indicator */}
                    {aiLoading && (
                      <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                        <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shrink-0">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="rounded-2xl p-3.5 bg-card border border-border/80 text-xs text-muted-foreground flex items-center gap-2.5 shadow-sm">
                          <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                          <span>AI Mentor is preparing step-by-step derivation & formulas...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Form with Voice Button */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendAiDoubt();
                    }}
                    className="p-3 bg-card border-t border-border/80 flex items-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={handleToggleVoiceInput}
                      className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                        isListening
                          ? "bg-red-500 text-white animate-pulse"
                          : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                      }`}
                      title={isListening ? "Listening... click to stop" : "Speak question in Hindi or English"}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </button>

                    <Input
                      placeholder="Maths, Science, English ka doubt poochhein (e.g. Ohm's law, Quadratic roots, Photosynthesis)..."
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      disabled={aiLoading}
                      className="rounded-2xl text-xs sm:text-sm h-11 bg-muted/30 focus-visible:ring-primary flex-1"
                    />

                    <Button
                      type="submit"
                      disabled={aiLoading || !aiInput.trim()}
                      className="rounded-2xl h-11 px-5 text-xs font-bold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shrink-0"
                    >
                      <Send className="h-4 w-4" />
                      <span className="hidden sm:inline">Poochhein</span>
                    </Button>
                  </form>
                </Card>
              </div>
            )}

            {/* SUB-TAB 2: FACULTY PHOTO DOUBTS */}
            {doubtSubTab === "faculty" && (
              <div className="space-y-6">
                <Card className="rounded-3xl border border-border/80 p-5 bg-card space-y-3">
                  <form onSubmit={handleAskDoubt} className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold">Describe Your Question</Label>
                      <Textarea
                        rows={3}
                        required
                        placeholder="Apne question ya homework problem ko detail me likhein..."
                        value={doubtText}
                        onChange={(e) => setDoubtText(e.target.value)}
                        className="rounded-2xl text-xs resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Button type="button" variant="outline" size="sm" className="rounded-xl text-xs gap-1.5">
                        <Upload className="h-3.5 w-3.5 text-primary" /> Attach Question Photo
                      </Button>
                      <Button type="submit" size="sm" className="rounded-xl text-xs gap-1.5 shadow-md">
                        <Send className="h-3.5 w-3.5" /> Submit Question
                      </Button>
                    </div>
                  </form>
                </Card>

                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-foreground">Previous Question History</h3>
                  {doubtsList.map((d) => (
                    <Card key={d.id} className="rounded-2xl border p-4 bg-card space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">{d.chapter}</span>
                        <Badge variant={d.status === "answered" ? "default" : "outline"} className="text-[10px] py-0">
                          {d.status === "answered" ? "Answered" : "Pending Review"}
                        </Badge>
                      </div>
                      <p className="text-foreground font-medium">{d.question}</p>
                      {d.answer && (
                        <div className="p-3 rounded-xl bg-primary/[0.04] border border-primary/20 text-muted-foreground mt-2">
                          <span className="font-bold text-primary block mb-0.5">Teacher Response:</span>
                          {d.answer}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= PROFILE & PERSISTENT SESSION TAB ================= */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">Student Profile & Settings</h2>
              <p className="text-xs text-muted-foreground">Manage your credentials, persistent login, and tuition record</p>
            </div>

            <Card className="rounded-3xl border border-border/80 p-6 bg-card space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg">
                  {student.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-black text-lg text-foreground">{student.name}</h3>
                  <p className="text-xs text-muted-foreground">{student.classGrade} • Roll No: {reportData.rollNo}</p>
                  <p className="text-xs font-mono text-primary font-semibold">{student.phone}</p>
                </div>
              </div>

              {/* Persistent Session Notification */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-700 dark:text-emerald-400">
                    Persistent 1-Year Session Active
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Aapka account is device me permanently saved hai. Jab bhi aap website open karenge, aapko baar-baar login nahi karna padega.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t text-xs">
                <div className="p-3 rounded-2xl bg-muted/40">
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Attendance Record</div>
                  <div className="text-base font-extrabold text-emerald-600 mt-1">{student.attendancePercent}%</div>
                  <div className="text-[10px] text-muted-foreground">Target: 85%+ Regular</div>
                </div>

                <div className="p-3 rounded-2xl bg-muted/40">
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Tuition Fees</div>
                  <div className="text-base font-extrabold text-emerald-600 mt-1">{student.feeStatus}</div>
                  <div className="text-[10px] text-muted-foreground">Session 2026-27 Active</div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full rounded-2xl text-xs h-11 border-red-500/30 text-red-600 hover:bg-red-500/10 font-bold"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout / Switch Student (लॉगआउट करें)</span>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border/80 py-2 px-2 sm:px-3 shadow-lg flex items-center justify-around w-full max-w-full overflow-hidden">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === "home" ? "text-primary font-black" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <HomeIcon className="h-4 w-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab("batches")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === "batches" ? "text-primary font-black" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Batches</span>
        </button>

        <button
          onClick={() => setActiveTab("reports")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === "reports" ? "text-violet-600 font-black" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Report 📊</span>
        </button>

        <button
          onClick={() => setActiveTab("doubts")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === "doubts" ? "text-primary font-black" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>AI Doubts 🤖</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === "profile" ? "text-primary font-black" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
