import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
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

  // 3. Execute Query
  try {
    const studentSql = `
      SELECT 
        s.*,
        p.program_name as program, p.college,
        g.guardian_name, g.guardian_contact_number, g.guardian_email, g.relationship
      FROM students s
      JOIN programs p ON s.program_id = p.program_id
      JOIN guardians g ON s.guardian_id = g.guardian_id
      WHERE s.student_number = ?
    `;
    const students = await query<any[]>(studentSql, [student_number]);

    if (!students || students.length === 0) {
      return createProblemDetails(404, "Not Found", `Student with number ${student_number} not found.`);
    }

    const student = students[0];

    // Fetch Languages
    const langSql = `
      SELECT language_name, proficiency_level
      FROM student_languages
      WHERE student_number = ?
    `;
    const languages = await query<any[]>(langSql, [student_number]);

    // Construct final
    const result = {
      ...student,
      languages
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Database query failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to retrieve student detail.");
  }
}
