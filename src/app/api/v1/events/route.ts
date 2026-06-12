import { NextRequest, NextResponse } from "next/server";
import { EventRepository } from "@/lib/repositories/event.repository";
import { verifyAuthToken, createProblemDetails } from "@/lib/api-utils";

const repo = new EventRepository();

// GET /api/v1/events — list all events (admin or student)
export async function GET(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user) return createProblemDetails(401, "Unauthorized", "A valid bearer token is required.");

  try {
    const events = await repo.getAllEvents();
    return NextResponse.json({ data: events });
  } catch (err: any) {
    return createProblemDetails(500, "Internal Server Error", err.message);
  }
}
