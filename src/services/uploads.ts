import { BASE_URL } from "@/src/lib/api";
import { getToken } from "./auth";

export interface UploadResumeResponse {
  url: string;
  public_id: string;
  bytes: number;
  format: string;
}

export async function uploadResume(file: File): Promise<UploadResumeResponse> {
  const token = getToken();
  if (!token) {
    throw new Error("Please sign in to upload a resume.");
  }

  const formData = new FormData();
  formData.append("resume", file);

  const res = await fetch(`${BASE_URL}/uploads/resume`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error((data && data.message) || "Failed to upload resume");
  }

  return data as UploadResumeResponse;
}


