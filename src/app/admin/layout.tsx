import { requireAdmin } from "@/lib/auth/admin-guard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export const metadata = {
  title: "STA Classes | Master Admin Control Deck",
  description: "Comprehensive management panel for STA Classes platform, batches, and dynamic CMS.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enforce server-side admin role check
  await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background flex">
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block w-64 h-screen sticky top-0 shrink-0">
        <AdminSidebar />
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

