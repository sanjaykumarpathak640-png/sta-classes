import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Video, 
  FileText, 
  CheckCircle2, 
  Radio, 
  HelpCircle, 
  Award, 
  ArrowRight,
  ShieldCheck,
  Smartphone
} from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Interactive Video Lectures",
      description: "Subject > Chapter > Lecture hierarchy with progress tracking and secure video player.",
      icon: Video,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Handwritten Notes & PDFs",
      description: "High-resolution chapter notes viewable directly in-app with signed, secure URLs.",
      icon: FileText,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      title: "Live Interactive Classes",
      description: "Scheduled timetable with direct 1-click meeting join enabled 10 minutes prior.",
      icon: Radio,
      color: "text-red-500",
      bg: "bg-red-50 dark:bg-red-950/30",
    },
    {
      title: "Real Exam Tests & Quizzes",
      description: "Timed MCQ tests, instant scoring on server, answer key explanations, and batch rank.",
      icon: Award,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      title: "Photo Doubt Resolution",
      description: "Upload photo of problem directly to teacher inbox with instant status updates.",
      icon: HelpCircle,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      title: "Attendance & Fee Tracking",
      description: "Monthly calendar attendance view, fee dues, payment history, and WhatsApp receipts.",
      icon: ShieldCheck,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight">STA Classes</span>
              <span className="hidden sm:inline-block ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                PW Style Platform
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-xl">
              Student Login
            </Button>
            <Button size="sm" className="rounded-xl shadow-sm">
              Admin Portal
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container py-8 md:py-16 space-y-12">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="secondary" className="px-3 py-1 rounded-full text-xs font-medium text-primary bg-primary/10 border-primary/20">
            🚀 Phase 1: Setup & Architecture Completed
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Empowering Every Student with <span className="text-primary">STA Classes</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
            A comprehensive, mobile-first coaching platform engineered with Next.js 14, Tailwind CSS, 
            shadcn/ui, and Supabase. Optimized for web, PWA, and seamless Android APK compilation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button size="lg" className="rounded-2xl px-6 shadow-md shadow-primary/20 gap-2">
              Explore Batches <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-6">
              <Smartphone className="h-4 w-4 mr-2 text-primary" /> Install App
            </Button>
          </div>
        </div>

        {/* Phase Roadmap Progress Card */}
        <Card className="rounded-2xl border shadow-sm max-w-3xl mx-auto overflow-hidden">
          <CardHeader className="bg-primary/5 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Project Implementation Progress</CardTitle>
                <CardDescription className="text-xs">10-Phase Roadmap defined in PROJECT_PLAN.md</CardDescription>
              </div>
              <Badge className="bg-primary text-primary-foreground font-semibold">10% Done</Badge>
            </div>
            <div className="pt-3">
              <Progress value={10} className="h-2 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="pt-4 text-xs space-y-2.5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-2 text-emerald-600 font-medium">
                <CheckCircle2 className="h-4 w-4" /> Phase 1: Project Setup + Master Plan
              </span>
              <span className="text-emerald-600 font-semibold">COMPLETED</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Phase 2: Database Schema & Supabase RLS
              </span>
              <span className="text-primary font-medium">UP NEXT</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground opacity-60">
              <span>Phase 3: Auth, Roles (Admin/Student) & Landing Page</span>
              <span>Pending</span>
            </div>
          </CardContent>
        </Card>

        {/* Core Modules Grid */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Platform Features & Capabilities</h2>
            <p className="text-xs md:text-sm text-muted-foreground">Designed for students, teachers, and administrators.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="rounded-2xl border transition-all hover:shadow-md hover:border-primary/40">
                  <CardHeader className="pb-3">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${item.bg} mb-2`}>
                      <Icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-background">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} STA Classes. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Next.js 14 & Supabase</span>
            <span>•</span>
            <span>Mobile-First Capacitor Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
