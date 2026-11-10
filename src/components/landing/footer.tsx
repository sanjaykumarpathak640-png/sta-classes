import Link from "next/link";
import { GraduationCap, ArrowUpRight, Heart } from "lucide-react";
import { siteContent } from "@/data/site-content";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-background pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/60">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-foreground">
                {siteContent.brand.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              {siteContent.brand.shortDescription}
            </p>
            <div className="pt-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Tuition Center:</span> {siteContent.contact.address}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              {siteContent.navigation.map((nav) => (
                <li key={nav.href}>
                  <Link href={nav.href} className="hover:text-primary transition-colors">
                    {nav.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Batch Programs */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground">Top Programs</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              {siteContent.batchCategories.slice(1).map((cat) => (
                <li key={cat.id}>
                  <Link href="#batches" className="hover:text-primary transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Admissions & Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground">Direct Admissions</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <span className="block font-medium text-foreground">Direct Call:</span>
                <a href={`tel:${siteContent.contact.phone}`} className="font-mono text-xs text-primary font-bold hover:underline">
                  {siteContent.contact.phone}
                </a>
              </li>
              <li>
                <span className="block font-medium text-foreground">WhatsApp:</span>
                <a href={`https://wa.me/${siteContent.contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-emerald-600 font-bold hover:underline">
                  +{siteContent.contact.whatsappNumber}
                </a>
              </li>
              <li>
                <span className="block font-medium text-foreground">Email:</span>
                <a href={`mailto:${siteContent.contact.email}`} className="text-xs hover:text-foreground break-all">
                  {siteContent.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {siteContent.brand.name}. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with pride for young achievers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

