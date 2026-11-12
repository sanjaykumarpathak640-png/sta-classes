"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  BookOpen, 
  Radio, 
  FileCheck2, 
  HelpCircle, 
  CalendarCheck, 
  CreditCard, 
  Bell, 
  GraduationCap,
  ExternalLink,
  ChevronRight,
  LogOut
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Website Editor",
    href: "/admin/website",
    icon: Globe,
    badge: "CMS",
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: Users,
    badge: "Approvals",
  },
  {
    title: "Batches & Curriculum",
    href: "/admin/batches",
    icon: BookOpen,
    badge: null,
  },
  {
    title: "Live Classes",
    href: "/admin/live-classes",
    icon: Radio,
    badge: "Live",
  },
  {
    title: "Tests & Quizzes",
    href: "/admin/tests",
    icon: FileCheck2,
    badge: "CSV",
  },
  {
    title: "Doubts Inbox",
    href: "/admin/doubts",
    icon: HelpCircle,
    badge: null,
  },
  {
    title: "Attendance",
    href: "/admin/attendance",
    icon: CalendarCheck,
    badge: null,
  },
  {
    title: "Fees Ledger",
    href: "/admin/fees",
    icon: CreditCard,
    badge: "WhatsApp",
  },
  {
    title: "Notices",
    href: "/admin/notices",
    icon: Bell,
    badge: null,
  },
];

interface AdminSidebarProps {
  onItemClick?: () => void;
}

export function AdminSidebar({ onItemClick }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full bg-card border-r border-border/80 flex flex-col justify-between select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-border/60 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-foreground">
                STA Classes
              </div>
              <div className="text-[10px] text-muted-foreground font-semibold tracking-wider uppercase">
                Admin Control Deck
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
          <div className="px-3 py-1.5 text-[10px] font-bold text-muted-foreground/80 tracking-wider uppercase">
            Management Modules
          </div>

          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
                  <span>{item.title}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="h-3 w-3 opacity-80" />}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & View Live Site link */}
      <div className="p-3 border-t border-border/60 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <span className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-primary" />
            View Live Website
          </span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            window.location.href = "/";
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-500/10 transition-colors"
        >
          <span className="flex items-center gap-2">
            <LogOut className="h-3.5 w-3.5" />
            Logout from Admin
          </span>
        </button>
        <div className="px-3 py-1 text-[10px] text-muted-foreground/70">
          STA Admin Suite v2.0 • Secured
        </div>
      </div>
    </aside>
  );
}

