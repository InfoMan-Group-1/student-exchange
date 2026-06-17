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

  async updateStudent(studentNumber: string, data: Record<string, any>) {
    // Separate guardian data from student data
    const studentAllowedFields = [
      'full_name', 'age', 'nationality', 'sex', 'birth_date', 
      'school_email', 'alternate_email', 'home_address', 
      'mobile_number', 'passport_number', 'passport_issue_date', 
      'passport_expiry_date', 'year_level', 'cumulative_gwa'
    ];
    
    const guardianAllowedFields = [
      'guardian_name', 'guardian_contact_number', 
      'guardian_email', 'relation_to_student', 'guardian_address'
    ];
    
    const studentData: Record<string, any> = {};
    const guardianData: Record<string, any> = {};
    
    for (const key of Object.keys(data)) {
      if (studentAllowedFields.includes(key)) {
        studentData[key] = data[key];
      } else if (guardianAllowedFields.includes(key)) {
        guardianData[key] = data[key];
      }
    }
    
    await repo.updateStudent(studentNumber, studentData);
    
    if (Object.keys(guardianData).length > 0) {
      const student = await repo.getStudentByNumber(studentNumber);
      if (student && student.guardian_id) {
        await repo.updateGuardian(student.guardian_id, guardianData);
      }
    }
    
    return true;
  }

  async updateLanguages(studentNumber: string, languages: { name: string, level: string }[]) {
    await repo.deleteLanguages(studentNumber);
    for (const lang of languages) {
      await repo.insertLanguage(studentNumber, lang.name, lang.level);
    }
    return true;
  }
}
