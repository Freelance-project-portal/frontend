import { authFetch } from "../lib/api";
import { Project } from "../types";

export interface RecommendedProject extends Project {
  matchScore: number;
}

/**
 * Get recommended projects for a student
 */
export async function getRecommendedProjects(): Promise<RecommendedProject[]> {
  return authFetch<RecommendedProject[]>("/recommendations");
}
