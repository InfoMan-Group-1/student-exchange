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

// POST /api/v1/events — create a new event (student can add "Others")
export async function POST(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user) return createProblemDetails(401, "Unauthorized", "A valid bearer token is required.");

  try {
    const body = await req.json();
    const { event_name, host_country, event_date } = body;
    if (!event_name || !host_country || !event_date) {
      return createProblemDetails(400, "Bad Request", "Missing required fields.");
    }

    const eventId = await repo.createEvent(event_name, host_country, event_date);
    return NextResponse.json({ data: { event_id: eventId } }, { status: 201 });
  } catch (err: any) {
    return createProblemDetails(500, "Internal Server Error", err.message);
  }
}
