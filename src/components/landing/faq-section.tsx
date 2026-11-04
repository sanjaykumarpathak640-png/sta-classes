"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteContent, type FaqItem } from "@/data/site-content";

export function FaqSection() {
  return (
    <section id="faqs" className="py-20 md:py-28 relative bg-muted/20 dark:bg-muted/10 border-t border-border/60">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <Badge variant="outline" className="px-3.5 py-1 rounded-full text-xs font-semibold text-primary border-primary/25 bg-primary/5">
            Clarifications & Guidance
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Everything you need to know about admissions, classes, notes, and fee policies.
          </p>
        </div>

        {/* Accordion Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {siteContent.faqs.map((faq: FaqItem) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-border/70 py-1">
                <AccordionTrigger className="text-sm sm:text-base font-semibold hover:no-underline text-foreground">
                  <span className="flex items-center gap-2.5 text-left">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground pl-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

