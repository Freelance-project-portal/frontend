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
 * Transform MongoDB document to Project format (convert _id to id)
 */
function transformProject(project: any): Project {
  return {
    ...project,
    id: project.id || project._id,
  };
}

/**
 * Get all projects (with optional status filter)
 */
export async function getAllProjects(params?: GetAllProjectsParams): Promise<Project[]> {
  const queryParams = params?.status ? `?status=${params.status}` : "";
  const projects = await authFetch<any[]>(`/projects${queryParams}`);
  return projects.map(transformProject);
}

/**
 * Get project by ID
 */
export async function getProjectById(id: string): Promise<Project> {
  const project = await authFetch<any>(`/projects/${id}`);
  return transformProject(project);
}

/**
 * Create a new project (faculty only)
 */
export async function createProject(data: CreateProjectData): Promise<Project> {
  const project = await authFetch<any>("/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return transformProject(project);
}

/**
 * Update a project (faculty only)
 */
export async function updateProject(id: string, data: UpdateProjectData): Promise<Project> {
  const project = await authFetch<any>(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return transformProject(project);
}

/**
 * Get my projects (for both students and faculty)
 */
export async function getMyProjects(): Promise<Project[]> {
  const projects = await authFetch<any[]>("/projects/my-projects");
  return projects.map(transformProject);
}

/**
 * Delete a project (faculty only)
 */
export async function deleteProject(id: string): Promise<void> {
  return authFetch<void>(`/projects/${id}`, {
    method: "DELETE",
  });
}