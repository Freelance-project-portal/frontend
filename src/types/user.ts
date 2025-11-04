export interface User {
  _id: string;
  name: string;
  email: string;
  // backend supports student, faculty, business
  role: "student" | "faculty" | "business";
  // flattened profile fields on the model
  skills?: string[];
  interests?: string[];
  academicScore?: number;
  profile?: UserProfile; // optional richer profile
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  bio?: string;
  skills?: string[];
  education?: string;
  experience?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export type ProfileUpdateData = Partial<UserProfile>;