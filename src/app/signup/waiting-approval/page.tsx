import Link from "next/link";
import { Clock, ShieldCheck, MessageCircle, ArrowRight, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WaitingApprovalPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background flex flex-col justify-center items-center p-4">
      <Link href="/" className="flex items-center gap-2.5 mb-8">
        <div className="h-11 w-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <span className="font-extrabold text-xl text-foreground">STA Classes</span>
          <span className="block text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            Admission Status
          </span>
        </div>
      </Link>

      <Card className="w-full max-w-md rounded-3xl border border-border/80 shadow-xl bg-card p-6 sm:p-8 text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto">
          <Clock className="h-8 w-8 animate-pulse" />
        </div>

        <CardHeader className="p-0 space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Waiting for Admin Approval
          </CardTitle>
          <CardDescription className="text-xs leading-relaxed max-w-sm mx-auto">
            Your admission registration was received successfully! For student security and batch allocation, all accounts are verified by the STA Classes administration team.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-2 space-y-3">
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 text-left text-xs space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>What happens next?</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Our academic coordinator will verify your batch registration within 2–4 hours and activate full access to live classes, recorded lectures, notes, and tests.
            </p>
          </div>

          <Button asChild className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 text-xs font-semibold shadow-md">
            <a
              href="https://wa.me/919876543210?text=Hello%20STA%20Classes,%20I%20have%20registered%20as%20a%20new%20student%20and%20requesting%20batch%20approval."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" /> Fast-Track Approval via WhatsApp
            </a>
          </Button>

          <Button asChild variant="outline" className="w-full rounded-2xl text-xs h-10">
            <Link href="/login">
              Return to Login Page
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

