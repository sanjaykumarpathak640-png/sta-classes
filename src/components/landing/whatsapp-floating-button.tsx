"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteContent } from "@/data/site-content";

export function WhatsAppFloatingButton() {
  const whatsappUrl = `https://wa.me/${siteContent.contact.whatsappNumber}?text=${encodeURIComponent(
    siteContent.contact.whatsappPreFilledText
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      {/* Tooltip on Hover */}
      <span className="hidden sm:inline-block absolute right-16 top-1/2 -translate-y-1/2 bg-foreground text-background text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        WhatsApp Sir: 6201630760
      </span>

      {/* Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-shadow hover:shadow-2xl"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        <MessageCircle className="h-7 w-7 fill-white text-white relative z-10" />
      </motion.a>
    </div>
  );
}

