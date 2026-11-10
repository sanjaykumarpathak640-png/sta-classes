"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { siteContent } from "@/data/site-content";

export function ContactSection() {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Inquiry Received Successfully!",
        description: "Sir will contact you directly on your phone/WhatsApp.",
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <Badge variant="outline" className="px-3.5 py-1 rounded-full text-xs font-semibold text-primary border-primary/25 bg-primary/5">
            Tuition Visit & Inquiry
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Tuition Visit & Direct Admissions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Online & Offline both batches available for Class 4th to 12th. Call or WhatsApp Sir directly for batch timings, fee details, and registration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Column: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="rounded-3xl border border-border/80 p-6 shadow-sm bg-card space-y-5">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> STA Tuition Center (Barh)
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Tuition Center Location</div>
                    <div className="text-muted-foreground leading-relaxed mt-0.5">{siteContent.contact.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Direct Call / WhatsApp</div>
                    <a href={`tel:${siteContent.contact.phone}`} className="text-primary font-mono font-bold hover:underline block">
                      {siteContent.contact.phone}
                    </a>
                    <span className="text-[11px] text-muted-foreground">Call Sir directly for admission</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Official Email</div>
                    <a href={`mailto:${siteContent.contact.email}`} className="text-muted-foreground hover:text-foreground break-all">
                      {siteContent.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Tuition Center Timings</div>
                    <div className="text-muted-foreground leading-relaxed">{siteContent.contact.workingHours}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Direct WhatsApp Action Card */}
            <a
              href={`https://wa.me/${siteContent.contact.whatsappNumber}?text=${encodeURIComponent(
                siteContent.contact.whatsappPreFilledText
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">Chat on WhatsApp with Sir</div>
                    <div className="text-xs text-muted-foreground font-mono font-bold text-emerald-600">+91 62016 30760</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  Chat Now →
                </span>
              </div>
            </a>
          </div>

          {/* Right Column: Callback Request Form */}
          <div className="lg:col-span-7">
            <Card className="rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm bg-card">
              <h3 className="text-xl font-bold text-foreground mb-1">Direct Admission & Batch Inquiry</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                Fill this quick form and Sir will provide complete online & offline batch timetables and curriculum syllabi.
              </p>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-3">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">Thank you for reaching out!</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-sm">
                    We have noted your details. Our team will get in touch with you shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl mt-3"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="studentName" className="text-xs font-medium">Student / Parent Name *</Label>
                      <Input
                        id="studentName"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-xs font-medium">Phone / WhatsApp Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="e.g. 62016 30760"
                        className="rounded-xl font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="targetClass" className="text-xs font-medium">Target Class / Grade *</Label>
                      <Input
                        id="targetClass"
                        required
                        placeholder="e.g. Class 10th or Class 8th"
                        className="rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="batchMode" className="text-xs font-medium">Preferred Mode *</Label>
                      <select
                        id="batchMode"
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="both">Online & Offline Both</option>
                        <option value="offline">Offline Tuition (Barh Center)</option>
                        <option value="online">Online Live Classes (Web/App)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium">Email Address (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@gmail.com"
                      className="rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-medium">Your Message or Specific Query</Label>
                    <Textarea
                      id="message"
                      rows={3}
                      placeholder="Aap kis subject ya exam ke liye tuition join karna chahte hain..."
                      className="rounded-xl resize-none text-xs"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/25 h-11 text-sm gap-2"
                  >
                    {loading ? "Sending..." : "Submit Inquiry to Sir"} <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>

        {/* Google Maps Responsive Embed */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-border/80 shadow-md h-[340px] md:h-[420px] w-full bg-muted">
            <iframe
              src={siteContent.contact.googleMapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="STA Classes Tuition Center Barh Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

