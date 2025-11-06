export type UserRole = 'student' | 'faculty';

export interface User {
  id: string;
  email: string;
  role?: UserRole;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  skills: string[];
  resume_url?: string;
}

export type ProjectStatus = 'active' | 'completed' | 'draft' | 'closed';

export interface Project {
  id: string;
  title: string;
  description: string;
  faculty_id: string;
  faculty_name?: string;
  status: ProjectStatus;
  requirements: string;
  skills: string[];
  max_students: number;
  current_students?: number;
  deadline?: string;
  created_at: string;
  updated_at: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due_date?: string;
  assigned_to?: string;
  assigned_to_name?: string;
  created_at: string;
}

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export interface Application {
  id: string;
  project_id: string;
  student_id: string;
  student_name?: string;
  student_email?: string;
  student_skills?: string[];
  status: ApplicationStatus;
  cover_letter: string;
  resume_url: string;
  applied_at: string;
  project?: Project;
}

export interface ProjectMember {
  id: string;
  project_id: string;
  student_id: string;
  student_name: string;
  student_skills: string[];
  joined_at: string;
  tasks_assigned?: number;
  tasks_completed?: number;
}

export interface DashboardStats {
  total_projects?: number;
  pending_applications?: number;
  active_students?: number;
  completed_projects?: number;
  applications_sent?: number;
  projects_joined?: number;
}


