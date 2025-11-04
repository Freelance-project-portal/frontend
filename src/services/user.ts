import { authFetch } from "../lib/api";

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

import { User, ProfileUpdateData } from "../types/user";
import { ApiResponse } from "../types/api";

export async function updateProfile(data: ProfileUpdateData) {
  try {
    return await authFetch(`/user/profile`, { method: "PUT", body: JSON.stringify(data) });
  } catch (err) {
    console.error("updateProfile error", err);
    throw err;
  }
}
