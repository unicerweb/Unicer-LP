import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  SESSION_MAX_AGE,
  createSessionToken,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  const token = createSessionToken();
  const response = NextResponse.json({ success: true });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return response;
}
