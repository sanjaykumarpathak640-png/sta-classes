"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    classGrade: "Class 10th",
    batchName: "Class 10 Board Excellence",
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Registration Submitted!",
        description: "Your admission application has been forwarded to STA Classes admin for approval.",
      });
      router.push("/signup/waiting-approval");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background flex flex-col justify-center items-center p-4 py-12">
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="h-11 w-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <span className="font-extrabold text-xl text-foreground">STA Classes</span>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            Student Registration
          </span>
        </div>
      </Link>

      <Card className="w-full max-w-lg rounded-3xl border border-border/80 shadow-xl bg-card p-6 sm:p-8">
        <CardHeader className="p-0 pb-6 text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Create Student Profile
          </CardTitle>
          <CardDescription className="text-xs">
            Join thousands of toppers enrolled in STA Classes programs
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="fullName" className="text-xs font-semibold">Full Student Name *</Label>
            <Input
              id="fullName"
              required
              placeholder="e.g. Aarav Sharma"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-semibold">WhatsApp Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-xl text-xs font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">Email Address (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="aarav@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="classGrade" className="text-xs font-semibold">Current Class / Grade *</Label>
              <select
                id="classGrade"
                required
                value={form.classGrade}
                onChange={(e) => setForm({ ...form, classGrade: e.target.value })}
                className="flex h-9 w-full rounded-xl border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="Class 4th">Class 4th</option>
                <option value="Class 5th">Class 5th</option>
                <option value="Class 6th">Class 6th</option>
                <option value="Class 7th">Class 7th</option>
                <option value="Class 8th">Class 8th</option>
                <option value="Class 9th">Class 9th</option>
                <option value="Class 10th">Class 10th</option>
                <option value="Class 11th Science">Class 11th Science</option>
                <option value="Class 11th Commerce">Class 11th Commerce</option>
                <option value="Class 11th Arts">Class 11th Arts</option>
                <option value="Class 12th Science">Class 12th Science</option>
                <option value="Class 12th Commerce">Class 12th Commerce</option>
                <option value="Class 12th Arts">Class 12th Arts</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="batch" className="text-xs font-semibold">Target Batch / Subject *</Label>
              <Input
                id="batch"
                required
                placeholder="e.g. Science & Maths / All Subjects"
                value={form.batchName}
                onChange={(e) => setForm({ ...form, batchName: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-semibold">Create Password *</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="rounded-xl text-xs font-mono"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/20 h-11 text-xs gap-2 mt-2"
          >
            {loading ? "Creating Profile..." : "Register & Submit for Approval"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <CardFooter className="p-0 pt-6 mt-6 border-t flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
          <p>
            Already enrolled?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log in here →
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

