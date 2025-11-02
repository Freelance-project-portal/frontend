const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
import { getToken } from "./auth";

async function authFetch(path: string, opts: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, { ...opts, headers });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error((body && body.message) || res.statusText || "Request failed");
  return body;
}

export async function getMe() {
  try {
    return await authFetch(`/user/me`, { method: "GET" });
  } catch (err) {
    console.error("getMe error", err);
    throw err;
  }
}

export async function getFacultyUserDashboard() {
  try {
    return await authFetch(`/user/faculty/dashboard`, { method: "GET" });
  } catch (err) {
    console.error("getFacultyUserDashboard error", err);
    throw err;
  }
}

export async function getProjectsManage() {
  try {
    return await authFetch(`/user/projects/manage`, { method: "GET" });
  } catch (err) {
    console.error("getProjectsManage error", err);
    throw err;
  }
}

export async function updateProfile(data: Record<string, any>) {
  try {
    return await authFetch(`/user/profile`, { method: "PUT", body: JSON.stringify(data) });
  } catch (err) {
    console.error("updateProfile error", err);
    throw err;
  }
}
