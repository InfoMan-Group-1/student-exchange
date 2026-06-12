import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
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

  // 4. Build Query
  let sql = `
    SELECT 
      a.application_id, a.student_number, a.semester_preference, a.duration_preference, a.is_complete,
      s.full_name, s.cumulative_gwa, p.program_name as program, p.college
    FROM applications a
    JOIN students s ON a.student_number = s.student_number
    JOIN programs p ON s.program_id = p.program_id
    WHERE 1=1
  `;
  const values: any[] = [];

  if (isCompleteParam !== null) {
    sql += ` AND a.is_complete = ?`;
    values.push(isCompleteParam === 'true');
  }

  // Cursor pagination
  if (startingAfter) {
    sql += ` AND a.application_id > ?`;
    values.push(startingAfter);
  }

  sql += ` ORDER BY a.application_id ASC LIMIT ?`;
  values.push(limit);

  // 5. Execute Query
  try {
    const applications = await query(sql, values);
    
    // Check if there are more
    let hasMore = false;
    let nextCursor = null;
    
    if (Array.isArray(applications) && applications.length === limit) {
      // Look ahead to see if there is another record
      const nextSql = `SELECT application_id FROM applications WHERE application_id > ? ORDER BY application_id ASC LIMIT 1`;
      const nextCheck = await query<any[]>(nextSql, [(applications[applications.length - 1] as any).application_id]);
      if (nextCheck && nextCheck.length > 0) {
        hasMore = true;
        nextCursor = (applications[applications.length - 1] as any).application_id;
      }
    }

    return NextResponse.json({
      object: "list",
      has_more: hasMore,
      next_cursor: nextCursor,
      data: applications
    });
  } catch (error) {
    console.error("Database query failed:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to retrieve applications.");
  }
}
