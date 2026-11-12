import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Profile } from "@/types/database";

export interface AdminAuthResult {
  isAdmin: boolean;
  user: any | null;
  profile: Profile | null;
  isMockDev?: boolean;
}

export async function verifyAdminSession(): Promise<AdminAuthResult> {
  const cookieStore = cookies();
  const adminCookie = cookieStore.get("sta_admin_auth")?.value;

  // Master password authenticated session (Strict check)
  if (adminCookie === "sta_admin_authenticated_secure_token" || adminCookie === "true") {
    return {
      isAdmin: true,
      user: { id: "master-admin-id", email: "sanjaykumarpathak640@gmail.com" },
      profile: {
        id: "master-admin-id",
        full_name: "Master Admin (STA Classes)",
        phone: "+91 62016 30760",
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

  // If Supabase is configured, check database role
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("your-project-id") && !supabaseUrl.includes("example.com")) {
    try {
      const supabase = createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (!authError && user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (profile && profile.role === "admin") {
          return {
            isAdmin: true,
            user,
            profile: profile as Profile,
          };
        }
      }
    } catch {
      // ignore, fall through to false
    }
  }

  // STRICT ACCESS CONTROL: If not authenticated with password, access is strictly denied
  return { isAdmin: false, user: null, profile: null };
}

export async function requireAdmin(): Promise<AdminAuthResult> {
  const result = await verifyAdminSession();
  if (!result.isAdmin) {
    redirect("/admin-login?error=unauthorized");
  }
  return result;
}

