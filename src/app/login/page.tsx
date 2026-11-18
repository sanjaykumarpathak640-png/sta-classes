"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GraduationCap, ArrowRight, Lock, Mail, Phone, ShieldCheck, Sparkles, CheckCircle2, UserCheck, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface SavedStudentSession {
  name: string;
  phone: string;
  classGrade: string;
  enrolledBatch: string;
  loggedInAt: string;
}

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [role, setRole] = React.useState<"student" | "admin">("student");
  const [studentName, setStudentName] = React.useState("");
  const [classGrade, setClassGrade] = React.useState("Class 10th");
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [existingSession, setExistingSession] = React.useState<SavedStudentSession | null>(null);

  // Check persistent student session on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("sta_student_session");
      if (stored) {
        const parsed = JSON.parse(stored) as SavedStudentSession;
        if (parsed?.name) {
          setExistingSession(parsed);
        }
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    if (searchParams.get("error") === "admin_required") {
      setRole("admin");
      toast({
        title: "Admin Access Required",
        description: "Please sign in with administrator credentials.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  const handleContinueExisting = () => {
    toast({
      title: `Welcome back, ${existingSession?.name || "Student"}!`,
      description: "Opening your personalized learning portal...",
    });
    router.push("/student");
  };

  const handleClearSession = () => {
    try {
      localStorage.removeItem("sta_student_session");
      document.cookie = "sta_student_auth=; path=/; max-age=0";
    } catch {}
    setExistingSession(null);
    toast({
      title: "Account Switched",
      description: "Aap naye student ke roop me login kar sakte hain.",
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (role === "admin") {
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok || !data.success) {
          toast({
            title: "Access Denied",
            description: data.error || "Galat Admin Password! Kripya sahi password daalein.",
            variant: "destructive",
          });
          return;
        }

        if (typeof document !== "undefined") {
          document.cookie = "sta_admin_auth=sta_admin_authenticated_secure_token; path=/; max-age=2592000; SameSite=Lax";
        }

        toast({ 
          title: "Welcome, Master Admin!", 
          description: "Accessing STA Classes Control Deck with full privileges." 
        });
        window.location.href = "/admin";
      } catch {
        setLoading(false);
        toast({
          title: "Error",
          description: "Network error. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Student Persistent Login
      const finalName = studentName.trim() || identifier.split("@")[0] || "Aarav Patel";
      const studentSession: SavedStudentSession = {
        name: finalName,
        phone: identifier.trim() || "+91 62016 30760",
        classGrade: classGrade,
        enrolledBatch: `${classGrade} Excellence Batch 2026-27`,
        loggedInAt: new Date().toISOString(),
      };

      try {
        // Save permanently in localStorage & 1-Year cookie
        localStorage.setItem("sta_student_session", JSON.stringify(studentSession));
        document.cookie = `sta_student_auth=1; path=/; max-age=31536000; SameSite=Lax`;
      } catch {}

      setTimeout(() => {
        setLoading(false);
        toast({ 
          title: `Welcome, ${finalName}! 🎓`, 
          description: "Aapka session permanently save ho gaya hai. Ab baar-baar login nahi karna padega!" 
        });
        router.push("/student");
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/60 via-background to-background dark:from-background flex flex-col justify-center items-center p-3 sm:p-4 w-full max-w-full overflow-x-hidden">
      <Link href="/" className="flex items-center gap-3 mb-6 sm:mb-8 group">
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105 shrink-0">
          <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="min-w-0">
          <span className="font-black text-xl sm:text-3xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent block truncate">
            STA CLASSES
          </span>
          <span className="block text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-widest font-bold truncate">
            Tuition Learning Portal • Barh
          </span>
        </div>
      </Link>

      <Card className="w-full max-w-md rounded-3xl border border-border/80 shadow-2xl bg-card p-4 sm:p-8">
        <CardHeader className="p-0 pb-6 text-center space-y-1">
          <CardTitle className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            {role === "student" ? "Student Learning Portal" : "Admin Sign In"}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {role === "student"
              ? "Access your live classes, report card for parents, notes & 24x7 AI doubt solver"
              : "Manage batches, add video links, tests, notes and website settings"}
          </CardDescription>

          <div className="pt-4 flex justify-center">
            <Tabs value={role} onValueChange={(v) => setRole(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl h-11 p-1 bg-muted/60">
                <TabsTrigger
                  value="student"
                  className="rounded-xl text-xs font-bold gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  <GraduationCap className="h-4 w-4" /> Student Login
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="rounded-xl text-xs font-bold gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <ShieldCheck className="h-4 w-4" /> Admin Panel
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        {/* Persistent Login Fast-Pass Card if already logged in */}
        {role === "student" && existingSession && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-indigo-500/10 border border-sky-500/20 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm shrink-0">
                {existingSession.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-foreground truncate">{existingSession.name}</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {existingSession.classGrade} • {existingSession.phone}
                </div>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleContinueExisting}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs h-10 shadow-md gap-2"
            >
              <span>Continue to Student Portal (सीधे अंदर जाएं)</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <button
              type="button"
              onClick={handleClearSession}
              className="w-full text-center text-[11px] text-muted-foreground hover:text-foreground font-medium flex items-center justify-center gap-1 transition-colors pt-1"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Switch Student / Dusre Number Se Login Karein</span>
            </button>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {role === "student" && (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="studentName" className="text-xs font-bold">
                  Student Full Name (विद्यार्थी का नाम)
                </Label>
                <Input
                  id="studentName"
                  placeholder="e.g. Aarav Kumar / Priya Kumari"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="rounded-xl text-xs sm:text-sm h-11"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="classGrade" className="text-xs font-bold">
                  Select Class / Grade (कक्षा चुनें)
                </Label>
                <select
                  id="classGrade"
                  value={classGrade}
                  onChange={(e) => setClassGrade(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs sm:text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-semibold"
                >
                  <option value="Class 4th">Class 4th (Primary Foundation)</option>
                  <option value="Class 5th">Class 5th (Primary Foundation)</option>
                  <option value="Class 6th">Class 6th (Middle School)</option>
                  <option value="Class 7th">Class 7th (Middle School)</option>
                  <option value="Class 8th">Class 8th (Middle School)</option>
                  <option value="Class 9th">Class 9th (Secondary Foundation)</option>
                  <option value="Class 10th">Class 10th (Matric / Board Special)</option>
                  <option value="Class 11th Science">Class 11th (Science - PCM/PCB)</option>
                  <option value="Class 11th Commerce">Class 11th (Commerce)</option>
                  <option value="Class 11th Arts">Class 11th (Arts)</option>
                  <option value="Class 12th Science">Class 12th (Science - Board + JEE/NEET)</option>
                  <option value="Class 12th Commerce">Class 12th (Commerce)</option>
                  <option value="Class 12th Arts">Class 12th (Arts)</option>
                </select>
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="identifier" className="text-xs font-bold">
              {role === "admin" ? "Admin Email Address" : "Registered Mobile Number or Email (फ़ोन या ईमेल)"}
            </Label>
            <Input
              id="identifier"
              required={role === "student"}
              placeholder={role === "admin" ? "sanjaykumarpathak640@gmail.com (Optional)" : "e.g. 6201630760 or student@mail.com"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="rounded-xl text-xs sm:text-sm h-11"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-bold">
                {role === "admin" ? "Master Admin Password" : "Password (Optional / default: 1234)"}
              </Label>
              {role === "student" && (
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓ Persistent 1-Year Login
                </span>
              )}
            </div>
            <Input
              id="password"
              type="password"
              required={role === "admin"}
              placeholder={role === "admin" ? "Enter Master Password" : "Enter password or leave blank"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl text-xs sm:text-sm h-11 font-mono"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold h-11 text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] gap-2 mt-2"
          >
            {loading ? "Signing in..." : role === "admin" ? "Access Admin Panel" : "Login & Save Session (Permanently)"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <CardFooter className="p-0 pt-6 mt-6 border-t flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
          {role === "student" && (
            <p>
              New student?{" "}
              <Link href="/signup" className="text-primary font-bold hover:underline">
                Register for Admission →
              </Link>
            </p>
          )}
          <Link href="/" className="hover:text-foreground">
            ← Return to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-muted-foreground">Loading login portal...</div>}>
      <LoginFormContent />
    </React.Suspense>
  );
}
