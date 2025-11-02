const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
import { getToken } from "./auth";

async function authFetch(path: string, opts: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(opts.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, { ...opts, headers });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error((body && body.message) || res.statusText || "Request failed");
  return body;
}

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
