import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProjectMembers,
  removeProjectMember,
} from '@/src/services/projectMembers';
import { toast } from 'sonner';

/**
 * Get project members for a project
 */
export function useProjectMembers(projectId: string) {
  return useQuery({
    queryKey: ['project-members', projectId],
    queryFn: () => getProjectMembers(projectId),
    enabled: !!projectId,
  });
}

/**
 * Remove a member from a project (faculty only)
 */
export function useRemoveProjectMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, memberId }: { projectId: string; memberId: string }) =>
      removeProjectMember(projectId, memberId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['project-members', variables.projectId] });
      toast.success('Member removed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to remove member');
    },
  });
}

