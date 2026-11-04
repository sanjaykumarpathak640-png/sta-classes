"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteContent, type TestimonialItem } from "@/data/site-content";

export function TestimonialsSlider() {
  const testimonials = siteContent.testimonials;
  const [activeIdx, setActiveIdx] = React.useState(0);

  const prev = () => {
    setActiveIdx((curr) => (curr - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setActiveIdx((curr) => (curr + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 relative bg-muted/20 dark:bg-muted/10 border-t border-border/60">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <Badge variant="outline" className="px-3.5 py-1 rounded-full text-xs font-semibold text-primary border-primary/25 bg-primary/5">
            Real Experiences
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            What Parents & Students Say
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Honest feedback from families who entrusted their academic journey to STA Classes.
          </p>
        </div>

        {/* 3-Card Grid for Desktop, Slider Controls for Mobile/Tablet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((item: TestimonialItem, idx: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
            >
              <Card className="h-full rounded-3xl border border-border/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all bg-card">
                <CardContent className="p-0 space-y-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </CardContent>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-6 border-t border-border/60 mt-4">
                  <div className="relative h-11 w-11 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground leading-tight">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                    <span className="text-[10px] text-primary font-semibold block">{item.batch}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

