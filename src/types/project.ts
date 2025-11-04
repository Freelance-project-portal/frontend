export interface ProjectCreateData {
  title: string;
  description: string;
  skillsRequired: string[];
  budget?: number;
  deadline?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  skillsRequired: string[];
  budget?: number;
  // deadline is stored as a Date in backend; serialized as ISO string
  deadline?: string | null;
  status: "open" | "in-progress" | "completed";
  // createdBy is populated in controllers as an object with name/role/email or an id
  createdBy: { _id: string; name?: string; role?: string; email?: string } | string;
  applicants: ProjectApplicant[];
  assignedTo?: { _id: string; name?: string; email?: string } | string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectApplicant {
  _id?: string;
  // student may be populated as a user object or be an id string
  student: { _id: string; name?: string; email?: string } | string;
  status: "applied" | "accepted" | "rejected";
}