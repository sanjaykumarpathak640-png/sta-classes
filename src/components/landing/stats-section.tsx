"use client";

import { motion } from "framer-motion";
import { Users, Layers, TrendingUp, Calendar } from "lucide-react";
import { AnimatedCounter } from "@/components/landing/animated-counter";
import { siteContent } from "@/data/site-content";

export function StatsSection() {
  const icons = [Users, Layers, TrendingUp, Calendar];

  return (
    <section className="py-12 md:py-16 relative border-y border-border/60 bg-muted/20 dark:bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {siteContent.stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-2xl bg-card border border-border/70 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
              >
                {/* Background decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-3xl -z-10 group-hover:scale-110 transition-transform" />

                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight flex items-baseline">
                  <AnimatedCounter
                    to={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>

                <div className="font-semibold text-xs sm:text-sm text-foreground mt-1">
                  {stat.label}
                </div>

                <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-snug">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

