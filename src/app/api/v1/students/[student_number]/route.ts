import { NextRequest, NextResponse } from "next/server";
import { StudentService } from "@/lib/services/student.service";
import { verifyAuthToken, createProblemDetails, checkRateLimit, rateLimitResponse } from "@/lib/api-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ student_number: string }> }
) {
  // 1. Rate Limiting
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const limitStatus = checkRateLimit(ip, 100, 60000);
  if (!limitStatus.success) {
    return rateLimitResponse(limitStatus.resetAt);
  }

  // 2. Authentication
  const user = verifyAuthToken(req);
  if (!user) {
    return createProblemDetails(401, "Unauthorized", "A valid bearer token is required.");
  }

  const { student_number } = await params;

  if (!student_number) {
    return createProblemDetails(400, "Bad Request", "Missing student_number parameter.");
  }

  try {
    const service = new StudentService();
    const result = await service.getStudent(student_number);

    if (!result) {
      return createProblemDetails(404, "Not Found", `Student with number ${student_number} not found.`);
    }

    // Flatten guardian to match previous API shape
    const flattened = {
      ...result,
      guardian_name: result.guardian?.guardian_name,
      guardian_contact_number: result.guardian?.guardian_contact_number,
      guardian_email: result.guardian?.guardian_email,
      relation_to_student: result.guardian?.relation_to_student
    };
    delete flattened.guardian;

    return NextResponse.json(flattened);
  } catch (error) {
    console.error("Database query failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to retrieve student detail.");
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ student_number: string }> }
) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "admin") {
    // Eventually allow student to update their own profile
    return createProblemDetails(403, "Forbidden", "Admin access required.");
  }

  const { student_number } = await params;
  if (!student_number) {
    return createProblemDetails(400, "Bad Request", "Missing student_number parameter.");
  }

  try {
    const body = await req.json();
    const service = new StudentService();
    await service.updateStudent(student_number, body);
    return NextResponse.json({ message: "Student updated successfully" });
  } catch (error) {
    console.error("Student update failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to update student.");
  }
}
