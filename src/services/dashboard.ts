import { authFetch } from "../lib/api";
import { DashboardStats } from "../types";

/**
 * Get faculty dashboard stats
 */
export async function getFacultyDashboard(): Promise<DashboardStats> {
  return authFetch<DashboardStats>("/dashboard/faculty");
}

/**
 * Get student dashboard stats
 */
export async function getStudentDashboard(): Promise<DashboardStats> {
  return authFetch<DashboardStats>("/dashboard/student");
}
