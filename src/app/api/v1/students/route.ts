import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyAuthToken, createProblemDetails, checkRateLimit, rateLimitResponse } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
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

  // 3. Pagination
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 50;
  if (isNaN(limit) || limit < 1 || limit > 100) {
    return createProblemDetails(400, "Bad Request", "limit must be between 1 and 100");
  }

  const startingAfter = searchParams.get("starting_after");

  // 4. Build Query
  let sql = `
    SELECT 
      s.student_number, s.full_name, s.cumulative_gwa, s.year_level, s.school_email,
      p.program_name as program, p.college
    FROM students s
    JOIN programs p ON s.program_id = p.program_id
    WHERE 1=1
  `;
  const values: any[] = [];

  if (startingAfter) {
    sql += ` AND s.student_number > ?`;
    values.push(startingAfter);
  }

  sql += ` ORDER BY s.student_number ASC LIMIT ?`;
  values.push(limit);

  // 5. Execute Query
  try {
    const students = await query(sql, values);
    
    // Check if there are more
    let hasMore = false;
    let nextCursor = null;
    
    if (Array.isArray(students) && students.length === limit) {
      const nextSql = `SELECT student_number FROM students WHERE student_number > ? ORDER BY student_number ASC LIMIT 1`;
      const nextCheck = await query<any[]>(nextSql, [(students[students.length - 1] as any).student_number]);
      if (nextCheck && nextCheck.length > 0) {
        hasMore = true;
        nextCursor = (students[students.length - 1] as any).student_number;
      }
    }

    return NextResponse.json({
      object: "list",
      has_more: hasMore,
      next_cursor: nextCursor,
      data: students
    });
  } catch (error) {
    console.error("Database query failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to retrieve students.");
  }
}
