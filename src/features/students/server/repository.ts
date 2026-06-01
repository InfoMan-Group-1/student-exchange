import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import type { Student } from "@/features/students/model";

type StudentRow = RowDataPacket & {
  student_number: string;
  full_name: string;
  program_id: string;
  guardian_id: string;
  age: number | null;
  nationality: string | null;
  school_email: string | null;
  cumulative_gwa: number | null;
};

export async function listStudents(): Promise<Student[]> {
  const [rows] = await pool.query<StudentRow[]>(
    `
      SELECT
        student_number,
        full_name,
        program_id,
        guardian_id,
        age,
        nationality,
        school_email,
        cumulative_gwa
      FROM students
      ORDER BY student_number
    `,
  );

  return rows.map((row) => ({
    studentNumber: row.student_number,
    fullName: row.full_name,
    programId: row.program_id,
    guardianId: row.guardian_id,
    age: row.age,
    nationality: row.nationality,
    schoolEmail: row.school_email,
    cumulativeGwa: row.cumulative_gwa,
  }));
}
