"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Menu, X, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteContent } from "@/data/site-content";
import type { SiteSettings } from "@/types/database";

interface NavbarProps {
  settings?: SiteSettings;
}

export function Navbar({ settings }: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const brandName = settings?.tuition_name || siteContent.brand.name;

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Combined Single Fixed Header Container to Prevent ANY Overlap */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* Top Prestigious Announcement Strip */}
        <div className="bg-gradient-to-r from-amber-600 via-violet-700 to-indigo-700 text-white text-[10px] sm:text-xs py-1.5 px-3 text-center font-bold shadow-sm flex items-center justify-center gap-1.5 sm:gap-2 shrink-0">
          <span className="flex h-2 w-2 rounded-full bg-amber-300 animate-ping shrink-0" />
          <span className="truncate">
            🔥 IIT Patna Students Visiting First Time Ever in Any Barh Coaching Institute!
          </span>
          <a href="tel:+916201630760" className="underline shrink-0 text-amber-200 hover:text-white font-extrabold ml-1">
            Call: 6201630760
          </a>
        </div>

        {/* Main Navbar (Always directly underneath announcement without hardcoded top offsets) */}
        <header
          className={`w-full transition-all duration-300 ${
            scrolled
              ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border/80 py-2 sm:py-2.5"
              : "bg-background/90 dark:bg-background/95 backdrop-blur-md border-b border-border/40 py-2.5 sm:py-3.5"
          }`}
        >
          <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
            {/* Brand Logo */}
            <Link href="#hero" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105 duration-300 shrink-0">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl sm:text-2xl md:text-3xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent flex items-center gap-1 sm:gap-1.5 drop-shadow-sm">
                  STA CLASSES
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 fill-amber-400" />
                </span>
                <span className="text-[9px] sm:text-[11px] tracking-wider uppercase text-muted-foreground font-bold">
                  Tuition Center • Barh (Class 4-12)
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-background/60 dark:bg-muted/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/60 shadow-sm">
              {siteContent.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 text-xs xl:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-muted rounded-full transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <ThemeToggle />
              <Button
                asChild
                size="sm"
                className="rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm px-4 py-2 shadow-md shadow-blue-500/25 border border-sky-400/30 gap-1.5 transition-all hover:scale-105"
              >
                <Link href="/login" className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-sky-100" />
                  <span>Student Login</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-xl border-border hover:bg-muted font-bold text-xs px-3"
              >
                <Link href="/admin">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1 text-primary" /> Admin
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md shadow-primary/25 gap-1.5 px-4"
              >
                <Link href="#join-offline">
                  Join Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu & Theme Toggle */}
            <div className="flex sm:hidden items-center gap-1.5">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl h-9 w-9 text-foreground hover:bg-muted"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm sm:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-sm bg-background border-l border-border p-6 shadow-2xl flex flex-col justify-between sm:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-black text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">STA CLASSES</span>
                      <span className="text-[10px] text-muted-foreground font-bold uppercase">Barh, Bihar</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col gap-1.5 pt-6">
                  {/* Prominent Student Login Button in Mobile Drawer */}
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md shadow-blue-500/25 flex items-center justify-between mb-2"
                  >
                    <span className="flex items-center gap-2.5">
                      <GraduationCap className="h-5 w-5 text-sky-100" />
                      <span>Student Login Portal</span>
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {siteContent.navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </Link>
                  ))}

                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold text-primary hover:bg-primary/10 transition-colors flex items-center justify-between mt-2"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" /> Admin Portal
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="pt-6 border-t space-y-3">
                <Button
                  asChild
                  className="w-full rounded-xl bg-primary shadow-md shadow-primary/25"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="#contact">Join Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="#batches">Explore Batches</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
