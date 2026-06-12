import { NextRequest, NextResponse } from "next/server";
import { EventRepository } from "@/lib/repositories/event.repository";
import { StudentRepository } from "@/lib/repositories/student.repository";
import { verifyAuthToken, createProblemDetails } from "@/lib/api-utils";

const repo = new EventRepository();
const studentRepo = new StudentRepository();

// GET /api/v1/events/me — events attended by the current student
export async function GET(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "student") return createProblemDetails(403, "Forbidden", "Student access required.");

  try {
    const studentNumber = await studentRepo.getStudentNumberByUserId(user.userId);
    if (!studentNumber) return createProblemDetails(404, "Not Found", "Student profile not found.");

    const events = await repo.getEventsForStudent(studentNumber);
    return NextResponse.json({ data: events });
  } catch (err: any) {
    return createProblemDetails(500, "Internal Server Error", err.message);
  }
}

// POST /api/v1/events/me — mark attendance at an event
export async function POST(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "student") return createProblemDetails(403, "Forbidden", "Student access required.");

  try {
    const { event_id } = await req.json();
    if (!event_id) return createProblemDetails(400, "Bad Request", "Missing event_id.");

    const studentNumber = await studentRepo.getStudentNumberByUserId(user.userId);
    if (!studentNumber) return createProblemDetails(404, "Not Found", "Student profile not found.");

    await repo.markAttended(studentNumber, event_id);
    return NextResponse.json({ message: "Event attendance recorded." }, { status: 201 });
  } catch (err: any) {
    return createProblemDetails(500, "Internal Server Error", err.message);
  }
}

// DELETE /api/v1/events/me?event_id=xxx — remove attendance
export async function DELETE(req: NextRequest) {
  const user = verifyAuthToken(req);
  if (!user || user.role !== "student") return createProblemDetails(403, "Forbidden", "Student access required.");

  try {
    const { searchParams } = new URL(req.url);
    const event_id = searchParams.get("event_id");
    if (!event_id) return createProblemDetails(400, "Bad Request", "Missing event_id query parameter.");

    const studentNumber = await studentRepo.getStudentNumberByUserId(user.userId);
    if (!studentNumber) return createProblemDetails(404, "Not Found", "Student profile not found.");

    await repo.removeAttendance(studentNumber, event_id);
    return NextResponse.json({ message: "Event attendance removed." });
  } catch (err: any) {
    return createProblemDetails(500, "Internal Server Error", err.message);
  }
}
