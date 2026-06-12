import { NextRequest, NextResponse } from "next/server";
import { ApplicationService } from "@/lib/services/application.service";
import { verifyAuthToken, createProblemDetails, checkRateLimit, rateLimitResponse } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  // 1. Rate Limiting
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const limitStatus = checkRateLimit(ip, 100, 60000); // 100 requests per minute
  if (!limitStatus.success) {
    return rateLimitResponse(limitStatus.resetAt);
  }

  // 2. Authentication
  const user = verifyAuthToken(req);
  if (!user) {
    return createProblemDetails(401, "Unauthorized", "A valid bearer token is required.");
  }

  // 3. Pagination & Query Params
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 50;
  if (isNaN(limit) || limit < 1 || limit > 100) {
    return createProblemDetails(400, "Bad Request", "limit must be between 1 and 100");
  }

  const startingAfter = searchParams.get("starting_after");
  const isCompleteParam = searchParams.get("is_complete");

  const isComplete = isCompleteParam !== null ? (isCompleteParam === 'true') : null;

  try {
    const service = new ApplicationService();
    const result = await service.listApplications(limit, startingAfter, isComplete);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database query failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to retrieve applications.");
  }
}
