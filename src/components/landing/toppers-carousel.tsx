"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy, Star, Sparkles, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteContent, type TopperItem } from "@/data/site-content";

export function ToppersCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const toppers = siteContent.toppers;

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % toppers.length);
  }, [toppers.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + toppers.length) % toppers.length);
  };

  // Auto slide every 6 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const current = toppers[currentIndex];

  return (
    <section id="results" className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <Badge variant="outline" className="px-3.5 py-1 rounded-full text-xs font-semibold text-primary border-primary/25 bg-primary/5">
            Hall of Fame
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Our Top Rankers & Achievers
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Every year, STA Classes students conquer top ranks in Board examinations and premier entrance tests.
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="rounded-3xl border border-border/80 shadow-xl overflow-hidden bg-gradient-to-br from-card via-card to-primary/[0.04]">
                <CardContent className="p-6 sm:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Left: Avatar with Score Badges */}
                    <div className="md:col-span-5 flex flex-col items-center text-center">
                      <div className="relative">
                        <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-3xl overflow-hidden border-4 border-primary/20 shadow-xl">
                          <Image
                            src={current.avatar}
                            alt={current.name}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        </div>

                        {/* Floating Score Badge */}
                        <div className="absolute -bottom-3 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-sm sm:text-base px-3.5 py-1 rounded-2xl shadow-lg flex items-center gap-1.5">
                          <Trophy className="h-4 w-4" />
                          <span>{current.score}</span>
                        </div>
                      </div>

                      <div className="mt-5 space-y-1">
                        <h3 className="font-extrabold text-xl text-foreground">{current.name}</h3>
                        <p className="text-xs text-primary font-semibold tracking-wide uppercase">
                          {current.exam}
                        </p>
                        {current.rank && (
                          <span className="inline-block bg-primary/10 text-primary text-[11px] font-bold px-2.5 py-0.5 rounded-full mt-1">
                            {current.rank}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Testimonial & Quote */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="h-4 w-4 fill-amber-500" />
                        ))}
                      </div>

                      <div className="relative">
                        <Quote className="h-10 w-10 text-primary/15 absolute -top-4 -left-4 -z-10" />
                        <p className="text-base sm:text-lg text-foreground font-medium leading-relaxed italic">
                          &ldquo;{current.testimonialSnippet}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border/70 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Verified Student Result</span>
                        <span className="font-mono text-primary font-semibold">STA Alumni Network</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {toppers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="h-10 w-10 rounded-2xl border-border hover:bg-muted"
                aria-label="Previous topper"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="h-10 w-10 rounded-2xl border-border hover:bg-muted"
                aria-label="Next topper"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

