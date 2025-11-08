import { authFetch } from "../lib/api";
import { Profile } from "../types";

export interface GetMeResponse {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface UpdateProfileData {
  full_name?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  skills?: string[];
  resume_url?: string;
}

/**
 * Get authenticated user info
 */
export async function getMe(): Promise<GetMeResponse> {
  return authFetch<GetMeResponse>("/user/me");
}

/**
 * Get user profile
 */
export async function getProfile(): Promise<Profile> {
  return authFetch<Profile>("/user/profile");
}

/**
 * Update user profile
 */
export async function updateProfile(data: UpdateProfileData): Promise<Profile> {
  return authFetch<Profile>("/user/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
