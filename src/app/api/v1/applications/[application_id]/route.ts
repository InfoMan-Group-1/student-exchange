import { NextRequest, NextResponse } from "next/server";
import { ApplicationService } from "@/lib/services/application.service";
import { verifyAuthToken, createProblemDetails, checkRateLimit, rateLimitResponse } from "@/lib/api-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ application_id: string }> }
) {
  // 1. Rate Limiting
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const limitStatus = checkRateLimit(ip, 100, 60000); // 100 reqs/min
  if (!limitStatus.success) {
    return rateLimitResponse(limitStatus.resetAt);
  }

  // 2. Authentication
  const user = verifyAuthToken(req);
  if (!user) {
    return createProblemDetails(401, "Unauthorized", "A valid bearer token is required.");
  }

  const { application_id } = await params;

  if (!application_id) {
    return createProblemDetails(400, "Bad Request", "Missing application_id parameter.");
  }

  try {
    const service = new ApplicationService();
    const result = await service.getApplication(application_id);

    if (!result) {
      return createProblemDetails(404, "Not Found", `Application with ID ${application_id} not found.`);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Database query failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to retrieve application detail.");
  }
}
