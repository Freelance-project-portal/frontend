import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllProjects,
  getProjectById,
  getMyProjects,
  createProject,
  updateProject,
  deleteProject,
  type CreateProjectData,
  type UpdateProjectData,
} from '@/src/services/projects';
import { getRecommendedProjects } from '@/src/services/recommendations';
import { toast } from 'sonner';

export type StudentProject = {
  id: string;
  title?: string;
  description?: string;
  status: "active" | "completed" | "archived";
  skills?: string[];
};

export function useRecommendedProjects(_userId: string) {
  return useQuery({
    queryKey: ['recommended-projects', _userId],
    queryFn: () => getRecommendedProjects(),
    enabled: !!_userId,
  });
}

export function useRecentProjects() {
  return useQuery({
    queryKey: ['recent-projects'],
    queryFn: () => getAllProjects(),
  });
}

export function useMyProjects(_userId: string) {
  return useQuery({
    queryKey: ['my-projects', _userId],
    queryFn: () => getMyProjects(),
    enabled: !!_userId,
  });
}

export function useFacultyProjects(_facultyId: string) {
  return useQuery({
    queryKey: ['faculty-projects', _facultyId],
    queryFn: () => getMyProjects(),
    enabled: !!_facultyId,
  });
}

export function useProjectById(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });
}

export function useSearchProjects(query: string, filters?: { status?: string }) {
  return useQuery({
    queryKey: ['search-projects', query, filters],
    queryFn: () => getAllProjects(filters),
    enabled: query.length > 0,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectData: CreateProjectData) => createProject(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculty-projects'] });
      queryClient.invalidateQueries({ queryKey: ['recent-projects'] });
      toast.success('Project created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create project');
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectData }) =>
      updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculty-projects'] });
      queryClient.invalidateQueries({ queryKey: ['project'] });
      toast.success('Project updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update project');
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faculty-projects'] });
      toast.success('Project deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete project');
    },
  });
}

