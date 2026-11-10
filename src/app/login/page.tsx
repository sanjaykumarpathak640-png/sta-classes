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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (role === "admin") {
        // Set admin master auth cookie & storage
        document.cookie = "sta_admin_auth=true; path=/; max-age=2592000; SameSite=Lax";
        try {
          localStorage.setItem("sta_admin_authenticated", "true");
        } catch {}

        toast({ 
          title: "Welcome, Master Admin!", 
          description: "Accessing STA Classes Control Deck with full privileges." 
        });
        router.push("/admin");
      } else {
        toast({ title: "Welcome back!", description: "Loading student learning portal..." });
        router.push("/student");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background flex flex-col justify-center items-center p-4">
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="h-11 w-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <span className="font-extrabold text-xl text-foreground">STA Classes</span>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            Learning Portal
          </span>
        </div>
      </Link>

      <Card className="w-full max-w-md rounded-3xl border border-border/80 shadow-xl bg-card p-6 sm:p-8">
        <CardHeader className="p-0 pb-6 text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Sign In to Your Account
          </CardTitle>
          <CardDescription className="text-xs">
            Access your live classes, video lectures, and practice tests
          </CardDescription>

          <div className="pt-3 flex justify-center">
            <Tabs value={role} onValueChange={(v) => setRole(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-xl h-10 p-1">
                <TabsTrigger value="student" className="rounded-lg text-xs font-semibold">
                  Student
                </TabsTrigger>
                <TabsTrigger value="admin" className="rounded-lg text-xs font-semibold">
                  Faculty / Admin
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="identifier" className="text-xs font-semibold">
              {role === "admin" ? "Admin Email Address" : "Registered Phone or Email"}
            </Label>
            <Input
              id="identifier"
              required
              placeholder={role === "admin" ? "admin@staclasses.com" : "98765 43210 or student@mail.com"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="rounded-xl text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-semibold">
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
              placeholder={role === "admin" ? "Enter admin password (e.g. admin123)" : "••••••••"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl text-xs font-mono"
            />
            {role === "admin" && (
              <p className="text-[11px] text-primary bg-primary/5 p-2 rounded-lg border border-primary/20">
                🔑 Master Admin Password: <code className="font-bold">admin123</code> (Settings me change kar sakte hain)
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/20 h-11 text-xs gap-2 mt-2"
          >
            {loading ? "Signing in..." : role === "admin" ? "Access Admin Panel" : "Login to Student App"}
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

