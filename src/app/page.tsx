import { getLandingPageContent } from "@/lib/cms/content-provider";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { StatsSection } from "@/components/landing/stats-section";
import { BatchesSection } from "@/components/landing/batches-section";
import { OfflineBatchSection } from "@/components/landing/offline-batch-section";
import { GalleryGrid } from "@/components/landing/gallery-grid";
import { FaqSection } from "@/components/landing/faq-section";
import { ContactSection } from "@/components/landing/contact-section";
import { WhatsAppFloatingButton } from "@/components/landing/whatsapp-floating-button";
import { Footer } from "@/components/landing/footer";

// Dynamic landing page reading from Supabase tables or fallback
export const revalidate = 0; // Dynamic server-rendered on each request so admin changes show instantly

export default async function Home() {
  const cms = await getLandingPageContent();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Sticky Scroll-Aware Navbar */}
      <Navbar settings={cms.settings} />

      {/* Main Content Sections (Conditional based on admin visibility toggles) */}
      <main className="flex-1">
        {cms.sections.hero !== false && <HeroSection />}
        {cms.sections.stats !== false && <StatsSection />}
        {cms.sections.batches !== false && <BatchesSection />}
        <OfflineBatchSection />
        {cms.sections.gallery !== false && <GalleryGrid />}
        {cms.sections.faqs !== false && <FaqSection />}
        {cms.sections.contact !== false && <ContactSection />}
      </main>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}
