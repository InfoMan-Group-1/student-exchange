import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import type { Student } from "@/features/students/model";
import type { CreateStudentInput } from "@/features/students/server/schema";

type StudentRow = RowDataPacket & {
  id: number;
  full_name: string;
  email: string;
  destination_country: string;
  created_at: Date;
};

export async function listStudents(): Promise<Student[]> {
  const [rows] = await pool.query<StudentRow[]>(
    `
      SELECT id, full_name, email, destination_country, created_at
      FROM students
      ORDER BY id DESC
    `,
  );

  return rows.map((row) => ({
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    destinationCountry: row.destination_country,
    createdAt: row.created_at.toISOString(),
  }));
}

export async function createStudent(input: CreateStudentInput): Promise<Student> {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      INSERT INTO students (full_name, email, destination_country)
      VALUES (?, ?, ?)
    `,
    [input.fullName, input.email, input.destinationCountry],
  );

  const [rows] = await pool.execute<StudentRow[]>(
    `
      SELECT id, full_name, email, destination_country, created_at
      FROM students
      WHERE id = ?
      LIMIT 1
    `,
    [result.insertId],
  );

  const row = rows[0];

  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    destinationCountry: row.destination_country,
    createdAt: row.created_at.toISOString(),
  };
}
