import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProjectTasks,
  createTask,
  updateTaskStatus,
  updateTaskAssignment,
  deleteTask,
  type CreateTaskData,
  type UpdateTaskStatusData,
  type UpdateTaskAssignmentData,
} from '@/src/services/tasks';
import { toast } from 'sonner';

/**
 * Get tasks for a project
 */
export function useProjectTasks(projectId: string) {
  return useQuery({
    queryKey: ['project-tasks', projectId],
    queryFn: () => getProjectTasks(projectId),
    enabled: !!projectId,
  });
}

/**
 * Create a new task (faculty only)
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskData: CreateTaskData) => createTask(taskData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['project-tasks', variables.project_id] });
      toast.success('Task created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create task');
    },
  });
}

/**
 * Update task status
 */
export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskStatusData }) =>
      updateTaskStatus(taskId, data),
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: ['project-tasks', task.project_id] });
      toast.success('Task status updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update task status');
    },
  });
}

/**
 * Update task assignment (faculty only)
 */
export function useUpdateTaskAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskAssignmentData }) =>
      updateTaskAssignment(taskId, data),
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: ['project-tasks', task.project_id] });
      toast.success('Task assignment updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update task assignment');
    },
  });
}

/**
 * Delete a task (faculty only)
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-tasks'] });
      toast.success('Task deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete task');
    },
  });
}

