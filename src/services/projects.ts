import { authFetch } from "../lib/api";
import { Project } from "../types";

export interface CreateProjectData {
  title: string;
  description: string;
  requirements: string;
  skills?: string[];
  max_students?: number;
  deadline?: string;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  requirements?: string;
  skills?: string[];
  max_students?: number;
  deadline?: string;
  status?: "active" | "completed" | "draft" | "closed";
}

export interface GetAllProjectsParams {
  status?: string;
}

/**
 * Get all projects (with optional status filter)
 */
export async function getAllProjects(params?: GetAllProjectsParams): Promise<Project[]> {
  const queryParams = params?.status ? `?status=${params.status}` : "";
  return authFetch<Project[]>(`/projects${queryParams}`);
}

/**
 * Get project by ID
 */
export async function getProjectById(id: string): Promise<Project> {
  return authFetch<Project>(`/projects/${id}`);
}

/**
 * Create a new project (faculty only)
 */
export async function createProject(data: CreateProjectData): Promise<Project> {
  return authFetch<Project>("/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Update a project (faculty only)
 */
export async function updateProject(id: string, data: UpdateProjectData): Promise<Project> {
  return authFetch<Project>(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Get my projects (for both students and faculty)
 */
export async function getMyProjects(): Promise<Project[]> {
  return authFetch<Project[]>("/projects/my-projects");
}

/**
 * Delete a project (faculty only)
 */
export async function deleteProject(id: string): Promise<void> {
  return authFetch<void>(`/projects/${id}`, {
    method: "DELETE",
  });
}