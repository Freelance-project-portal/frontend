export type Application = {
  id: string;
  project_id?: string;
  status: "pending" | "approved" | "accepted" | "rejected" | "none" | string;
};

export function useMyApplications(userId: string) {
  // Placeholder implementation: return empty list
  return { data: [] as Application[] };
}

type SubmitApplicationInput = {
  project_id: string;
  student_id?: string;
  cover_letter: string;
  resume_url?: string;
  status: "pending" | "approved" | "rejected";
};

export function useSubmitApplication() {
  // Placeholder mutation hook
  return {
    isPending: false,
    mutateAsync: async (_input: SubmitApplicationInput) => {
      // no-op placeholder
      return Promise.resolve();
    },
  };
}


