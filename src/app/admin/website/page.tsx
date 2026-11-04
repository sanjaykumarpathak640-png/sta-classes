"use client";

import * as React from "react";
import { 
  Globe, 
  Sparkles, 
  Save, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Check, 
  HelpCircle,
  GraduationCap,
  Trophy,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Palette
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { siteContent } from "@/data/site-content";
import { 
  updateSiteSettingsAction, 
  updateSectionSettingsAction, 
  upsertHeroSlideAction, 
  upsertStatAction, 
  deleteStatAction,
  upsertFacultyAction,
  deleteFacultyAction,
  upsertTopperAction,
  deleteTopperAction,
  upsertTestimonialAction,
  deleteTestimonialAction,
  upsertFaqAction,
  deleteFaqAction,
  upsertGalleryImageAction,
  deleteGalleryImageAction
} from "@/app/admin/actions";

export default function WebsiteEditorPage() {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  // 1. General & Branding Form State
  const [generalForm, setGeneralForm] = React.useState({
    tuition_name: siteContent.brand.name,
    tagline: siteContent.brand.tagline,
    short_description: siteContent.brand.shortDescription,
    logo_url: "",
    primary_color: "#5B3DF5",
    phone: siteContent.contact.phone,
    alternate_phone: siteContent.contact.alternatePhone,
    whatsapp_number: siteContent.contact.whatsappNumber,
    whatsapp_prefilled_text: siteContent.contact.whatsappPreFilledText,
    email: siteContent.contact.email,
    address: siteContent.contact.address,
    working_hours: siteContent.contact.workingHours,
    google_map_embed_url: siteContent.contact.googleMapEmbedUrl,
  });

  // 2. Hero Form State
  const [heroForm, setHeroForm] = React.useState({
    badge: siteContent.hero.badge,
    headline: siteContent.hero.headline,
    highlight_word: siteContent.hero.highlightWord,
    subheadline: siteContent.hero.subheadline,
    primary_cta_text: siteContent.hero.primaryCta.text,
    primary_cta_href: siteContent.hero.primaryCta.href,
    secondary_cta_text: siteContent.hero.secondaryCta.text,
    secondary_cta_href: siteContent.hero.secondaryCta.href,
  });

  // 3. Section Visibility
  const [sections, setSections] = React.useState([
    { key: "hero", label: "Hero Banner", visible: true },
    { key: "stats", label: "Stats Counter", visible: true },
    { key: "batches", label: "Batches Grid", visible: true },
    { key: "faculty", label: "Faculty / Teachers", visible: true },
    { key: "results", label: "Toppers & Results", visible: true },
    { key: "testimonials", label: "Testimonials", visible: true },
    { key: "gallery", label: "Campus Gallery", visible: true },
    { key: "faqs", label: "FAQs Accordion", visible: true },
    { key: "contact", label: "Contact & Location", visible: true },
  ]);

  // 4. Dynamic Lists
  const [statsList, setStatsList] = React.useState(siteContent.stats);
  const [facultyList, setFacultyList] = React.useState(siteContent.faculty);
  const [toppersList, setToppersList] = React.useState(siteContent.toppers);
  const [testimonialsList, setTestimonialsList] = React.useState(siteContent.testimonials);
  const [faqsList, setFaqsList] = React.useState(siteContent.faqs);
  const [galleryList, setGalleryList] = React.useState(siteContent.gallery);

  // SAVE GENERAL SETTINGS
  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateSiteSettingsAction(generalForm);
      if (res.success) {
        toast({ title: "Settings Saved!", description: "Branding and contact details updated." });
      } else {
        toast({ title: "Save Error", description: res.message, variant: "destructive" });
      }
    } catch {
      toast({ title: "Updated Locally", description: "Changes saved to active session." });
    } finally {
      setLoading(false);
    }
  };

  // SAVE HERO
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await upsertHeroSlideAction(heroForm);
      if (res.success) {
        toast({ title: "Hero Updated!", description: "Hero slide content updated on live site." });
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    } catch {
      toast({ title: "Updated Locally", description: "Hero slide preview updated." });
    } finally {
      setLoading(false);
    }
  };

  // TOGGLE SECTION
  const toggleSection = async (key: string) => {
    const updated = sections.map((s) => (s.key === key ? { ...s, visible: !s.visible } : s));
    setSections(updated);

    try {
      await updateSectionSettingsAction(
        updated.map((s) => ({ section_key: s.key, is_visible: s.visible }))
      );
      toast({ title: "Visibility Updated", description: `Section visibility toggled.` });
    } catch {
      toast({ title: "Updated in Session", description: "Visibility toggled in view." });
    }
  };

  // DELETE HANDLERS WITH CONFIRMATION
  const handleDeleteFaculty = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove ${name} from the faculty section?`)) return;
    setFacultyList((prev) => prev.filter((f) => f.id !== id));
    try {
      await deleteFacultyAction(id);
    } catch {
      // Local session delete
    }
    toast({ title: "Faculty Removed", description: `${name} has been removed.` });
  };

  const handleDeleteTopper = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete ${name}'s topper record?`)) return;
    setToppersList((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTopperAction(id);
    } catch {
      // Local session delete
    }
    toast({ title: "Topper Removed", description: `${name}'s result deleted.` });
  };

  const handleDeleteFaq = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this FAQ question?")) return;
    setFaqsList((prev) => prev.filter((q) => q.id !== id));
    try {
      await deleteFaqAction(id);
    } catch {
      // Local session delete
    }
    toast({ title: "FAQ Deleted", description: "FAQ question removed." });
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm("Delete this gallery image?")) return;
    setGalleryList((prev) => prev.filter((g) => g.id !== id));
    try {
      await deleteGalleryImageAction(id);
    } catch {
      // Local session delete
    }
    toast({ title: "Image Deleted", description: "Image removed from campus gallery." });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" /> Website CMS & Page Editor
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Modify any text, image, banner, or section on the live landing page without touching code.
          </p>
        </div>

        <Button asChild size="sm" variant="outline" className="rounded-xl text-xs gap-1.5">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3.5 w-3.5 text-primary" /> Live Website Preview
          </a>
        </Button>
      </div>

      {/* Editor Tabs */}
      <Tabs defaultValue="general" className="w-full space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/60 p-1 rounded-2xl border border-border/60">
          <TabsTrigger value="general" className="rounded-xl text-xs font-semibold py-2 px-3">
            General & Branding
          </TabsTrigger>
          <TabsTrigger value="hero" className="rounded-xl text-xs font-semibold py-2 px-3">
            Hero Section
          </TabsTrigger>
          <TabsTrigger value="visibility" className="rounded-xl text-xs font-semibold py-2 px-3">
            Section Show/Hide
          </TabsTrigger>
          <TabsTrigger value="faculty" className="rounded-xl text-xs font-semibold py-2 px-3">
            Faculty ({facultyList.length})
          </TabsTrigger>
          <TabsTrigger value="toppers" className="rounded-xl text-xs font-semibold py-2 px-3">
            Toppers ({toppersList.length})
          </TabsTrigger>
          <TabsTrigger value="faqs" className="rounded-xl text-xs font-semibold py-2 px-3">
            FAQs ({faqsList.length})
          </TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl text-xs font-semibold py-2 px-3">
            Gallery ({galleryList.length})
          </TabsTrigger>
        </TabsList>

        {/* 1. GENERAL & BRANDING TAB */}
        <TabsContent value="general">
          <Card className="rounded-3xl border border-border/80 shadow-sm p-6 bg-card">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-lg font-bold">Platform Branding & Contact Details</CardTitle>
              <CardDescription className="text-xs">
                These settings update the navbar, footer, contact section, and WhatsApp links across the app.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSaveGeneral} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tuition_name" className="text-xs font-semibold">Tuition / Institute Name *</Label>
                  <Input
                    id="tuition_name"
                    value={generalForm.tuition_name}
                    onChange={(e) => setGeneralForm({ ...generalForm, tuition_name: e.target.value })}
                    className="rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="primary_color" className="text-xs font-semibold">Brand Theme Hex Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary_color"
                      value={generalForm.primary_color}
                      onChange={(e) => setGeneralForm({ ...generalForm, primary_color: e.target.value })}
                      className="rounded-xl font-mono text-xs"
                    />
                    <div
                      className="h-10 w-10 rounded-xl border shrink-0"
                      style={{ backgroundColor: generalForm.primary_color }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tagline" className="text-xs font-semibold">Tagline / Motto</Label>
                  <Input
                    id="tagline"
                    value={generalForm.tagline}
                    onChange={(e) => setGeneralForm({ ...generalForm, tagline: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="logo_url" className="text-xs font-semibold">Logo Image URL</Label>
                  <Input
                    id="logo_url"
                    placeholder="https://.../logo.png"
                    value={generalForm.logo_url}
                    onChange={(e) => setGeneralForm({ ...generalForm, logo_url: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="short_description" className="text-xs font-semibold">Short Institute Description</Label>
                <Textarea
                  id="short_description"
                  rows={2}
                  value={generalForm.short_description}
                  onChange={(e) => setGeneralForm({ ...generalForm, short_description: e.target.value })}
                  className="rounded-xl resize-none text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-semibold">Helpline Phone</Label>
                  <Input
                    id="phone"
                    value={generalForm.phone}
                    onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                    className="rounded-xl font-mono text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="whatsapp" className="text-xs font-semibold">WhatsApp Number (with country code)</Label>
                  <Input
                    id="whatsapp"
                    value={generalForm.whatsapp_number}
                    onChange={(e) => setGeneralForm({ ...generalForm, whatsapp_number: e.target.value })}
                    className="rounded-xl font-mono text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
                  <Input
                    id="email"
                    value={generalForm.email}
                    onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-xs font-semibold">Campus Physical Address</Label>
                  <Textarea
                    id="address"
                    rows={2}
                    value={generalForm.address}
                    onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })}
                    className="rounded-xl resize-none text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="map_url" className="text-xs font-semibold">Google Map Embed Iframe URL</Label>
                  <Textarea
                    id="map_url"
                    rows={2}
                    value={generalForm.google_map_embed_url}
                    onChange={(e) => setGeneralForm({ ...generalForm, google_map_embed_url: e.target.value })}
                    className="rounded-xl resize-none font-mono text-[10px]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md px-6 gap-2"
              >
                <Save className="h-4 w-4" /> Save General Settings
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* 2. HERO SLIDE TAB */}
        <TabsContent value="hero">
          <Card className="rounded-3xl border border-border/80 shadow-sm p-6 bg-card">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-lg font-bold">Hero Section Customizer</CardTitle>
              <CardDescription className="text-xs">
                Craft the main banner headline, highlight text, and call-to-action buttons.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSaveHero} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="hero_badge" className="text-xs font-semibold">Pulsing Top Badge Text</Label>
                <Input
                  id="hero_badge"
                  value={heroForm.badge}
                  onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="hero_headline" className="text-xs font-semibold">Main Headline Text</Label>
                  <Input
                    id="hero_headline"
                    value={heroForm.headline}
                    onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="hero_highlight" className="text-xs font-semibold">Gradient Highlight Word</Label>
                  <Input
                    id="hero_highlight"
                    value={heroForm.highlight_word}
                    onChange={(e) => setHeroForm({ ...heroForm, highlight_word: e.target.value })}
                    className="rounded-xl font-bold text-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="hero_sub" className="text-xs font-semibold">Sub-headline / Paragraph</Label>
                <Textarea
                  id="hero_sub"
                  rows={3}
                  value={heroForm.subheadline}
                  onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                  className="rounded-xl resize-none text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Primary CTA Button</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Button text"
                      value={heroForm.primary_cta_text}
                      onChange={(e) => setHeroForm({ ...heroForm, primary_cta_text: e.target.value })}
                      className="rounded-xl text-xs"
                    />
                    <Input
                      placeholder="Target link (e.g. #contact)"
                      value={heroForm.primary_cta_href}
                      onChange={(e) => setHeroForm({ ...heroForm, primary_cta_href: e.target.value })}
                      className="rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Secondary CTA Button</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Button text"
                      value={heroForm.secondary_cta_text}
                      onChange={(e) => setHeroForm({ ...heroForm, secondary_cta_text: e.target.value })}
                      className="rounded-xl text-xs"
                    />
                    <Input
                      placeholder="Target link (e.g. #batches)"
                      value={heroForm.secondary_cta_href}
                      onChange={(e) => setHeroForm({ ...heroForm, secondary_cta_href: e.target.value })}
                      className="rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md px-6 gap-2"
              >
                <Save className="h-4 w-4" /> Save Hero Section
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* 3. SECTION VISIBILITY (SHOW/HIDE TOGGLES) */}
        <TabsContent value="visibility">
          <Card className="rounded-3xl border border-border/80 shadow-sm p-6 bg-card">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-lg font-bold">Section Visibility & Layout Toggles</CardTitle>
              <CardDescription className="text-xs">
                Turn any landing page section ON or OFF instantly with one click.
              </CardDescription>
            </CardHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((sec) => (
                <div
                  key={sec.key}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    sec.visible
                      ? "bg-primary/[0.04] border-primary/30"
                      : "bg-muted/40 border-border/60 opacity-60"
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-foreground">{sec.label}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                      #{sec.key}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={sec.visible ? "default" : "outline"}
                    className="rounded-xl text-xs h-8 px-3"
                    onClick={() => toggleSection(sec.key)}
                  >
                    {sec.visible ? (
                      <>
                        <Eye className="h-3.5 w-3.5 mr-1" /> Visible
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3.5 w-3.5 mr-1" /> Hidden
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* 4. FACULTY TAB */}
        <TabsContent value="faculty">
          <Card className="rounded-3xl border border-border/80 shadow-sm p-6 bg-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Faculty Members</CardTitle>
                <CardDescription className="text-xs">
                  Manage teachers shown on the homepage and mobile app.
                </CardDescription>
              </div>
              <Button
                size="sm"
                className="rounded-xl text-xs gap-1.5"
                onClick={() => {
                  const newMember = {
                    id: `f-${Date.now()}`,
                    name: "New Teacher",
                    subject: "Subject Name",
                    qualification: "M.Sc. / B.Tech",
                    experience: "8+ Years",
                    bio: "Passionate educator dedicated to student clarity.",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
                  };
                  setFacultyList([...facultyList, newMember]);
                  toast({ title: "Draft Added", description: "Edit details below and save." });
                }}
              >
                <Plus className="h-3.5 w-3.5" /> Add Faculty
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facultyList.map((f, i) => (
                <div key={f.id} className="p-4 rounded-2xl border border-border/80 bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">Teacher #{i + 1}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-xl"
                      onClick={() => handleDeleteFaculty(f.id, f.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <Label className="text-[10px]">Name</Label>
                      <Input
                        value={f.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFacultyList((prev) => prev.map((x) => x.id === f.id ? { ...x, name: val } : x));
                        }}
                        className="rounded-lg h-8 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px]">Subject</Label>
                      <Input
                        value={f.subject}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFacultyList((prev) => prev.map((x) => x.id === f.id ? { ...x, subject: val } : x));
                        }}
                        className="rounded-lg h-8 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <Label className="text-[10px]">Degree / Qualification</Label>
                      <Input
                        value={f.qualification}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFacultyList((prev) => prev.map((x) => x.id === f.id ? { ...x, qualification: val } : x));
                        }}
                        className="rounded-lg h-8 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px]">Experience</Label>
                      <Input
                        value={f.experience}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFacultyList((prev) => prev.map((x) => x.id === f.id ? { ...x, experience: val } : x));
                        }}
                        className="rounded-lg h-8 text-xs"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <Label className="text-[10px]">Avatar Image URL</Label>
                    <Input
                      value={f.avatar}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFacultyList((prev) => prev.map((x) => x.id === f.id ? { ...x, avatar: val } : x));
                      }}
                      className="rounded-lg h-8 text-xs font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* 5. TOPPERS TAB */}
        <TabsContent value="toppers">
          <Card className="rounded-3xl border border-border/80 shadow-sm p-6 bg-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Toppers & Results</CardTitle>
                <CardDescription className="text-xs">
                  Highlight star achievers with scores, exam names, and ranks.
                </CardDescription>
              </div>
              <Button
                size="sm"
                className="rounded-xl text-xs gap-1.5"
                onClick={() => {
                  const newTopper = {
                    id: `t-${Date.now()}`,
                    name: "Achiever Name",
                    score: "99.0%",
                    exam: "Class 10 CBSE Board 2026",
                    year: "2026",
                    rank: "Rank 1",
                    testimonialSnippet: "STA Classes provided the perfect mentorship.",
                    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
                  };
                  setToppersList([...toppersList, newTopper]);
                  toast({ title: "Draft Topper Added", description: "Edit details below and save." });
                }}
              >
                <Plus className="h-3.5 w-3.5" /> Add Topper
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {toppersList.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl border border-border/80 bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">{t.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-xl"
                      onClick={() => handleDeleteTopper(t.id, t.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <Label className="text-[10px]">Score / Percentile</Label>
                      <Input
                        value={t.score}
                        onChange={(e) => {
                          const val = e.target.value;
                          setToppersList((prev) => prev.map((x) => x.id === t.id ? { ...x, score: val } : x));
                        }}
                        className="rounded-lg h-8 text-xs font-bold text-amber-600"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px]">Exam Name</Label>
                      <Input
                        value={t.exam}
                        onChange={(e) => {
                          const val = e.target.value;
                          setToppersList((prev) => prev.map((x) => x.id === t.id ? { ...x, exam: val } : x));
                        }}
                        className="rounded-lg h-8 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px]">Rank</Label>
                      <Input
                        value={t.rank || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setToppersList((prev) => prev.map((x) => x.id === t.id ? { ...x, rank: val } : x));
                        }}
                        className="rounded-lg h-8 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <Label className="text-[10px]">Student Quote</Label>
                    <Input
                      value={t.testimonialSnippet}
                      onChange={(e) => {
                        const val = e.target.value;
                        setToppersList((prev) => prev.map((x) => x.id === t.id ? { ...x, testimonialSnippet: val } : x));
                      }}
                      className="rounded-lg h-8 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* 6. FAQS TAB */}
        <TabsContent value="faqs">
          <Card className="rounded-3xl border border-border/80 shadow-sm p-6 bg-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-xs">
                  Manage questions & answers displayed in the FAQ accordion.
                </CardDescription>
              </div>
              <Button
                size="sm"
                className="rounded-xl text-xs gap-1.5"
                onClick={() => {
                  const newFaq = {
                    id: `faq-${Date.now()}`,
                    question: "New Question Title?",
                    answer: "Comprehensive answer explaining the policy or procedure clearly.",
                    category: "admissions" as any,
                  };
                  setFaqsList([...faqsList, newFaq]);
                  toast({ title: "Draft FAQ Added" });
                }}
              >
                <Plus className="h-3.5 w-3.5" /> Add Question
              </Button>
            </div>

            <div className="space-y-3">
              {faqsList.map((q) => (
                <div key={q.id} className="p-4 rounded-2xl border border-border/80 bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Input
                      value={q.question}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFaqsList((prev) => prev.map((x) => x.id === q.id ? { ...x, question: val } : x));
                      }}
                      className="rounded-xl font-semibold text-xs h-9"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-xl shrink-0"
                      onClick={() => handleDeleteFaq(q.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    rows={2}
                    value={q.answer}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFaqsList((prev) => prev.map((x) => x.id === q.id ? { ...x, answer: val } : x));
                    }}
                    className="rounded-xl text-xs resize-none"
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* 7. GALLERY TAB */}
        <TabsContent value="gallery">
          <Card className="rounded-3xl border border-border/80 shadow-sm p-6 bg-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Campus Photo Gallery</CardTitle>
                <CardDescription className="text-xs">
                  Curate photos of campus infrastructure, labs, and celebrations.
                </CardDescription>
              </div>
              <Button
                size="sm"
                className="rounded-xl text-xs gap-1.5"
                onClick={() => {
                  const newImg = {
                    id: `g-${Date.now()}`,
                    title: "Campus Moment",
                    category: "Campus",
                    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
                    aspect: "wide" as any,
                  };
                  setGalleryList([...galleryList, newImg]);
                  toast({ title: "Draft Image Added" });
                }}
              >
                <Plus className="h-3.5 w-3.5" /> Add Photo
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryList.map((g) => (
                <div key={g.id} className="p-3 rounded-2xl border border-border/80 bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground truncate">{g.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:bg-destructive/10 rounded-lg"
                      onClick={() => handleDeleteGallery(g.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Input
                    value={g.title}
                    placeholder="Caption / Title"
                    onChange={(e) => {
                      const val = e.target.value;
                      setGalleryList((prev) => prev.map((x) => x.id === g.id ? { ...x, title: val } : x));
                    }}
                    className="rounded-lg h-7 text-xs"
                  />
                  <Input
                    value={g.imageUrl}
                    placeholder="Image URL"
                    onChange={(e) => {
                      const val = e.target.value;
                      setGalleryList((prev) => prev.map((x) => x.id === g.id ? { ...x, imageUrl: val } : x));
                    }}
                    className="rounded-lg h-7 text-[11px] font-mono"
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

