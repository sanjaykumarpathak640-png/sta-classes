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
        description: "Our STA academic counselor will contact you within 2 working hours.",
      });
    }, 900);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <Badge variant="outline" className="px-3.5 py-1 rounded-full text-xs font-semibold text-primary border-primary/25 bg-primary/5">
            Connect with Us
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Visit Campus or Request Callback
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Have questions about admissions, batch timings, or fee structure? Our academic counselors are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Column: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="rounded-3xl border border-border/80 p-6 shadow-sm bg-card space-y-5">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Campus Office
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{siteContent.contact.campusName}</div>
                    <div className="text-muted-foreground leading-relaxed mt-0.5">{siteContent.contact.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Phone Support</div>
                    <div className="text-muted-foreground font-mono">{siteContent.contact.phone}</div>
                    <div className="text-muted-foreground font-mono">{siteContent.contact.alternatePhone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Official Email</div>
                    <div className="text-muted-foreground">{siteContent.contact.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Counseling Hours</div>
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
                    <div className="font-bold text-sm text-foreground">Chat Instantly on WhatsApp</div>
                    <div className="text-xs text-muted-foreground">Direct line to Academic Dean</div>
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
              <h3 className="text-xl font-bold text-foreground mb-1">Request Admission Counseling</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                Fill this quick form and our academic team will provide complete batch timetables and curriculum syllabi.
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
                        placeholder="e.g. 98765 43210"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="targetClass" className="text-xs font-medium">Target Class / Grade *</Label>
                      <Input
                        id="targetClass"
                        required
                        placeholder="e.g. Class 10th or JEE"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-medium">Email Address (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="rajesh@example.com"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-medium">Your Message or Specific Query</Label>
                    <Textarea
                      id="message"
                      rows={3}
                      placeholder="Tell us about your learning goals or questions..."
                      className="rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/25 h-11 text-sm gap-2"
                  >
                    {loading ? "Sending..." : "Submit Inquiry"} <Send className="h-4 w-4" />
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
              title="STA Classes Campus Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

