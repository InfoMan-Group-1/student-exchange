import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
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

  // 3. Execute Query
  try {
    // We join the applications with the student, program, and college
    const applicationSql = `
      SELECT 
        a.*,
        s.full_name, s.age, s.nationality, s.sex, s.birth_date, s.school_email, s.alternate_email, 
        s.home_address, s.mobile_number, s.passport_number, s.passport_issue_date, s.passport_expiry_date,
        s.year_level, s.cumulative_gwa, s.guardian_id,
        p.program_name as program, p.college
      FROM applications a
      JOIN students s ON a.student_number = s.student_number
      JOIN programs p ON s.program_id = p.program_id
      WHERE a.application_id = ?
    `;
    const applications = await query<any[]>(applicationSql, [application_id]);

    if (!applications || applications.length === 0) {
      return createProblemDetails(404, "Not Found", `Application with ID ${application_id} not found.`);
    }

    const application = applications[0];

    // Fetch University Choices
    const choicesSql = `
      SELECT university_choice_rank, university_name
      FROM university_choices
      WHERE application_id = ?
      ORDER BY university_choice_rank ASC
    `;
    const choices = await query<any[]>(choicesSql, [application_id]);

    // Construct final aggregated object
    const result = {
      ...application,
      university_choices: choices
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Database query failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to retrieve application detail.");
  }
}
