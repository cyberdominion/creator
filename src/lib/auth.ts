import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-change-in-production"
);

const SESSION_COOKIE = "creator_edit_session";
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  exp?: number;
  iat?: number;
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export function getSessionCookie(): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function getCurrentSession(): Promise<SessionPayload | null> {
  const token = getSessionCookie();
  if (!token) return null;
  return verifySession(token);
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL / 1000,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export const AUTH_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
  "/api/auth/me",
];

export const PROTECTED_PREFIXES = ["/api/admin", "/api/account", "/api/checkout"];

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname === route);
}

export const ALLOWED_ROLES: Record<string, string[]> = {
  "/api/admin/events": ["OWNER", "ADMINISTRATOR"],
  "/api/admin/orders": ["OWNER", "ADMINISTRATOR", "SUPPORT"],
  "/api/admin/analytics": ["OWNER", "ADMINISTRATOR", "ANALYST"],
  "/api/admin/refunds": ["OWNER", "ADMINISTRATOR"],
};