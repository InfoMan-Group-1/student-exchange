import { StudentRepository } from "@/lib/repositories/student.repository";

const repo = new StudentRepository();

export class StudentService {
  async listStudents(limit: number, startingAfter?: string | null) {
    const students = await repo.getStudents(limit, startingAfter);
    
    let hasMore = false;
    let nextCursor = null;
    
    if (Array.isArray(students) && students.length === limit) {
      const lastStudentNum = students[students.length - 1].student_number;
      const hasNext = await repo.checkNext(limit, lastStudentNum);
      if (hasNext) {
        hasMore = true;
        nextCursor = lastStudentNum;
      }
    }

    return {
      object: "list",
      has_more: hasMore,
      next_cursor: nextCursor,
      data: students
    };
  }

  async getStudent(studentNumber: string) {
    const student = await repo.getStudentByNumber(studentNumber);
    if (!student) {
      return null;
    }

    const guardian = await repo.getGuardianById(student.guardian_id);
    const languages = await repo.getLanguages(studentNumber);

    return {
      ...student,
      guardian,
      languages
    };
  }
}
