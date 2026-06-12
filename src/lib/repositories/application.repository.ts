import { BaseRepository } from "./base";

export class ApplicationRepository extends BaseRepository {
  async getApplications(limit: number, startingAfter?: string | null, isComplete?: boolean | null) {
    let sql = `
      SELECT 
        a.application_id, a.student_number, a.semester_preference, a.duration_preference, a.is_complete,
        s.full_name, s.cumulative_gwa, p.program_name as program, p.college_name as college
      FROM applications a
      JOIN students s ON a.student_number = s.student_number
      JOIN programs p ON s.program_id = p.program_id
      WHERE 1=1
    `;
    const values: any[] = [];

    if (isComplete !== null && isComplete !== undefined) {
      sql += ` AND a.is_complete = ?`;
      values.push(isComplete);
    }

    if (startingAfter) {
      sql += ` AND a.application_id > ?`;
      values.push(startingAfter);
    }

    sql += ` ORDER BY a.application_id ASC LIMIT ?`;
    values.push(limit);

    return this.query<any[]>(sql, values);
  }

  async checkNext(limit: number, lastApplicationId: string) {
    const nextSql = `SELECT application_id FROM applications WHERE application_id > ? ORDER BY application_id ASC LIMIT 1`;
    const nextCheck = await this.query<any[]>(nextSql, [lastApplicationId]);
    return nextCheck && nextCheck.length > 0;
  }

  async getApplicationById(id: string) {
    const applicationSql = `
      SELECT 
        a.*,
        s.full_name, s.age, s.nationality, s.sex, s.birth_date, s.school_email, s.alternate_email, 
        s.home_address, s.mobile_number, s.passport_number, s.passport_issue_date, s.passport_expiry_date,
        s.year_level, s.cumulative_gwa, s.guardian_id,
        p.program_name as program, p.college_name as college
      FROM applications a
      JOIN students s ON a.student_number = s.student_number
      JOIN programs p ON s.program_id = p.program_id
      WHERE a.application_id = ?
    `;
    const applications = await this.query<any[]>(applicationSql, [id]);
    return applications.length > 0 ? applications[0] : null;
  }

  async getUniversityChoices(applicationId: string) {
    const choicesSql = `
      SELECT university_choice_rank, university_name
      FROM university_choices
      WHERE application_id = ?
      ORDER BY university_choice_rank ASC
    `;
    return this.query<any[]>(choicesSql, [applicationId]);
  }

  async updateApplication(applicationId: string, data: Record<string, any>) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(", ");
    const values = Object.values(data);
    
    if (fields.length === 0) return true; // Nothing to update
    
    values.push(applicationId);
    const sql = `UPDATE applications SET ${fields} WHERE application_id = ?`;
    await this.query(sql, values);
    return true;
  }

  async deleteUniversityChoices(applicationId: string) {
    const sql = `DELETE FROM university_choices WHERE application_id = ?`;
    await this.query(sql, [applicationId]);
    return true;
  }

  async insertUniversityChoice(applicationId: string, rank: number, name: string) {
    const sql = `INSERT INTO university_choices (application_id, university_choice_rank, university_name) VALUES (?, ?, ?)`;
    await this.query(sql, [applicationId, rank, name]);
    return true;
  }

  /**
   * Returns the next sequential application ID following the APPxxx seed pattern.
   * Queries the highest existing ID and increments it (APP001 → APP002 → APP020, etc.)
   */
  async getNextApplicationId(): Promise<string> {
    const sql = `SELECT application_id FROM applications ORDER BY application_id DESC LIMIT 1`;
    const rows = await this.query<any[]>(sql);
    if (!rows || rows.length === 0) return 'APP001';
    const last: string = rows[0].application_id; // e.g. "APP019"
    const num = parseInt(last.replace(/^APP/, ''), 10);
    const next = isNaN(num) ? 1 : num + 1;
    return `APP${String(next).padStart(3, '0')}`;
  }

  /**
   * Fetches language proficiencies for a student — used when building the full
   * application detail object returned to the admin.
   */
  async getLanguagesForStudent(studentNumber: string) {
    const sql = `SELECT language_name, proficiency_level FROM student_languages WHERE student_number = ?`;
    return this.query<any[]>(sql, [studentNumber]);
  }
}
