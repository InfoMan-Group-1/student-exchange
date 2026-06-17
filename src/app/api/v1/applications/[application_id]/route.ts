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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ application_id: string }> }
) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "admin") {
    // Eventually allow student to update their own application
    return createProblemDetails(403, "Forbidden", "Admin access required.");
  }

  const { application_id } = await params;
  if (!application_id) {
    return createProblemDetails(400, "Bad Request", "Missing application_id parameter.");
  }

  try {
    const body = await req.json();
    const service = new ApplicationService();
    await service.updateApplication(application_id, body);
    return NextResponse.json({ message: "Application updated successfully" });
  } catch (error) {
    console.error("Application update failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to update application.");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ application_id: string }> }
) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "admin") {
    return createProblemDetails(403, "Forbidden", "Admin access required.");
  }

  const { application_id } = await params;
  if (!application_id) {
    return createProblemDetails(400, "Bad Request", "Missing application_id parameter.");
  }

  try {
    const service = new ApplicationService();
    await service.deleteApplication(application_id);
    return NextResponse.json({ message: "Application deleted successfully" });
  } catch (error: any) {
    console.error("Application deletion failed:", error);
    if (error.message === "Application not found.") {
      return createProblemDetails(404, "Not Found", "Application not found.");
    }
    return createProblemDetails(500, "Internal Server Error", "Failed to delete application.");
  }
}
