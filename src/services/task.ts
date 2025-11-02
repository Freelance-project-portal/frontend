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

export interface TaskCreateData {
  title: string;
  description: string;
  projectId: string;
  dueDate?: string;
  assignedTo?: string;
}

export async function createTask(data: TaskCreateData) {
  try {
    return await authFetch(`/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("createTask error", err);
    throw err;
  }
}

export async function getProjectTasks(projectId: string) {
  try {
    return await authFetch(`/tasks/${projectId}`, { method: "GET" });
  } catch (err) {
    console.error("getProjectTasks error", err);
    throw err;
  }
}

export async function updateTaskStatus(taskId: string, data: { status?: string; feedback?: string }) {
  try {
    return await authFetch(`/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("updateTaskStatus error", err);
    throw err;
  }
}
