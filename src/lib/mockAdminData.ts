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
  application_id: string;
  student_number: string;
  full_name: string;
  semester_preference: string | null;
  duration_preference: string | null;
  program: string;
  college: string;
  cumulative_gwa: number;
  is_complete: boolean;
  colorTheme: "primary" | "secondary";
}

export interface ApplicationDetailData {
  application_id: string;
  student_number: string;
  is_complete: boolean;
  has_application_form: boolean;
  has_cv: boolean;
  has_tcg: boolean;
  has_recommendation_letter: boolean;
  has_essay: boolean;
  has_form_5: boolean;
  has_valid_passport: boolean;
  has_online_application_form: boolean;
  
  full_name: string;
  school_email: string;
  mobile_number: string;
  home_address: string;
  cumulative_gwa: number;
  program: string;
  college: string;

  guardian_name: string;
  relationship: string;
  guardian_contact_number: string;

  university_choices: Array<{
    university_choice_rank: number;
    university_name: string;
  }>;
  languages: Array<{
    language_name: string;
    proficiency_level: string;
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
        application_id: "APP001",
        student_number: "2021-00123-MN-0",
        full_name: "Ana Santos",
        semester_preference: "1st Semester",
        duration_preference: "1 Term",
        program: "Global Scholars Program",
        college: "CCIS",
        cumulative_gwa: 1.50,
        is_complete: true,
        colorTheme: "primary",
      },
      {
        application_id: "APP002",
        student_number: "2021-00456-MN-0",
        full_name: "Juan Dela Cruz",
        semester_preference: "2nd Semester",
        duration_preference: "1 Year",
        program: "Asian Exchange Initiative",
        college: "CCIS",
        cumulative_gwa: 1.75,
        is_complete: false,
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
    application_id: id,
    student_number: "2020-00123-MN-0",
    is_complete: false,
    has_application_form: true,
    has_cv: true,
    has_tcg: false,
    has_recommendation_letter: true,
    has_essay: true,
    has_form_5: true,
    has_valid_passport: true,
    has_online_application_form: true,
    
    full_name: "Juan Dela Cruz",
    school_email: "j.delacruz@email.com",
    mobile_number: "+63 912 345 6789",
    home_address: "123 Sampaguita St., Brgy. 456, Manila, Philippines 1008",
    cumulative_gwa: 1.25,
    program: "BS Computer Engineering",
    college: "CCIS",
  
    guardian_name: "Maria Dela Cruz",
    relationship: "Mother",
    guardian_contact_number: "+63 998 765 4321",
  
    university_choices: [
      {
        university_choice_rank: 1,
        university_name: "Seoul National University",
      },
      {
        university_choice_rank: 2,
        university_name: "National University of Singapore",
      },
    ],
    languages: [
      { language_name: "English", proficiency_level: "ADVANCED (C1)" },
      { language_name: "Korean", proficiency_level: "INTERMEDIATE (B1)" },
      { language_name: "Filipino", proficiency_level: "NATIVE" },
    ],
  };
}
