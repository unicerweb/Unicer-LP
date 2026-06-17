import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "unicer_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 horas

function getSecret(): string {
  return (
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "unicer-dev-secret"
  );
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = Buffer.from(JSON.stringify({ exp })).toString("base64url");
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  try {
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return false;
    if (!timingSafeEqual(sigBuf, expBuf)) return false;
  } catch {
    return false;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      exp: number;
    };
    return data.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "unicer-admin";
  return password === expected;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export { COOKIE_NAME, SESSION_MAX_AGE };
