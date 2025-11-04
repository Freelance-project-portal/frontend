import { authFetch } from "../lib/api";

export async function getFacultyDashboard() {
  try {
    return await authFetch(`/dashboard/faculty`, { method: "GET" });
  } catch (err) {
    console.error("getFacultyDashboard error", err);
    throw err;
  }
}

export async function getStudentDashboard() {
  try {
    return await authFetch(`/dashboard/student`, { method: "GET" });
  } catch (err) {
    console.error("getStudentDashboard error", err);
    throw err;
  }
}
