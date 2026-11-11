"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Users, 
  BookOpen, 
  GraduationCap,
  CalendarCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function OfflineBatchSection() {
  const phone = "6201630760";
  const whatsappNumber = "916201630760";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Namaste Sir, I want to inquire and join STA Classes Offline Batch in Barh.")}`;

  const benefits = [
    {
      icon: Users,
      title: "Personalized Small Batches",
      description: "Har bachhe par vyaktigat dhyan. Limited students per batch taaki har student bina jhijhak ke question pooch sake.",
    },
    {
      icon: Sparkles,
      title: "IIT Patna Scholars Mentorship",
      description: "First time ever in Barh! IIT Patna ke students dwara regular guest interactive guidance and advanced problem-solving sessions.",
    },
    {
      icon: BookOpen,
      title: "Handwritten Notes & Weekly Tests",
      description: "Har chapter ke complete handwritten notes, PYQ practice sheets, aur Sunday mock tests with performance analysis.",
    },
    {
      icon: GraduationCap,
      title: "Free Mobile App & 24x7 AI Doubts",
      description: "Har offline student ko mobile portal ka free access milta hai jisme recorded lectures aur 24x7 AI doubt solver shamil hai.",
    },
  ];

  return (
    <section id="join-offline" className="py-16 md:py-24 relative bg-gradient-to-b from-background via-primary/[0.03] to-background border-t border-border/60 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <Badge className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-200 gap-1.5 shadow-sm inline-flex">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>Admissions Open • Class 4th to 12th</span>
          </Badge>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            Join Offline Tuition Batches at{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              STA CLASSES
            </span>
          </h2>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
            Barh ke sabhi students (Class 4 se 12) ke liye daily offline classroom batches. Offline classroom teaching ke saath complete digital notes aur personal guidance.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {benefits.map((b, idx) => (
            <Card key={idx} className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-sm p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary/15 to-violet-500/15 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-foreground mb-2">{b.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
            </Card>
          ))}
        </div>

        {/* Highlight Card: Center Location & Instant Actions */}
        <div className="rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/[0.04] p-6 sm:p-10 shadow-xl max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Left: Location & Details */}
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <MapPin className="h-3.5 w-3.5" /> Barh Offline Center
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                Near Biryani Mahal, Block Ke Paas
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Barh, Bihar - 803213. Center par aakar aap directly sir se mil sakte hain, demo class le sakte hain aur batch timing select kar sakte hain.
              </p>

              <div className="space-y-2 text-xs text-muted-foreground pt-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Morning & Evening Batches Available</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>CBSE, ICSE & Bihar Board Curriculum</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>IIT Patna Scholars Interactive Guest Sessions</span>
                </div>
              </div>
            </div>

            {/* Right: Instant Call & WhatsApp Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-background/80 border border-border/80 shadow-md space-y-4 text-center">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground block">
                  Direct Admission Helpline
                </span>
                <a
                  href={`tel:${phone}`}
                  className="font-mono text-xl sm:text-2xl font-black text-primary hover:underline block mt-1"
                >
                  +91 62016 30760
                </a>
                <span className="text-[10px] text-muted-foreground">Available 8:00 AM – 8:00 PM Daily</span>
              </div>

              {/* Action Buttons Stacking Cleanly on Mobile */}
              <div className="flex flex-col gap-2.5 pt-1">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm h-12 shadow-lg shadow-indigo-500/25 gap-2"
                >
                  <a href={`tel:${phone}`}>
                    <Phone className="h-4 w-4" />
                    <span>Call Sir: 6201630760</span>
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm h-12 shadow-md shadow-emerald-500/20 gap-2"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full rounded-2xl text-xs font-semibold h-10 border-border"
                >
                  <Link href="#contact">
                    <CalendarCheck className="h-3.5 w-3.5 mr-1.5 text-primary" />
                    Book Free Demo Class
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* 3 Steps Process Bar */}
          <div className="pt-6 border-t border-border/60">
            <h4 className="text-xs sm:text-sm font-bold text-foreground text-center mb-4">
              3 Simple Steps to Join Offline Batch:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-muted/40 border border-border/50 text-xs space-y-1">
                <span className="inline-block h-6 w-6 rounded-full bg-primary text-white font-bold text-[11px] leading-6">1</span>
                <p className="font-bold text-foreground">Call / WhatsApp</p>
                <p className="text-[10px] text-muted-foreground">Apni class (4-12) batayein aur seat check karein.</p>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 border border-border/50 text-xs space-y-1">
                <span className="inline-block h-6 w-6 rounded-full bg-primary text-white font-bold text-[11px] leading-6">2</span>
                <p className="font-bold text-foreground">Visit Tuition Center</p>
                <p className="text-[10px] text-muted-foreground">Near Biryani Mahal, Block ke paas demo class lein.</p>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 border border-border/50 text-xs space-y-1">
                <span className="inline-block h-6 w-6 rounded-full bg-primary text-white font-bold text-[11px] leading-6">3</span>
                <p className="font-bold text-foreground">Start Learning</p>
                <p className="text-[10px] text-muted-foreground">Batch timing select karein aur padhai shuru karein.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
