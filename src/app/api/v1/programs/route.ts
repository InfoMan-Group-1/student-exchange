import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { createProblemDetails } from "@/lib/api-utils";

export async function GET() {
  try {
    const [rows] = await pool.query(
      `SELECT program_id, program_name, college_name FROM programs ORDER BY program_name ASC`
    );
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("Failed to fetch programs:", error);
    return createProblemDetails(500, "Internal Server Error", "Failed to retrieve academic programs.");
  }
}
