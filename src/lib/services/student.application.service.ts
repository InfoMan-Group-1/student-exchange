import { ApplicationRepository } from "@/lib/repositories/application.repository";
import { StudentProfileService } from "./student.profile.service";
import { pool } from "@/lib/db";

const appRepo = new ApplicationRepository();
const profileService = new StudentProfileService();

export class StudentApplicationService {
  async getDashboard(userId: number) {
    const studentNumber = await profileService.getStudentNumberByUserId(userId);
    if (!studentNumber) throw new Error("Student not found.");

    // Find the latest application for this student.
    // NOTE: BaseRepository.query() already destructures the pool.execute() tuple
    // and returns a plain array — do NOT destructure again.
    const sql = `
      SELECT * FROM applications 
      WHERE student_number = ? 
      ORDER BY created_at DESC LIMIT 1
    `;
    const results = await (appRepo as any).query(sql, [studentNumber]);
    if (!results || results.length === 0) return null;

    const application = results[0];
    const choices = await appRepo.getUniversityChoices(application.application_id);

    return {
      ...application,
      university_choices: choices
    };
  }

  async createApplication(userId: number, data: Record<string, any>) {
    const studentNumber = await profileService.getStudentNumberByUserId(userId);
    if (!studentNumber) throw new Error("Student not found.");

    // Check if the student already has an application
    const existing = await this.getDashboard(userId);
    if (existing) throw new Error("Student already has an active application.");

    // Generate next APP-style ID matching seed pattern: APP001, APP002, …
    const appId = await appRepo.getNextApplicationId();

    const sql = `
      INSERT INTO applications (
        application_id, student_number, semester_preference, duration_preference,
        program_advisor, department_chair, college_secretary, dean_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await (appRepo as any).query(sql, [
      appId,
      studentNumber,
      data.semester_preference || 'Spring',
      data.duration_preference || '1 Semester',
      data.program_advisor || null,
      data.department_chair || null,
      data.college_secretary || null,
      data.dean_name || null,
    ]);

    if (data.choices && Array.isArray(data.choices)) {
      const mappedChoices = data.choices.map((c: any) => ({ rank: c.rank, name: c.name }));
      for (const choice of mappedChoices) {
        if (choice.name) {
          await appRepo.insertUniversityChoice(appId, choice.rank, choice.name);
        }
      }
    }

    return { applicationId: appId };
  }

  async updateApplication(userId: number, data: Record<string, any>) {
    const dashboard = await this.getDashboard(userId);
    if (!dashboard) throw new Error("No active application found.");

    const merged = { ...dashboard, ...data };
    const requiredDocs = [
      "has_application_form", "has_cv", "has_tcg", "has_recommendation_letter",
      "has_essay", "has_form_5", "has_valid_passport", "has_online_application_form"
    ];

    // If any document fields are being updated, evaluate completeness
    const isDocUpdate = requiredDocs.some(k => Object.keys(data).includes(k));
    if (isDocUpdate) {
      data.is_complete = requiredDocs.every(k => !!merged[k]);
    }

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
