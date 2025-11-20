import { authFetch } from "../lib/api";
import { Project } from "../types";

export interface RecommendedProject extends Project {
  matchScore: number;
}

/**
 * Get recommended projects for a student
 *
 * The API currently returns items in the shape:
 * [{ project: { ...projectFields }, score: "25.00" }, ...]
 * This function normalizes that into a flat Project-like object so the UI
 * can work with a consistent shape.
 */
export async function getRecommendedProjects(): Promise<RecommendedProject[]> {
  const raw = await authFetch<any[]>("/recommendations");

  return raw.map((item) => {
    const project = item.project ?? item;

    return {
      // Spread project fields first
      ...project,
      // Ensure we always have an `id` field (UI expects this)
      id: project.id ?? project._id,
      // Normalize the score into a numeric matchScore
      matchScore:
        typeof item.matchScore === "number"
          ? item.matchScore
          : item.score
          ? Number(item.score)
          : 0,
    } as RecommendedProject;
  });
}
