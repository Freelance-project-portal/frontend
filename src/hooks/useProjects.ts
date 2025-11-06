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



