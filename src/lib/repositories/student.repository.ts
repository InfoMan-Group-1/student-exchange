import { BaseRepository } from "./base";

export class StudentRepository extends BaseRepository {
  async getStudents(limit: number, startingAfter?: string | null) {
    let sql = `
      SELECT 
        s.student_number, s.full_name, s.cumulative_gwa, s.year_level, s.school_email,
        p.program_name as program, p.college_name as college
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

    return this.query<any[]>(sql, values);
  }

  async checkNext(limit: number, lastStudentNumber: string) {
    const nextSql = `SELECT student_number FROM students WHERE student_number > ? ORDER BY student_number ASC LIMIT 1`;
    const nextCheck = await this.query<any[]>(nextSql, [lastStudentNumber]);
    return nextCheck && nextCheck.length > 0;
  }

  async getStudentByNumber(studentNumber: string) {
    const studentSql = `
      SELECT 
        s.*,
        p.program_name as program, p.college_name as college
      FROM students s
      JOIN programs p ON s.program_id = p.program_id
      WHERE s.student_number = ?
    `;
    const students = await this.query<any[]>(studentSql, [studentNumber]);
    return students.length > 0 ? students[0] : null;
  }

  async getGuardianById(guardianId: string) {
    const sql = `SELECT * FROM guardians WHERE guardian_id = ?`;
    const guardians = await this.query<any[]>(sql, [guardianId]);
    return guardians.length > 0 ? guardians[0] : null;
  }

  async getLanguages(studentNumber: string) {
    const sql = `
      SELECT language_name, proficiency_level
      FROM student_languages
      WHERE student_number = ?
    `;
    return this.query<any[]>(sql, [studentNumber]);
  }
}
