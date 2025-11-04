export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "student" | "faculty";
}

export interface LoginData {
  email: string;
  password: string;
}