import { authFetch } from "../lib/api";

import { TaskCreateData } from "../types/task";

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
