export interface Guardian {
  fullName: string;
  relationship: string;
  contactNumber: string;
  emailAddress: string;
}

export interface Student {
  studentNumber: string;
  fullName: string;
  avatarUrl: string;
  age: number;
  sex: string;
  birthDate: string;
  nationality: string;
  passportNumber: string;
  email: string;
  academicProgram: string;
  gwa: number;
  enrollmentStatus: string;
  permanentAddress: string;
  guardian: Guardian;
}

export interface Application {
  status: string;
  semester: string;
  duration: string;
  documentsUploaded: number;
  documentsTotal: number;
  deadlineDate: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  status: "verified" | "uploaded" | "missing";
  metaText: string;
  isRequired: boolean;
}

export interface UniversityChoice {
  universityName: string;
  location: string;
  assignedProgram: string;
  isPrimary: boolean;
  isReadOnly: boolean;
  imageUrl: string;
}

export interface DashboardData {
  student: Student;
  application: Application;
  checklist: ChecklistItem[];
  primaryChoice: UniversityChoice;
}


