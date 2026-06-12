import { BaseRepository } from "./base";

export class AdminRepository extends BaseRepository {
  async getDashboardStats() {
    const statsSql = `
      SELECT 
        (SELECT COUNT(*) FROM applications) as total_applicants,
        (SELECT COUNT(*) FROM applications WHERE is_complete = false) as incomplete_applications,
        (SELECT AVG(cumulative_gwa) FROM students s JOIN applications a ON s.student_number = a.student_number) as average_gwa
    `;
    const [stats] = await this.query<any[]>(statsSql);
    return stats;
  }

  async getApplicationsByProgram() {
    const sql = `
      SELECT 
        p.program_name,
        p.college_name,
        COUNT(*) as total,
        SUM(CASE WHEN a.is_complete = true THEN 1 ELSE 0 END) as complete_count
      FROM applications a
      JOIN students s ON a.student_number = s.student_number
      JOIN programs p ON s.program_id = p.program_id
      GROUP BY p.program_id, p.program_name, p.college_name
      ORDER BY total DESC
    `;
    return this.query<any[]>(sql);
  }

  async getRecentIncompleteApplications(limit: number = 5) {
    const sql = `
      SELECT 
        a.application_id, s.full_name, p.program_name as program
      FROM applications a
      JOIN students s ON a.student_number = s.student_number
      JOIN programs p ON s.program_id = p.program_id
      WHERE a.is_complete = false
      ORDER BY a.created_at DESC
      LIMIT ?
    `;
    return this.query<any[]>(sql, [limit]);
  }
}
