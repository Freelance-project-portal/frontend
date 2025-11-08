"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMe, getProfile } from "@/src/services/user";
import { getToken } from "@/src/services/auth";
import { Profile } from "@/src/types";

export type AuthUser = {
  id: string;
  email: string;
  role?: string;
  name?: string;
} | null;

type AuthContextValue = {
  user: AuthUser;
  profile: Profile | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  isLoading: true,
  refetch: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    const token = getToken();
    
    if (!token) {
      setUser(null);
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      // Fetch user info
      const userResponse = await getMe();
      const userData = userResponse.user;
      
      setUser({
        id: userData.id,
        email: userData.email,
        role: userData.role,
      });

      // Fetch profile (may fail if profile doesn't exist yet)
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        // Profile might not exist yet, that's okay
        console.log("Profile not found:", error);
        setProfile(null);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();

    // Listen for storage changes (e.g., logout in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        fetchUserData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        refetch: fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
