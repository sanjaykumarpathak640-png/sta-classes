"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  BookOpen, 
  Users, 
  Award,
  Video,
  Star,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteContent } from "@/data/site-content";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient Mesh & Floating Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[550px] bg-gradient-to-tr from-primary/20 via-violet-400/15 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-[30%] left-[-5%] w-[350px] h-[350px] bg-sky-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-primary/15 blur-3xl rounded-full" />
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#5B3DF5_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.07]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* IIT Patna Historic Announcement Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-extrabold shadow-sm animate-pulse">
                <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                <span>🔥 IIT Patna Students Visiting First Time Ever in Any Barh Coaching Institute!</span>
              </div>
            </motion.div>

            {/* Online & Offline Badge */}
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 border-primary/30 text-primary flex items-center gap-1.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span>Online & Offline Both Batches Available • Class 4th to 12th</span>
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.12] text-foreground"
            >
              {siteContent.hero.headline}{" "}
              <span className="bg-gradient-to-r from-primary via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                {siteContent.hero.highlightWord}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal"
            >
              {siteContent.hero.subheadline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 w-full sm:w-auto"
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2 text-sm"
              >
                <Link href={siteContent.hero.primaryCta.href}>
                  {siteContent.hero.primaryCta.text}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-2xl border-border bg-background/60 hover:bg-muted font-semibold px-7 h-12 text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <a href={`tel:${siteContent.contact.phone}`}>
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  Call Sir: 6201630760
                </a>
              </Button>
            </motion.div>

            {/* Micro Trust Stats */}
            <motion.div
              variants={itemVariants}
              className="pt-4 border-t border-border/60 w-full flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-6 w-6 rounded-full border-2 border-background bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[9px] font-bold text-primary overflow-hidden"
                    >
                      ★
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center text-amber-500">
                    <Star className="h-3 w-3 fill-amber-500" />
                    <span className="font-bold text-foreground text-xs ml-1">4.9 / 5</span>
                  </div>
                  <span className="text-[10px]">Google Reviews</span>
                </div>
              </div>

              <div className="h-4 w-[1px] bg-border hidden sm:block" />

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-medium text-foreground">98.4% Board Success</span>
              </div>

              <div className="h-4 w-[1px] bg-border hidden sm:block" />

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">5,000+ Enrolled Achievers</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual Card Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md"
            >
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-violet-500 rounded-3xl blur-xl opacity-30 animate-pulse" />

              {/* Main Card */}
              <div className="relative rounded-3xl bg-card border border-border/80 shadow-2xl p-5 sm:p-6 backdrop-blur-sm space-y-5">
                {/* Header inside card */}
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <Video className="h-3.5 w-3.5" /> Live Session In Progress
                    </span>
                  </div>
                  <span className="text-[11px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-full">
                    Class 10 Physics
                  </span>
                </div>

                {/* Simulated Video Player Box */}
                <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden flex flex-col justify-between p-4 text-white shadow-inner group">
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-mono">
                      Topic: Light Reflection & Refraction
                    </span>
                    <span className="bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" /> LIVE
                    </span>
                  </div>

                  {/* Play Button Icon */}
                  <div className="self-center flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="h-5 w-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span>Er. S. T. Agrawal</span>
                    <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      120+ Students Live
                    </span>
                  </div>
                </div>

                {/* Mini Features List */}
                <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-muted/60 flex items-center gap-2 border border-border/40">
                    <Award className="h-4 w-4 text-amber-500" />
                    <div>
                      <div className="font-semibold text-foreground text-[11px]">Rank Analysis</div>
                      <div className="text-[10px] text-muted-foreground">Weekly Score Cards</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/60 flex items-center gap-2 border border-border/40">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <div>
                      <div className="font-semibold text-foreground text-[11px]">Doubt Resolution</div>
                      <div className="text-[10px] text-muted-foreground">Within 30 Mins</div>
                    </div>
                  </div>
                </div>

                {/* Callout Footer */}
                <div className="pt-2 text-center">
                  <p className="text-xs text-muted-foreground font-medium">
                    Batch Orientation starts this week.{" "}
                    <Link href="#batches" className="text-primary font-semibold hover:underline">
                      Reserve Seat →
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

