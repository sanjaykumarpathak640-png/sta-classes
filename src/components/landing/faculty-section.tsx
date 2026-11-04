"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, BookOpen, GraduationCap, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteContent, type FacultyMember } from "@/data/site-content";

export function FacultySection() {
  return (
    <section id="faculty" className="py-20 md:py-28 relative bg-muted/20 dark:bg-muted/10 border-t border-border/60">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <Badge variant="outline" className="px-3.5 py-1 rounded-full text-xs font-semibold text-primary border-primary/25 bg-primary/5">
            Mentors & Educators
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Learn from India&apos;s Finest Subject Experts
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Seasoned faculty with over a decade of classroom excellence, authoring top board ranks and competitive selections.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {siteContent.faculty.map((member: FacultyMember, idx: number) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <Card className="h-full rounded-3xl border border-border/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-card flex flex-col justify-between">
                {/* Image Box */}
                <div className="relative aspect-[4/4.5] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Overlay text on image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-semibold bg-primary/90 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {member.subject}
                    </span>
                    <h3 className="font-bold text-base tracking-tight leading-snug">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <GraduationCap className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">{member.qualification}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Award className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span>{member.experience}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed italic border-t pt-2.5">
                    &ldquo;{member.bio}&rdquo;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

