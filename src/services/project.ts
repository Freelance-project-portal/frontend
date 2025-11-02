const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
import { getToken } from "./auth";

async function authFetch(path: string, opts: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, { ...opts, headers });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error((body && body.message) || res.statusText || "Request failed");
  return body;
}

export interface ProjectCreateData {
  title: string;
  description: string;
  skillsRequired: string[];
  budget?: number;
  deadline?: string;
}

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
