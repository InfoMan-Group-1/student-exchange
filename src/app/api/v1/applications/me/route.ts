import { NextRequest, NextResponse } from "next/server";
import { StudentApplicationService } from "@/lib/services/student.application.service";
import { verifyAuthToken, createProblemDetails } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "student") return createProblemDetails(403, "Forbidden", "Student access required.");

  try {
    const service = new StudentApplicationService();
    const dashboard = await service.getDashboard(user.userId);
    return NextResponse.json({ data: dashboard });
  } catch (error: any) {
    return createProblemDetails(500, "Error", error.message);
  }
}

export async function POST(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "student") return createProblemDetails(403, "Forbidden", "Student access required.");

  try {
    const body = await req.json();
    const service = new StudentApplicationService();
    const result = await service.createApplication(user.userId, body);
    return NextResponse.json({ message: "Application created", data: result }, { status: 201 });
  } catch (error: any) {
    return createProblemDetails(500, "Error", error.message);
  }
}

export async function PATCH(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "student") return createProblemDetails(403, "Forbidden", "Student access required.");

  try {
    const body = await req.json();
    const service = new StudentApplicationService();
    
    const { choices, ...rest } = body;

    // Update non-choice fields (preferences, endorsements, documents, etc.)
    if (Object.keys(rest).length > 0) {
      await service.updateApplication(user.userId, rest);
    }

    // Update university choices if provided
    if (choices) {
      await service.updateUniversityChoices(user.userId, choices);
    }
    
    return NextResponse.json({ message: "Application updated successfully" });
  } catch (error: any) {
    return createProblemDetails(500, "Error", error.message);
  }
}
