const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

import { RegisterData, LoginData } from "../types/auth";

export async function signUp(data: RegisterData) {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Registration failed");
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function signIn(data: LoginData) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Login failed");

    // save token (if your backend sends one)
    if (result.token) localStorage.setItem("token", result.token);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}
