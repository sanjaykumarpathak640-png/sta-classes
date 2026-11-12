"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  GraduationCap, 
  Sparkles,
  KeyRound
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      setErrorMsg("Security Notice: Admin session expired ya unauthorized access. Kripya Master Password daalein.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Galat Password! Sirf authorized admin hi access kar sakte hain.");
        toast({
          title: "Access Denied",
          description: "Aapka dala hua password galat hai.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Access Granted!",
        description: "Welcome Sir, opening STA Classes Control Deck...",
      });

      const returnUrl = searchParams.get("from") || "/admin";
      router.push(returnUrl);
      router.refresh();
    } catch {
      setErrorMsg("Network error. Kripya dubara koshish karein.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-col justify-center items-center p-4">
      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-3 mb-8 group">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-105">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <span className="font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent block">
            STA CLASSES
          </span>
          <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Institute Administration
          </span>
        </div>
      </Link>

      <Card className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-2xl p-6 sm:p-8 text-slate-100">
        <CardHeader className="p-0 pb-6 text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-1">
            <Lock className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-black tracking-tight text-white">
            Admin Master Sign In
          </CardTitle>
          <CardDescription className="text-xs text-slate-400">
            Sirf authorized administration ke liye. Yahan se website, batches, tests aur videos manage kiye jaate hain.
          </CardDescription>
        </CardHeader>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="adminPassword" className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Master Admin Password</span>
              <span className="text-[10px] text-indigo-400 font-normal">Confidential</span>
            </Label>
            <div className="relative">
              <Input
                id="adminPassword"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter Master Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl text-xs sm:text-sm h-11 bg-slate-800/80 border-slate-700 text-white placeholder:text-slate-500 pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-11 text-xs sm:text-sm shadow-lg shadow-indigo-600/30 gap-2 transition-all hover:scale-[1.01]"
          >
            {loading ? (
              "Verifying Password..."
            ) : (
              <>
                <KeyRound className="h-4 w-4" />
                <span>Unlock Admin Control Panel</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </form>

        <CardFooter className="p-0 pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            ← Back to Homepage
          </Link>
          <Link href="/login" className="text-indigo-400 hover:underline">
            Student Login →
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-white">Loading...</div>}>
      <AdminLoginForm />
    </React.Suspense>
  );
}
