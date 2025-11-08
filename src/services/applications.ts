import { authFetch } from "../lib/api";
import { Application } from "../types";

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
 * Apply to a project (student only)
 */
export async function applyToProject(data: ApplyToProjectData): Promise<Application> {
  return authFetch<Application>("/applications", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Get my applications (student only)
 */
export async function getMyApplications(): Promise<Application[]> {
  return authFetch<Application[]>("/applications/my-applications");
}

/**
 * Get applications for a project (faculty only)
 */
export async function getProjectApplications(projectId: string): Promise<Application[]> {
  return authFetch<Application[]>(`/applications/project/${projectId}`);
}

/**
 * Update application status (faculty only)
 */
export async function updateApplicationStatus(
  applicationId: string,
  data: UpdateApplicationStatusData
): Promise<UpdateApplicationStatusResponse> {
  return authFetch<UpdateApplicationStatusResponse>(`/applications/${applicationId}/status`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
