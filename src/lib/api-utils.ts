import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  [key: string]: any;
}

export interface AuthTokenPayload extends jwt.JwtPayload {
  userId: number;
  email: string;
  role: "admin" | "student";
}

/**
 * Validates the Authorization Bearer token.
 */
export function verifyAuthToken(req: NextRequest): AuthTokenPayload | null {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
    return decoded as AuthTokenPayload;
  } catch (err) {
    return null;
  }
}

/**
 * Generates an RFC 7807 Problem Details response.
 */
export function createProblemDetails(
  status: number,
  title: string,
  detail: string,
  type?: string,
  extra?: Record<string, any>
) {
  const problem: ProblemDetails = {
    type: type || `https://httpstatuses.com/${status}`,
    title,
    status,
    detail,
    ...extra,
  };

  return NextResponse.json(problem, {
    status,
    headers: {
      "Content-Type": "application/problem+json",
    },
  });
}

// Very basic in-memory rate limiter for demonstration
const rateLimitCache = new Map<string, { count: number; expiresAt: number }>();

/**
 * Basic IP-based rate limiter middleware helper.
 * In production, use Redis or a distributed store.
 */
export function checkRateLimit(ip: string, limit: number, windowMs: number) {
  const now = Date.now();
  const record = rateLimitCache.get(ip);

  if (record) {
    if (now > record.expiresAt) {
      // Window expired, reset
      rateLimitCache.set(ip, { count: 1, expiresAt: now + windowMs });
      return { success: true, count: 1, resetAt: now + windowMs };
    }

    if (record.count >= limit) {
      return { success: false, count: record.count, resetAt: record.expiresAt };
    }

    record.count += 1;
    rateLimitCache.set(ip, record);
    return { success: true, count: record.count, resetAt: record.expiresAt };
  }

  rateLimitCache.set(ip, { count: 1, expiresAt: now + windowMs });
  return { success: true, count: 1, resetAt: now + windowMs };
}

/**
 * Handle a generic rate limit response, adhering to API Design constraints
 */
export function rateLimitResponse(resetAt: number) {
  const retryAfterSeconds = Math.ceil((resetAt - Date.now()) / 1000);
  const res = createProblemDetails(
    429,
    "Too Many Requests",
    "You have exceeded the rate limit. Please try again later."
  );
  res.headers.set("Retry-After", retryAfterSeconds.toString());
  res.headers.set("X-RateLimit-Reset", resetAt.toString());
  return res;
}
