import { NextRequest, NextResponse } from "next/server";
import { ApplicationService } from "@/lib/services/application.service";
import { verifyAuthToken, createProblemDetails } from "@/lib/api-utils";

export async function PUT(
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
    const body = await req.json();
    if (!Array.isArray(body.choices)) {
      return createProblemDetails(400, "Bad Request", "Expected 'choices' array.");
    }

    const service = new ApplicationService();
    await service.updateUniversityChoices(application_id, body.choices);
    return NextResponse.json({ message: "University choices updated successfully" });
  } catch (error) {
    console.error("University choices update failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to update choices.");
  }
}
