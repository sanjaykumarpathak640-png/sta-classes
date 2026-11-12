import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    // Master Admin Passwords accepted
    const allowedPasswords = [
      process.env.STA_ADMIN_PASSWORD,
      "STA@2026",
      "STAadmin@62016",
    ].filter(Boolean);

    if (!password || !allowedPasswords.includes(password.trim())) {
      return NextResponse.json(
        { success: false, error: "Galat Password! Sirf authorized admin hi access kar sakte hain." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Master Admin access granted successfully!",
    });

    response.cookies.set("sta_admin_auth", "sta_admin_authenticated_secure_token", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Authentication service error" },
      { status: 500 }
    );
  }
}
