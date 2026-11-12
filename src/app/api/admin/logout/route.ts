import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().set("sta_admin_auth", "", {
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ success: true, message: "Logged out successfully" });
}

export async function GET(request: Request) {
  cookies().set("sta_admin_auth", "", {
    path: "/",
    maxAge: 0,
  });

  const url = new URL("/", request.url);
  return NextResponse.redirect(url);
}
