import { NextResponse } from "next/server";
import {
  createStudent,
  listStudents,
} from "@/features/students/server/repository";
import { createStudentSchema } from "@/features/students/server/schema";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = createStudentSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request payload.", errors: parsedBody.error.format() },
        { status: 400 },
      );
    }

    const createdStudent = await createStudent(parsedBody.data);
    return NextResponse.json(createdStudent, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create student." },
      { status: 500 },
    );
  }
}
