import { authFetch } from "../lib/api";
import { Application, Project } from "../types";

export interface ApplyToProjectData {
  project_id: string;
  cover_letter: string;
  resume_url: string;
}

export interface UpdateApplicationStatusData {
  status: "accepted" | "rejected";
}

export interface UpdateApplicationStatusResponse {
  message: string;
  application: Application;
}

/**
 * Transform MongoDB document to Application format (convert _id to id)
 */
function transformApplication(app: any): Application {
  const transformed: Application = {
    ...app,
    id: app.id || app._id?.toString() || app._id,
    project_id: app.project_id?.toString() || app.project_id,
    student_id: app.student_id?.toString() || app.student_id,
    applied_at: app.applied_at || app.createdAt || app.created_at,
  };

  // Transform nested project if it exists
  if (app.project && typeof app.project === "object") {
    transformed.project = {
      ...app.project,
      id: app.project.id || app.project._id?.toString() || app.project._id,
      faculty_id: app.project.faculty_id?.toString() || app.project.faculty_id,
    } as Project;
  }

  return transformed;
}

/**
 * Apply to a project (student only)
 */
export async function applyToProject(data: ApplyToProjectData): Promise<Application> {
  const application = await authFetch<any>("/applications", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return transformApplication(application);
}

/**
 * Get my applications (student only)
 */
export async function getMyApplications(): Promise<Application[]> {
  const applications = await authFetch<any[]>("/applications/my-applications");
  return applications.map(transformApplication);
}

/**
 * Get applications for a project (faculty only)
 */
export async function getProjectApplications(projectId: string): Promise<Application[]> {
  const applications = await authFetch<any[]>(`/applications/project/${projectId}`);
  return applications.map(transformApplication);
}

/**
 * Update application status (faculty only)
 */
export async function updateApplicationStatus(
  applicationId: string,
  data: UpdateApplicationStatusData
): Promise<UpdateApplicationStatusResponse> {
  const response = await authFetch<any>(`/applications/${applicationId}/status`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return {
    ...response,
    application: transformApplication(response.application),
  };
}
