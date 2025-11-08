import { authFetch } from "../lib/api";
import { Task } from "../types";

export interface CreateTaskData {
  project_id: string;
  title: string;
  description: string;
  assigned_to?: string;
  due_date?: string;
}

export interface UpdateTaskStatusData {
  status: "todo" | "in_progress" | "completed";
}

export interface UpdateTaskAssignmentData {
  assigned_to?: string | null;
}

/**
 * Create a new task (faculty only)
 */
export async function createTask(data: CreateTaskData): Promise<Task> {
  return authFetch<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Get tasks for a project
 */
export async function getProjectTasks(projectId: string): Promise<Task[]> {
  return authFetch<Task[]>(`/tasks/${projectId}`);
}

/**
 * Update task status
 */
export async function updateTaskStatus(
  taskId: string,
  data: UpdateTaskStatusData
): Promise<Task> {
  return authFetch<Task>(`/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Update task assignment (faculty only)
 */
export async function updateTaskAssignment(
  taskId: string,
  data: UpdateTaskAssignmentData
): Promise<Task> {
  return authFetch<Task>(`/tasks/${taskId}/assign`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Delete a task (faculty only)
 */
export async function deleteTask(taskId: string): Promise<void> {
  return authFetch<void>(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}