export interface UniversityChoice {
  preferenceOrder: number;
  universityName: string;
  programName: string;
}

export interface ApplicationDocument {
  id: string;
  documentType: string;
  description: string;
  status: "Pending" | "Uploaded" | "Verified";
}

export interface LanguageProficiency {
  id: string;
  language: string;
  proficiencyLevel: string;
}

export interface ApplicationSignature {
  role: string;
  name: string;
  status: "Awaiting" | "Signed";
}

export interface ApplicationData {
  targetSemester: string;
  duration: string;
  choices: UniversityChoice[];
  documents: ApplicationDocument[];
  languages: LanguageProficiency[];
  signatures: ApplicationSignature[];
}

export async function getMockApplicationData(): Promise<ApplicationData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    targetSemester: "First Semester (August - December)",
    duration: "1 Semester",
    choices: [
      { preferenceOrder: 1, universityName: "Nanyang Technological University", programName: "BS Computer Engineering" },
      { preferenceOrder: 2, universityName: "", programName: "" },
      { preferenceOrder: 3, universityName: "", programName: "" },
    ],
    documents: [
      { id: "d1", documentType: "Official Transcript of Records", description: "Validated by the University Registrar", status: "Uploaded" },
      { id: "d2", documentType: "Certification of Enrollment", description: "Current semester proof of registration", status: "Uploaded" },
      { id: "d3", documentType: "Study Plan / Learning Agreement", description: "Signed by Department Chairperson", status: "Pending" },
      { id: "d4", documentType: "Passport Copy (Data Page)", description: "Valid for at least 12 months", status: "Pending" },
    ],
    languages: [
      { id: "l1", language: "English", proficiencyLevel: "B2 - Upper Intermediate" },
      { id: "l2", language: "Filipino", proficiencyLevel: "C2 - Native / Proficient" },
    ],
    signatures: [
      { role: "Academic Advisor", name: "Dr. Maria Santos", status: "Awaiting" },
      { role: "Department Chair", name: "Prof. Roberto Gomez", status: "Awaiting" },
      { role: "International Affairs Director", name: "Atty. Elena Ruiz", status: "Awaiting" },
    ],
  };
}
