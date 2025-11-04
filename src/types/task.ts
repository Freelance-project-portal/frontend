export interface TaskCreateData {
  title: string;
  description: string;
  projectId: string;
  dueDate?: string;
  assignedTo?: string;
}

export interface Task {
  _id: string;
  project: string | { _id: string; title?: string };
  title: string;
  description?: string;
  assignedTo?: { _id: string; name?: string; email?: string } | string;
  status: "pending" | "in-progress" | "done";
  dueDate?: string | null;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}