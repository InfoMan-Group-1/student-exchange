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

  async updateStudent(studentNumber: string, data: Record<string, any>) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(", ");
    const values = Object.values(data);
    
    if (fields.length === 0) return true;
    
    values.push(studentNumber);
    const sql = `UPDATE students SET ${fields} WHERE student_number = ?`;
    await this.query(sql, values);
    return true;
  }

  async updateGuardian(guardianId: string, data: Record<string, any>) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(", ");
    const values = Object.values(data);
    
    if (fields.length === 0) return true;
    
    values.push(guardianId);
    const sql = `UPDATE guardians SET ${fields} WHERE guardian_id = ?`;
    await this.query(sql, values);
    return true;
  }

  async deleteLanguages(studentNumber: string) {
    const sql = `DELETE FROM student_languages WHERE student_number = ?`;
    await this.query(sql, [studentNumber]);
    return true;
  }

  async insertLanguage(studentNumber: string, name: string, level: string) {
    const sql = `
      INSERT INTO student_languages (student_number, language_name, proficiency_level) 
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE proficiency_level = VALUES(proficiency_level)
    `;
    await this.query(sql, [studentNumber, name, level]);
    return true;
  }

  async getStudentNumberByUserId(userId: number): Promise<string | null> {
    const sql = `SELECT student_number FROM students WHERE user_id = ?`;
    const rows = await this.query<any[]>(sql, [userId]);
    if (rows.length > 0) {
      return rows[0].student_number;
    }
    return null;
  }

  /**
   * Returns the next sequential guardian ID following the Gxxx pattern.
   * Queries the highest existing ID and increments it (G001 → G002)
   */
  async getNextGuardianId(): Promise<string> {
    const sql = `
      SELECT guardian_id 
      FROM guardians 
      WHERE guardian_id LIKE 'G%' 
      ORDER BY CAST(SUBSTRING(guardian_id, 2) AS UNSIGNED) DESC 
      LIMIT 1
    `;
    const rows = await this.query<any[]>(sql);
    if (!rows || rows.length === 0) return 'G001';
    
    const last: string = rows[0].guardian_id; 
    const num = parseInt(last.replace(/^G/, ''), 10);
    const next = isNaN(num) ? 1 : num + 1;
    
    // e.g. next=20 -> G020
    return `G${String(next).padStart(3, '0')}`;
  }
}
