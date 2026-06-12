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
    
    const result = await authService.register({
      email: body.email,
      passwordRaw: body.password,
      role: body.role,
      studentNumber: body.student_number,
      programId: body.program_id,
      guardianId: body.guardian_id,
      fullName: body.full_name
    });

    return NextResponse.json({
      message: "Registration successful",
      data: result
    }, { status: 201 });

  } catch (error: any) {
    const message = error.message || "Registration failed";
    const status = message.includes("already exists") ? 409 : 400;
    return createProblemDetails(status, "Registration Error", message);
  }
}
