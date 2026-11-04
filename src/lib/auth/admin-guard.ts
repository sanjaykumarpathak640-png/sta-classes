import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Profile } from "@/types/database";

export interface AdminAuthResult {
  isAdmin: boolean;
  user: any | null;
  profile: Profile | null;
  isMockDev?: boolean;
}

export async function verifyAdminSession(): Promise<AdminAuthResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // Local development / initial setup mode when Supabase credentials are placeholder
  if (!supabaseUrl || supabaseUrl.includes("your-project-id") || supabaseUrl.includes("example.com")) {
    return {
      isAdmin: true,
      user: { id: "dev-admin-id", email: "admin@staclasses.com" },
      profile: {
        id: "dev-admin-id",
        full_name: "Principal & Admin",
        phone: "+91 98765 43210",
        class_grade: null,
        avatar_url: null,
        role: "admin",
        is_approved: true,
        is_blocked: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      isMockDev: true,
    };
  }

  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { isAdmin: false, user: null, profile: null };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile || profile.role !== "admin") {
      return { isAdmin: false, user, profile: profile as Profile | null };
    }

    return {
      isAdmin: true,
      user,
      profile: profile as Profile,
    };
  } catch {
    return { isAdmin: false, user: null, profile: null };
  }
}

export async function requireAdmin(): Promise<AdminAuthResult> {
  const result = await verifyAdminSession();
  if (!result.isAdmin) {
    redirect("/login?error=admin_required");
  }
  return result;
}

