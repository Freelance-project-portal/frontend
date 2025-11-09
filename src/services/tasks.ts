import { authFetch } from "../lib/api";
import { Task } from "../types";

/**
 * Transform MongoDB _id to id for task objects
 */
function transformTask(task: any): Task {
  const { _id, ...rest } = task;
  return {
    ...rest,
    id: _id || task.id || "",
  } as Task;
}

/**
 * Transform array of tasks
 */
function transformTasks(tasks: any[]): Task[] {
  return tasks.map(transformTask);
}

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

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: "todo" | "in_progress" | "completed";
  due_date?: string | null;
  assigned_to?: string | null;
}

/**
 * Create a new task (faculty only)
 */
export async function createTask(data: CreateTaskData): Promise<Task> {
  const response = await authFetch<any>("/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return transformTask(response);
}

/**
 * Get tasks for a project
 */
export async function getProjectTasks(projectId: string): Promise<Task[]> {
  const response = await authFetch<any[]>(`/tasks/${projectId}`);
  return transformTasks(response);
}

/**
 * Update task status
 */
export async function updateTaskStatus(
  taskId: string,
  data: UpdateTaskStatusData
): Promise<Task> {
  const response = await authFetch<any>(`/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return transformTask(response);
}

/**
 * Update task assignment (faculty only)
 */
export async function updateTaskAssignment(
  taskId: string,
  data: UpdateTaskAssignmentData
): Promise<Task> {
  const response = await authFetch<any>(`/tasks/${taskId}/assign`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return transformTask(response);
}

/**
 * Update task (general update for all fields)
 */
export async function updateTask(
  taskId: string,
  data: UpdateTaskData
): Promise<Task> {
  const response = await authFetch<any>(`/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return transformTask(response);
}

/**
 * Delete a task (faculty only)
 */
export async function deleteTask(taskId: string): Promise<{ message: string; project_id: string }> {
  return authFetch<{ message: string; project_id: string }>(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}