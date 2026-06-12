import { ApplicationRepository } from "@/lib/repositories/application.repository";
import { StudentProfileService } from "./student.profile.service";
import { pool } from "@/lib/db";

const appRepo = new ApplicationRepository();
const profileService = new StudentProfileService();

export class StudentApplicationService {
  async getDashboard(userId: number) {
    const studentNumber = await profileService.getStudentNumberByUserId(userId);
    if (!studentNumber) throw new Error("Student not found.");

    // Find the latest application for this student
    const sql = `
      SELECT * FROM applications 
      WHERE student_number = ? 
      ORDER BY created_at DESC LIMIT 1
    `;
    const [rows] = await (appRepo as any).query(sql, [studentNumber]);
    if (!rows || rows.length === 0) return null;

    const application = rows[0];
    const choices = await appRepo.getUniversityChoices(application.application_id);

    return {
      ...application,
      university_choices: choices
    };
  }

  async createApplication(userId: number, data: Record<string, any>) {
    const studentNumber = await profileService.getStudentNumberByUserId(userId);
    if (!studentNumber) throw new Error("Student not found.");

    // Generate a simple application ID (in a real app, use a better ID generator)
    const appId = `APP-${Date.now()}`;
    
    const sql = `
      INSERT INTO applications (
        application_id, student_number, semester_preference, duration_preference
      ) VALUES (?, ?, ?, ?)
    `;
    await (appRepo as any).query(sql, [
      appId, 
      studentNumber, 
      data.semester_preference || '1st Semester', 
      data.duration_preference || '1 Semester'
    ]);

    return { applicationId: appId };
  }

  async updateApplication(userId: number, data: Record<string, any>) {
    const dashboard = await this.getDashboard(userId);
    if (!dashboard) throw new Error("No active application found.");

    await appRepo.updateApplication(dashboard.application_id, data);
    return true;
  }

  async updateUniversityChoices(userId: number, choices: { rank: number, name: string }[]) {
    const dashboard = await this.getDashboard(userId);
    if (!dashboard) throw new Error("No active application found.");

    // We'll map choices dropping any "program" since UI should be aligned to database
    const mappedChoices = choices.map(c => ({ rank: c.rank, name: c.name }));
    
    await appRepo.deleteUniversityChoices(dashboard.application_id);
    for (const choice of mappedChoices) {
      await appRepo.insertUniversityChoice(dashboard.application_id, choice.rank, choice.name);
    }
    return true;
  }
}
