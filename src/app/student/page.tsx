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
  Check
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

export default function StudentPortalPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState<"home" | "batches" | "tests" | "doubts" | "profile">("home");

  // Student Mock State
  const student = {
    name: "Aarav Patel",
    phone: "+91 62016 30760",
    classGrade: "Class 10th",
    enrolledBatch: "Class 10 Board Excellence 2026-27",
    attendancePercent: 94,
    feeStatus: "Paid (No Dues)",
    overallProgress: 38,
  };

  // Helper to convert any YouTube URL (watch, youtu.be, live, embed) to an embed URL
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

  // Ask Doubt Form
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
      chapter: "Current Electricity",
      status: "pending",
      date: "Just now",
    };

    setDoubtsList([newDoubt, ...doubtsList]);
    setDoubtText("");
    toast({
      title: "Doubt Submitted Successfully!",
      description: "Teacher will review and answer in your doubt inbox.",
    });
  };

  // AI Doubt Solver State
  const [doubtSubTab, setDoubtSubTab] = React.useState<"ai" | "faculty">("ai");
  const [aiInput, setAiInput] = React.useState("");
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiMessages, setAiMessages] = React.useState<Array<{
    id: string;
    sender: "user" | "ai";
    text: string;
    time: string;
  }>>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "👋 Namaste! Main STA Classes ka AI Study Mentor hu. Class 4 se 12 tak Physics, Chemistry, Maths, Biology ya English me koi bhi doubt poocho — main step-by-step aasan bhasha me samjhaunga!",
      time: "Online",
    },
  ]);

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
          text: "Network issue ya connection error. Please dobara poochhein.",
          time: "Just now",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background pb-20 md:pb-8 flex flex-col">
      {/* Top Mobile Bar */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-foreground">STA Classes</div>
            <div className="text-[10px] text-muted-foreground font-semibold">Student App</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Badge variant="outline" className="text-[10px] font-semibold text-primary border-primary/20">
              Switch to Admin
            </Badge>
          </Link>
          <div className="h-7 w-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
            AP
          </div>
        </div>
      </header>

      {/* Main Tab Views */}
      <main className="flex-1 container max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* ================= HOME TAB ================= */}
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Student Greeting Card */}
            <div className="rounded-3xl bg-gradient-to-r from-primary via-violet-600 to-indigo-600 p-6 text-white shadow-xl shadow-primary/20 space-y-2">
              <span className="text-[11px] font-semibold bg-white/20 px-2.5 py-0.5 rounded-full inline-block">
                Session 2026-27 Active
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Namaste, {student.name}! 👋
              </h2>
              <p className="text-white/80 text-xs sm:text-sm">
                You have 1 live class today and 2 video lectures in your queue.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span>Course Completion: {student.overallProgress}%</span>
              </div>
              <Progress value={student.overallProgress} className="h-2 bg-white/20" />
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

            {/* Recent Notices */}
            <Card className="rounded-3xl border border-border/80 p-5 shadow-sm bg-card space-y-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" /> Latest Notice Board
              </CardTitle>
              <div className="p-3 rounded-2xl bg-muted/30 border border-border/50 text-xs space-y-1">
                <div className="font-bold text-foreground">Sunday Subjective Answer Writing Marathon</div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Mock board paper test on 10th May from 10:00 AM to 1:00 PM. Presence is compulsory for all Class 10 students.
                </p>
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

            {/* Active Lecture Player Box with Moving Watermark Security */}
            {activeLecture ? (
              <Card className="rounded-3xl border border-border/80 overflow-hidden shadow-xl bg-card space-y-4">
                <div className="relative aspect-video bg-black flex items-center justify-center text-white overflow-hidden select-none">
                  {/* Embedded responsive YouTube video */}
                  <iframe
                    className="w-full h-full"
                    src={getYouTubeEmbedUrl(activeLecture.videoUrl)}
                    title={activeLecture.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Anti-Screen Recording Moving Watermark Overlay */}
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
                {/* Chapter Card */}
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

                    {/* PYQ Previous Year Question Paper */}
                    <div className="p-3 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Award className="h-4 w-4 text-amber-500 shrink-0" />
                        <div>
                          <span className="font-semibold text-foreground">CBSE 2024 Solved Board PYQ Paper</span>
                          <span className="text-[10px] text-muted-foreground block">Past 10 Years Question Bank + Solution Key</span>
                        </div>
                      </div>
                      <Button asChild size="sm" variant="outline" className="h-7 text-xs rounded-lg gap-1 border-amber-500/30 text-amber-600 hover:bg-amber-500/10">
                        <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" rel="noopener noreferrer">
                          <Download className="h-3 w-3" /> Solved PYQ
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

        {/* ================= TESTS & QUIZZES TAB ================= */}
        {activeTab === "tests" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">Examinations & Mock Tests</h2>
              <p className="text-xs text-muted-foreground">Timed practice tests with instant server grading and batch rank</p>
            </div>

            <Card className="rounded-3xl border border-border/80 p-5 bg-card space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-primary/10 text-primary border-none text-[10px]">LIVE NOW</Badge>
                <span className="text-xs font-mono text-muted-foreground">90 Mins • 80 Marks</span>
              </div>

              <div>
                <h3 className="font-bold text-base text-foreground">Science Full Syllabus Mock Test #1</h3>
                <p className="text-xs text-muted-foreground mt-0.5">MCQ questions covering Physics, Chemistry and Biology</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-muted/40 text-xs space-y-1">
                <div className="flex justify-between"><span>Number of Questions:</span><span className="font-bold">40 MCQs</span></div>
                <div className="flex justify-between"><span>Marking Scheme:</span><span className="font-bold">+2 for Correct, -0.5 Negative</span></div>
              </div>

              <Button
                className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 text-xs shadow-md"
                onClick={() => {
                  toast({
                    title: "Exam Environment Initialized!",
                    description: "Starting timer (90 mins). Do not close or refresh window.",
                  });
                }}
              >
                Start Examination Now →
              </Button>
            </Card>
          </div>
        )}

        {/* ================= DOUBTS RESOLUTION TAB (AI CHAT + FACULTY) ================= */}
        {activeTab === "doubts" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" /> Doubt Solving Desk
                </h2>
                <p className="text-xs text-muted-foreground">
                  24x7 AI Mentor se turant samjhein ya apne tuition teacher ko photo bhej kar poochhein
                </p>
              </div>

              {/* Sub-tab Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-2xl border border-border/60">
                <Button
                  size="sm"
                  variant={doubtSubTab === "ai" ? "default" : "ghost"}
                  onClick={() => setDoubtSubTab("ai")}
                  className="rounded-xl text-xs h-8 gap-1.5 font-semibold"
                >
                  <Bot className="h-3.5 w-3.5" /> 🤖 AI Doubt Solver (Instant)
                </Button>
                <Button
                  size="sm"
                  variant={doubtSubTab === "faculty" ? "default" : "ghost"}
                  onClick={() => setDoubtSubTab("faculty")}
                  className="rounded-xl text-xs h-8 gap-1.5 font-semibold"
                >
                  <User className="h-3.5 w-3.5" /> 👨‍🏫 Ask Teacher (Photo)
                </Button>
              </div>
            </div>

            {/* SUB-TAB 1: AI DOUBT CHATBOT */}
            {doubtSubTab === "ai" && (
              <div className="space-y-4">
                {/* Quick Topic Chips */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-muted-foreground">Quick Doubt Starters (Click to Ask):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Photosynthesis equation samjhao 🌿",
                      "Ohm's Law formula & numerical ⚡",
                      "Mitochondria powerhouse kyu? 🧬",
                      "Pythagoras theorem proof 📐",
                      "Newton's 3 laws of motion 🚀",
                      "Quadratic equations formula 🧮",
                      "Active & Passive voice rules ✍️",
                    ].map((topic, tIdx) => (
                      <button
                        key={tIdx}
                        type="button"
                        onClick={() => handleSendAiDoubt(topic)}
                        className="text-[11px] px-2.5 py-1 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-medium border border-primary/20 transition-all hover:scale-105 active:scale-95"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Chat Window */}
                <Card className="rounded-3xl border border-border/80 shadow-md bg-card overflow-hidden flex flex-col h-[520px]">
                  {/* Chat Header */}
                  <div className="p-3.5 px-4 bg-muted/40 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          STA AI Study Mentor
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="text-[10px] text-muted-foreground">Class 4 to 12 Academic Tutor • 24x7 Active</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                      Smart Pedagogical AI
                    </Badge>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/30 dark:bg-slate-950/20">
                    {aiMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 max-w-[88%] sm:max-w-[80%] ${
                          msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                        }`}
                      >
                        <div
                          className={`h-7 w-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-violet-600 text-white"
                          }`}
                        >
                          {msg.sender === "user" ? "AP" : <Bot className="h-4 w-4" />}
                        </div>

                        <div
                          className={`rounded-2xl p-3.5 text-xs space-y-1.5 shadow-sm leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-none font-medium"
                              : "bg-card border border-border/80 text-foreground rounded-tl-none whitespace-pre-wrap"
                          }`}
                        >
                          <div>{msg.text}</div>
                          <div
                            className={`text-[9px] pt-1 flex items-center justify-between ${
                              msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            <span>{msg.time}</span>
                            {msg.sender === "ai" && (
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(msg.text);
                                  toast({ title: "Copied to clipboard!" });
                                }}
                                className="hover:text-primary transition-colors flex items-center gap-1"
                                title="Copy answer"
                              >
                                <Copy className="h-3 w-3" /> Copy
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* AI Loading indicator */}
                    {aiLoading && (
                      <div className="flex gap-2.5 max-w-[80%] mr-auto items-center">
                        <div className="h-7 w-7 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="rounded-2xl p-3 bg-card border border-border/80 text-xs text-muted-foreground flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                          <span>AI Mentor doubt ka step-by-step answer bana raha hai...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendAiDoubt();
                    }}
                    className="p-3 bg-card border-t border-border/80 flex items-center gap-2"
                  >
                    <Input
                      placeholder="Maths, Science, English ka doubt poochhein (e.g. Newton's laws ya Pythagoras)..."
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      disabled={aiLoading}
                      className="rounded-2xl text-xs h-10 bg-muted/30 focus-visible:ring-primary"
                    />
                    <Button
                      type="submit"
                      disabled={aiLoading || !aiInput.trim()}
                      className="rounded-2xl h-10 px-4 text-xs font-semibold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                    >
                      <Send className="h-3.5 w-3.5" /> Poochhein
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

        {/* ================= PROFILE & ATTENDANCE TAB ================= */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">Student Profile & Records</h2>
              <p className="text-xs text-muted-foreground">Manage your credentials, fee receipts, and attendance</p>
            </div>

            <Card className="rounded-3xl border border-border/80 p-6 bg-card space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary to-violet-500 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
                  AP
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">{student.name}</h3>
                  <p className="text-xs text-muted-foreground">{student.classGrade}</p>
                  <p className="text-xs font-mono text-primary font-semibold">{student.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t text-xs">
                <div className="p-3 rounded-2xl bg-muted/40">
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Attendance</div>
                  <div className="text-base font-extrabold text-emerald-600 mt-1">{student.attendancePercent}%</div>
                  <div className="text-[10px] text-muted-foreground">Target: 85%+</div>
                </div>

                <div className="p-3 rounded-2xl bg-muted/40">
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Tuition Fees</div>
                  <div className="text-base font-extrabold text-emerald-600 mt-1">{student.feeStatus}</div>
                  <div className="text-[10px] text-muted-foreground">Session 2026-27</div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Button asChild variant="outline" className="w-full rounded-2xl text-xs h-10">
                  <Link href="/login">
                    <LogOut className="h-4 w-4 mr-2 text-destructive" /> Sign Out
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border/80 py-2 px-3 shadow-lg flex items-center justify-around">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === "home" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <HomeIcon className="h-4 w-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab("batches")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === "batches" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Batches</span>
        </button>

        <button
          onClick={() => setActiveTab("tests")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === "tests" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Award className="h-4 w-4" />
          <span>Tests</span>
        </button>

        <button
          onClick={() => setActiveTab("doubts")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === "doubts" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Doubts</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-colors ${
            activeTab === "profile" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}

