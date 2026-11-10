"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  CalendarDays, 
  Sparkles,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { siteContent, type BatchItem } from "@/data/site-content";

export function BatchesSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [batchesList, setBatchesList] = React.useState<BatchItem[]>(siteContent.batches);

  // Sync with admin changes from localStorage if available
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("sta_batches_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBatchesList(parsed);
        }
      }
    } catch {
      // fallback to siteContent.batches
    }
  }, []);

  const filteredBatches = React.useMemo(() => {
    if (activeCategory === "all") return batchesList;
    return batchesList.filter((b) => b.category === activeCategory);
  }, [activeCategory, batchesList]);

  return (
    <section id="batches" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <Badge variant="outline" className="px-3.5 py-1 rounded-full text-xs font-semibold text-primary border-primary/25 bg-primary/5">
            Class 4th to 12th Programs
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Explore Our Comprehensive Batches
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Curated curriculum for Class 4th to 12th aligned with CBSE, ICSE, and State Boards with small batch size for personal attention.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {siteContent.batchCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Batches Grid with Hover Lift & Scroll Reveal */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          <AnimatePresence>
            {filteredBatches.map((batch: BatchItem) => (
              <motion.div
                key={batch.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className={`relative h-full flex flex-col justify-between rounded-3xl border transition-all duration-300 ${
                  batch.isPopular 
                    ? "border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/40 bg-gradient-to-b from-card to-primary/[0.02]"
                    : "border-border shadow-md hover:shadow-xl hover:border-primary/40"
                }`}>
                  {/* Popular / Feature Badge */}
                  {batch.badge && (
                    <div className="absolute -top-3 right-6 z-10">
                      <span className="bg-primary text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        {batch.badge}
                      </span>
                    </div>
                  )}

                  <CardHeader className="space-y-3 pb-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="rounded-lg text-xs font-semibold px-2.5 py-0.5">
                        {batch.classLevel}
                      </Badge>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-primary" /> {batch.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5 text-primary" /> {batch.startDate}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      {batch.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {batch.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Feature bullet points */}
                    <div className="space-y-2 border-t pt-4">
                      {batch.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/90">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing */}
                    {batch.price && batch.price > 0 ? (
                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
                          ₹{batch.price.toLocaleString("en-IN")}
                        </span>
                        {batch.originalPrice && batch.originalPrice > batch.price ? (
                          <>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{batch.originalPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full ml-auto">
                              Save ₹{(batch.originalPrice - batch.price).toLocaleString("en-IN")}
                            </span>
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground">/ course fee</span>
                        )}
                      </div>
                    ) : (
                      <div className="pt-2 p-3 rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-foreground">Fee: Set by Institute</div>
                          <div className="text-[11px] text-muted-foreground">Affordable monthly & installment plans</div>
                        </div>
                        <Badge variant="outline" className="text-[10px] font-semibold text-primary border-primary/30 bg-primary/5">
                          Inquire Fee
                        </Badge>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="pt-2 pb-6 flex gap-3">
                    <Button
                      asChild
                      className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/20 gap-2 h-11"
                    >
                      <Link href="#contact">
                        <Zap className="h-4 w-4" /> {batch.price && batch.price > 0 ? `Enroll Now (₹${batch.price})` : "Enroll / Inquire Fee"}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-2xl border-border hover:bg-muted font-medium h-11 px-4"
                    >
                      <Link href="#contact">Contact</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Looking for specialized 1-on-1 personal tutoring or customized test series?{" "}
            <Link href="#contact" className="text-primary font-semibold hover:underline">
              Contact our Counselor →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

