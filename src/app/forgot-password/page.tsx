"use client";

import * as React from "react";
import Link from "next/link";
import { KeyRound, ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [identifier, setIdentifier] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Reset Instructions Sent!",
        description: "Please check your WhatsApp or email for password recovery steps.",
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background flex flex-col justify-center items-center p-4">
      <Link href="/" className="flex items-center gap-2.5 mb-8">
        <div className="h-11 w-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <span className="font-extrabold text-xl text-foreground">STA Classes</span>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            Password Recovery
          </span>
        </div>
      </Link>

      <Card className="w-full max-w-md rounded-3xl border border-border/80 shadow-xl bg-card p-6 sm:p-8">
        <CardHeader className="p-0 pb-6 text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Reset Password
          </CardTitle>
          <CardDescription className="text-xs">
            Enter your registered WhatsApp phone or email address
          </CardDescription>
        </CardHeader>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-base text-foreground">Recovery Link Dispatched</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We sent a password reset token to <strong>{identifier}</strong>. Click the link to choose a new password.
            </p>
            <Button asChild className="rounded-2xl w-full text-xs font-semibold h-10 mt-2">
              <Link href="/login">Return to Sign In</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="id" className="text-xs font-semibold">Phone or Email Address</Label>
              <Input
                id="id"
                required
                placeholder="e.g. 98765 43210 or name@mail.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="rounded-xl text-xs"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/20 h-11 text-xs gap-2"
            >
              {loading ? "Sending..." : "Send Reset Link"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}

        <CardFooter className="p-0 pt-6 mt-6 border-t flex justify-center text-xs text-muted-foreground">
          <Link href="/login" className="hover:text-foreground">
            ← Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
