import { NextResponse } from "next/server";
import { listStudents } from "@/features/students/server/repository";

export async function GET() {
  try {
    const students = await listStudents();
    return NextResponse.json(students);
  } catch {
    return NextResponse.json(
      { message: "Failed to load students." },
      { status: 500 },
    );
  }
}
