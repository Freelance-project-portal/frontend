import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  applyToProject,
  getMyApplications,
  getProjectApplications,
  updateApplicationStatus,
  type ApplyToProjectData,
} from '@/src/services/applications';
import { toast } from 'sonner';

export function useMyApplications(studentId: string) {
  return useQuery({
    queryKey: ['my-applications', studentId],
    queryFn: () => getMyApplications(),
    enabled: !!studentId,
  });
}

export function useProjectApplications(projectId: string) {
  return useQuery({
    queryKey: ['project-applications', projectId],
    queryFn: () => getProjectApplications(projectId),
    enabled: !!projectId,
  });
}

export function useSubmitApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicationData: ApplyToProjectData) =>
      applyToProject(applicationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-applications'] });
      toast.success('Application submitted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit application');
    },
  });
}

export function useAcceptApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicationId: string) =>
      updateApplicationStatus(applicationId, { status: 'accepted' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-applications'] });
      toast.success('Application accepted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to accept application');
    },
  });
}

export function useRejectApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicationId: string) =>
      updateApplicationStatus(applicationId, { status: 'rejected' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-applications'] });
      toast.success('Application rejected');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to reject application');
    },
  });
}
