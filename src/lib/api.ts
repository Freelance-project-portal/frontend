const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
import { getToken } from "../services/auth";

export async function authFetch<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
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

export { BASE_URL };