import { authFetch } from "../lib/api";

import { ProjectCreateData } from "../types/project";

export async function getAllProjects(status?: string) {
  try {
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    return await authFetch(`/projects${query}`, { method: "GET" });
  } catch (err) {
    console.error("getAllProjects error", err);
    throw err;
  }
}

export async function createProject(data: ProjectCreateData) {
  try {
    return await authFetch(`/projects`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("createProject error", err);
    throw err;
  }
}

export async function applyToProject(projectId: string) {
  try {
    return await authFetch(`/projects/${projectId}/apply`, { method: "POST" });
  } catch (err) {
    console.error("applyToProject error", err);
    throw err;
  }
}

export async function updateApplicantStatus(projectId: string, applicantId: string, status: string) {
  try {
    return await authFetch(`/projects/${projectId}/applicants/${applicantId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  } catch (err) {
    console.error("updateApplicantStatus error", err);
    throw err;
  }
}

export async function getMyProjects() {
  try {
    return await authFetch(`/projects/my-projects`, { method: "GET" });
  } catch (err) {
    console.error("getMyProjects error", err);
    throw err;
  }
}
