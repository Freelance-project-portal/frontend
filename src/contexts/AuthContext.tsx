"use client";

import { createContext, useContext } from "react";

export type AuthUser = {
  id: string;
  name?: string;
  email?: string;
} | null;

type UserProfile = {
  skills?: string[];
} | null;

type AuthContextValue = {
  user: AuthUser;
  profile: UserProfile;
};

const AuthContext = createContext<AuthContextValue>({ user: { id: "" }, profile: { skills: [] } });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Placeholder: expose an empty user and basic profile; replace when real auth is available
  return <AuthContext.Provider value={{ user: { id: "" }, profile: { skills: [] } }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);



