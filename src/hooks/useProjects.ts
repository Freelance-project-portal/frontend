export type StudentProject = {
  id: string;
  title?: string;
  description?: string;
  status: "active" | "completed" | "archived";
  skills?: string[];
};

export function useMyProjects(userId: string) {
  // Placeholder implementation: return empty list and loading=false
  return { data: [] as StudentProject[], isLoading: false };
}

export function useRecentProjects() {
  // Placeholder implementation: return empty list and loading=false
  return { data: [] as StudentProject[], isLoading: false };
}

export function useRecommendedProjects(_userId: string) {
  // Placeholder implementation: return empty list and loading=false
  return { data: [] as StudentProject[], isLoading: false };
}


export type FacultyProject = {
  id: string;
  title?: string;
  description?: string;
  status: "active" | "completed" | "archived";
  applicantsCount?: number;
};

export function useFacultyProjects(_userId: string) {
  // Placeholder implementation for faculty projects
  return { data: [] as FacultyProject[], isLoading: false };
}

// Placeholder create-project hook to integrate with CreateProjectModal
export function useCreateProject() {
  return {
    isPending: false,
    async mutateAsync(_payload: any) {
      // no-op placeholder
      return Promise.resolve({ success: true });
    },
  };
}

// Placeholder delete-project hook
export function useDeleteProject() {
  return {
    isPending: false,
    async mutateAsync(_projectId: string) {
      // no-op placeholder
      return Promise.resolve({ success: true });
    },
  };
}

// Placeholder update-project hook
export function useUpdateProject() {
  return {
    isPending: false,
    async mutateAsync(_payload: { id: string; data: any }) {
      // no-op placeholder
      return Promise.resolve({ success: true });
    },
  };
}



