"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GraduationCap, ArrowRight, Lock, Mail, Phone, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [role, setRole] = React.useState<"student" | "admin">("student");
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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

        toast({ 
          title: "Welcome, Master Admin!", 
          description: "Accessing STA Classes Control Deck with full privileges." 
        });
        router.push("/admin");
        router.refresh();
      } catch {
        setLoading(false);
        toast({
          title: "Error",
          description: "Network error. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setTimeout(() => {
        setLoading(false);
        toast({ title: "Welcome back!", description: "Loading student learning portal..." });
        router.push("/student");
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/60 via-background to-background dark:from-background flex flex-col justify-center items-center p-4">
      <Link href="/" className="flex items-center gap-3 mb-8 group">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <span className="font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent block">
            STA CLASSES
          </span>
          <span className="block text-[11px] text-muted-foreground uppercase tracking-widest font-bold">
            Tuition Learning Portal • Barh
          </span>
        </div>
      </Link>

      <Card className="w-full max-w-md rounded-3xl border border-border/80 shadow-2xl bg-card p-6 sm:p-8">
        <CardHeader className="p-0 pb-6 text-center space-y-1">
          <CardTitle className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            {role === "student" ? "Student Login" : "Admin Sign In"}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {role === "student"
              ? "Access your live classes, YouTube video lectures, notes & 24x7 AI doubt solver"
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

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="identifier" className="text-xs font-bold">
              {role === "admin" ? "Admin Email Address" : "Registered Mobile Number or Email"}
            </Label>
            <Input
              id="identifier"
              required
              placeholder={role === "admin" ? "sanjaykumarpathak640@gmail.com" : "e.g. 6201630760 or student@mail.com"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="rounded-xl text-xs sm:text-sm h-11"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-bold">
                {role === "admin" ? "Master Admin Password" : "Password"}
              </Label>
              <Link href="/forgot-password" className="text-[11px] text-primary font-medium hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              placeholder={role === "admin" ? "Enter Master Password" : "Enter your password"}
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
            {loading ? "Signing in..." : role === "admin" ? "Access Admin Panel" : "Login to Student Portal"}
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

