import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/services/auth.service";
import { createProblemDetails, checkRateLimit, rateLimitResponse } from "@/lib/api-utils";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const limitStatus = checkRateLimit(ip, 20, 60000); // Strict limit on auth endpoints
  if (!limitStatus.success) {
    return rateLimitResponse(limitStatus.resetAt);
  }

  try {
    const body = await req.json();
    
    if (!body.email || !body.password) {
      return createProblemDetails(400, "Bad Request", "Missing email or password.");
    }

    const result = await authService.login(body.email, body.password);

    return NextResponse.json({
      message: "Login successful",
      data: result
    }, { status: 200 });

  } catch (error: any) {
    return createProblemDetails(401, "Unauthorized", error.message || "Login failed");
  }
}
