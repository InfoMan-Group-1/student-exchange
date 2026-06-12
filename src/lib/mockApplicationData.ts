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


