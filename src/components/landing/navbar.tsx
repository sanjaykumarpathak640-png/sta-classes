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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md shadow-sm border-b border-border/80 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
          {/* Brand Logo */}
          <Link href="#hero" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-violet-500 text-white flex items-center justify-center shadow-md shadow-primary/20 transition-transform group-hover:scale-105 duration-300">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground flex items-center gap-1">
                {brandName}
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </span>
              <span className="text-[10px] tracking-wider uppercase text-muted-foreground font-semibold">
                Academic Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-background/60 dark:bg-muted/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/60 shadow-sm">
            {siteContent.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-xs xl:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-muted rounded-full transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-xl hover:bg-muted font-medium text-xs px-3"
            >
              <Link href="/login">
                Student Login
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-xl border-border hover:bg-muted font-medium text-xs px-3"
            >
              <Link href="/admin">
                <ShieldCheck className="h-3.5 w-3.5 mr-1 text-primary" /> Admin
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs shadow-md shadow-primary/25 gap-1.5 px-4"
            >
              <Link href="#batches">
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
                    <div className="h-9 w-9 rounded-xl bg-primary text-white flex items-center justify-center">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-base">{brandName}</span>
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
                  {siteContent.navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </Link>
                  ))}
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors flex items-center justify-between mt-2"
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" /> Student Portal
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold text-primary hover:bg-primary/10 transition-colors flex items-center justify-between"
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
