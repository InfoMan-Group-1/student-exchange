export interface AdminStats {
  totalApplicants: number;
  totalApplicantsChange: string;
  avgAge: number;
  avgAgeStatus: string;
  bestGwa: number;
  bestGwaStatus: string;
  incompleteApps: number;
  incompleteAppsStatus: string;
}

export interface AdminAlert {
  id: string;
  type: "warning" | "info" | "mail";
  title: string;
  description: string;
}

export interface IncompleteApplication {
  studentNumber: string;
  name: string;
  initials: string;
  college: string;
  gwa: number;
  status: string;
  colorTheme: "secondary" | "primary" | "tertiary";
}

export interface ApplicantListEntry {
  studentNumber: string;
  name: string;
  initials: string;
  program: string;
  college: string;
  gwa: number;
  status: "Complete" | "Pending";
  colorTheme: "primary" | "secondary";
}

export interface ApplicationDetailData {
  studentInfo: {
    name: string;
    studentNumber: string;
    course: string;
    status: string;
    email: string;
    contactNumber: string;
    gpa: string;
    homeAddress: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  academicPreferences: Array<{
    priority: string;
    university: string;
    location: string;
    match: string;
  }>;
  documents: Array<{
    name: string;
    status: "Complete" | "Missing";
  }>;
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
}

export interface ApplicantsData {
  applicants: ApplicantListEntry[];
  stats: {
    totalApplicants: number;
    reviewedApplications: number;
    priorityAttention: number;
  };
}

export interface AdminDashboardData {
  stats: AdminStats;
  alerts: AdminAlert[];
  incompleteApplications: IncompleteApplication[];
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    stats: {
      totalApplicants: 20,
      totalApplicantsChange: "+12% vs LY",
      avgAge: 21.5,
      avgAgeStatus: "Stable",
      bestGwa: 1.25,
      bestGwaStatus: "High",
      incompleteApps: 3,
      incompleteAppsStatus: "Action Required",
    },
    alerts: [
      {
        id: "a1",
        type: "warning",
        title: "Document Expiring",
        description: "Passport for Juan Dela Cruz expires in 2 months.",
      },
      {
        id: "a2",
        type: "info",
        title: "New Partner Uni",
        description: "Kyoto University added to the exchange pool.",
      },
      {
        id: "a3",
        type: "mail",
        title: "Message Received",
        description: "Inquiry from College of Engineering regarding slots.",
      },
    ],
    incompleteApplications: [
      {
        studentNumber: "2021-00432-MN-0",
        name: "Maria Santos",
        initials: "MS",
        college: "CAF",
        gwa: 1.45,
        status: "Missing Transcript",
        colorTheme: "secondary",
      },
      {
        studentNumber: "2020-00129-MN-0",
        name: "Ricardo Luna",
        initials: "RL",
        college: "CCIS",
        gwa: 1.30,
        status: "Awaiting Meds",
        colorTheme: "primary",
      },
      {
        studentNumber: "2021-00998-MN-0",
        name: "Elena Javier",
        initials: "EJ",
        college: "CEA",
        gwa: 1.75,
        status: "Invalid Photo",
        colorTheme: "tertiary",
      },
    ],
  };
}

export async function getApplicantsData(): Promise<ApplicantsData> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    applicants: [
      {
        studentNumber: "2021-00123-MN-0",
        name: "Ana Santos",
        initials: "AS",
        program: "Global Scholars Program",
        college: "CCIS",
        gwa: 1.50,
        status: "Complete",
        colorTheme: "primary",
      },
      {
        studentNumber: "2021-00456-MN-0",
        name: "Juan Dela Cruz",
        initials: "JC",
        program: "Asian Exchange Initiative",
        college: "CCIS",
        gwa: 1.75,
        status: "Pending",
        colorTheme: "secondary",
      },
    ],
    stats: {
      totalApplicants: 124,
      reviewedApplications: 86,
      priorityAttention: 8,
    },
  };
}

export async function getApplicationDetail(id: string): Promise<ApplicationDetailData> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    studentInfo: {
      name: "Juan Dela Cruz",
      studentNumber: id,
      course: "BS Computer Engineering",
      status: "UNDER REVIEW",
      email: "j.delacruz@email.com",
      contactNumber: "+63 912 345 6789",
      gpa: "1.25 (President's Lister)",
      homeAddress: "123 Sampaguita St., Brgy. 456, Manila, Philippines 1008",
    },
    emergencyContact: {
      name: "Maria Dela Cruz",
      relationship: "Mother",
      phoneNumber: "+63 998 765 4321",
    },
    academicPreferences: [
      {
        priority: "1st Choice",
        university: "Seoul National University",
        location: "South Korea",
        match: "95% Match",
      },
      {
        priority: "2nd Choice",
        university: "National University of Singapore",
        location: "Singapore",
        match: "88% Match",
      },
    ],
    documents: [
      { name: "Transcript of Records", status: "Complete" },
      { name: "Passport Copy", status: "Complete" },
      { name: "Medical Certificate", status: "Missing" },
      { name: "LOI / Essay", status: "Complete" },
    ],
    languages: [
      { language: "English", proficiency: "ADVANCED (C1)" },
      { language: "Korean", proficiency: "INTERMEDIATE (B1)" },
      { language: "Filipino", proficiency: "NATIVE" },
    ],
  };
}
