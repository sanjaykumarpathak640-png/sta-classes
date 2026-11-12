"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  Bell, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Search,
  Plus,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminSidebar, adminNavItems } from "./admin-sidebar";
import { Badge } from "@/components/ui/badge";

export function AdminHeader() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  // Find current active item title
  const currentItem = adminNavItems.find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href)
  ) || { title: "Admin Portal" };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Drawer Trigger + Page Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Trigger */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden h-9 w-9 rounded-xl border-border"
              aria-label="Open sidebar"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r">
            <AdminSidebar onItemClick={() => setSheetOpen(false)} />
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            {currentItem.title}
            <Badge variant="secondary" className="hidden sm:inline-flex text-[10px] font-semibold text-primary px-2 py-0">
              Admin
            </Badge>
          </h1>
          <p className="hidden md:block text-[11px] text-muted-foreground">
            Full control over STA Classes website, curriculum & students
          </p>
        </div>
      </div>

      {/* Right: Quick Actions, Theme Toggle, Admin Profile */}
      <div className="flex items-center gap-2.5">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="hidden sm:flex rounded-xl text-xs gap-1.5 border-border"
        >
          <Link href="/" target="_blank">
            <ExternalLink className="h-3.5 w-3.5 text-primary" />
            Live Preview
          </Link>
        </Button>

        <ThemeToggle />

        {/* Admin Avatar Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-border/60">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary to-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            STA
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold leading-none text-foreground flex items-center gap-1">
              Admin <ShieldCheck className="h-3 w-3 text-emerald-500" />
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Headmaster</div>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          className="rounded-xl text-xs text-red-600 hover:text-red-700 hover:bg-red-500/10 gap-1.5 h-8 px-2.5"
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            window.location.href = "/";
          }}
          title="Sign out from Admin"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}

