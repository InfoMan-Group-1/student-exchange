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

export async function getStudentDashboardData(): Promise<DashboardData> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    student: {
      studentNumber: "2021-00458-MN-0", // Updated to match profile wireframe
      fullName: "Juan Alberto S. Dela Cruz",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBCHd_sLp1Rpp9yAY4i6IXqSQbylsIe_Xq0gDDTsgmeG431FlTvf7BqpeVildLXf4vdAT020MDuf_Se9Bt5EzcFNs-Wc3Rw9xhfOpwHcFzMN07JRWDEbVoXlZ9lD2z3t-d95w9hbRRRG0G-B0L4sdv2WbQblClstAD2cSaGQ8A2EhElsTF7xWna0ht5qZMQMoX5X7j4vYqptG6S2MUxdTaef1oDyfTvoY4hS1EgSeI5pfoRPzMNQLYk_0EtAr9lOL1uSq87S6Wacw4P",
      age: 21,
      sex: "Male",
      birthDate: "2002-05-14",
      nationality: "Filipino",
      passportNumber: "",
      email: "ja.delacruz@student.pup.edu.ph",
      academicProgram: "BS Information Technology — CCIS",
      gwa: 1.25,
      enrollmentStatus: "REGULAR",
      permanentAddress: "123 Sta. Mesa St., Sampaloc, Manila, 1008, Philippines",
      guardian: {
        fullName: "Maria Dela Cruz",
        relationship: "Mother",
        contactNumber: "917 123 4567",
        emailAddress: "",
      },
    },
    application: {
      status: "Submitted",
      semester: "Spring",
      duration: "1 Sem",
      documentsUploaded: 6,
      documentsTotal: 8,
      deadlineDate: "2023-10-30",
    },
    checklist: [
      {
        id: "cv",
        title: "Curriculum Vitae (CV)",
        status: "uploaded",
        metaText: "Uploaded on Oct 12, 2023",
        isRequired: true,
      },
      {
        id: "tcg",
        title: "Transcript of Records (TCG)",
        status: "verified",
        metaText: "Verified by Registrar",
        isRequired: true,
      },
      {
        id: "recommendation",
        title: "Recommendation Letter",
        status: "verified",
        metaText: "From Dean Santos",
        isRequired: true,
      },
      {
        id: "language",
        title: "Language Proficiency Test",
        status: "missing",
        metaText: "Missing Attachment",
        isRequired: true,
      },
      {
        id: "essay",
        title: "Study Plan / Essay",
        status: "missing",
        metaText: "Required for NUS",
        isRequired: true,
      },
    ],
    primaryChoice: {
      universityName: "National University of Singapore",
      location: "Queenstown, Singapore",
      assignedProgram: "School of Computing: CS Exchange",
      isPrimary: true,
      isReadOnly: true,
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBx3m_e11W6gJdFpMtTTbUA75_kAMdYeNkN-38ib1YUFNGWquzPzYa5cbATnnQY-ROeacXAmCrBkjVdn60CzlmoBNZLIhuOt0MwT52rLbdABNRRU8zPHj-YIj-KrfaaRnMbL7BA_hQiAuvwmm5EtoD51UXb2LUKfdHtvj8YR0FIm6qmIKr5l1FMh-a4HFiMx8BmZwvpQbxTixWTh8HnKa2avnDC5V7V1uh2kIMkaalzs4m70dIv-IdrRDs5dOoFBgH2Sk54-7ZqfLww",
    },
  };
}
