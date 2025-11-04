import { authFetch } from "../lib/api";

export async function getRecommendedProjects() {
  try {
    return await authFetch(`/recommendations`, { method: "GET" });
  } catch (err) {
    console.error("getRecommendedProjects error", err);
    throw err;
  }
}
