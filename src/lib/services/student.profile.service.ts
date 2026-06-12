import { StudentService } from "./student.service";
import { StudentRepository } from "@/lib/repositories/student.repository";

const repo = new StudentRepository();
const studentService = new StudentService();

export class StudentProfileService {
  async getStudentNumberByUserId(userId: number): Promise<string | null> {
    return repo.getStudentNumberByUserId(userId);
  }

  async getProfile(userId: number) {
    const studentNumber = await this.getStudentNumberByUserId(userId);
    if (!studentNumber) throw new Error("Student profile not found for this user.");
    return studentService.getStudent(studentNumber);
  }

  async updateProfile(userId: number, data: Record<string, any>) {
    const studentNumber = await this.getStudentNumberByUserId(userId);
    if (!studentNumber) throw new Error("Student profile not found for this user.");
    return studentService.updateStudent(studentNumber, data);
  }

  async getLanguages(userId: number) {
    const studentNumber = await this.getStudentNumberByUserId(userId);
    if (!studentNumber) throw new Error("Student profile not found for this user.");
    return repo.getLanguages(studentNumber);
  }

  async addLanguage(userId: number, name: string, level: string) {
    const studentNumber = await this.getStudentNumberByUserId(userId);
    if (!studentNumber) throw new Error("Student profile not found for this user.");
    return repo.insertLanguage(studentNumber, name, level);
  }

  async removeLanguage(userId: number, name: string) {
    const studentNumber = await this.getStudentNumberByUserId(userId);
    if (!studentNumber) throw new Error("Student profile not found for this user.");
    const sql = `DELETE FROM student_languages WHERE student_number = ? AND language_name = ?`;
    await (repo as any).query(sql, [studentNumber, name]);
    return true;
  }
}
