import { NextRequest, NextResponse } from "next/server";
import { StudentService } from "@/lib/services/student.service";
import { verifyAuthToken, createProblemDetails } from "@/lib/api-utils";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ student_number: string }> }
) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "admin") {
    return createProblemDetails(403, "Forbidden", "Admin access required.");
  }

  const { student_number } = await params;
  if (!student_number) {
    return createProblemDetails(400, "Bad Request", "Missing student_number parameter.");
  }

  try {
    const body = await req.json();
    if (!Array.isArray(body.languages)) {
      return createProblemDetails(400, "Bad Request", "Expected 'languages' array.");
    }

    const service = new StudentService();
    await service.updateLanguages(student_number, body.languages);
    return NextResponse.json({ message: "Languages updated successfully" });
  } catch (error) {
    console.error("Languages update failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to update languages.");
  }
}
