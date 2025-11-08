import { authFetch } from "../lib/api";
import { ProjectMember } from "../types";

/**
 * Get project members for a project
 */
export async function getProjectMembers(projectId: string): Promise<ProjectMember[]> {
  return authFetch<ProjectMember[]>(`/projects/${projectId}/members`);
}

/**
 * Remove a member from a project (faculty only)
 */
export async function removeProjectMember(projectId: string, memberId: string): Promise<void> {
  return authFetch<void>(`/projects/${projectId}/members/${memberId}`, {
    method: "DELETE",
  });
}

