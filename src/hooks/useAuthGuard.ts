import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/src/services/auth";
import { getMe } from "@/src/services/user";

type Role = "student" | "faculty";

/**
 * Hook to protect routes based on authentication and role
 * @param requiredRole - The role required to access the route
 */
export function useAuthGuard(requiredRole: Role) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      const userRole = localStorage.getItem("userRole") as Role | null;

      // If not authenticated, redirect to login
      if (!token) {
        router.push("/login");
        return;
      }

      // Verify role from API if available, otherwise use localStorage
      try {
        const userInfo = await getMe();
        const apiRole = userInfo.user.role as Role;
        
        // Update localStorage with API role if different
        if (apiRole !== userRole) {
          localStorage.setItem("userRole", apiRole);
        }

        // If wrong role, redirect to correct dashboard
        if (apiRole !== requiredRole) {
          if (apiRole === "faculty") {
            router.push("/faculty-dashboard");
          } else {
            router.push("/student-dashboard");
          }
          return;
        }
      } catch (error) {
        // If API call fails, fall back to localStorage
        console.error("Failed to verify user role:", error);
        
        if (userRole && userRole !== requiredRole) {
          if (userRole === "faculty") {
            router.push("/faculty-dashboard");
          } else {
            router.push("/student-dashboard");
          }
          return;
        }

        // If no role stored and API fails, redirect to login
        if (!userRole) {
          router.push("/login");
          return;
        }
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router, requiredRole]);

  return isChecking;
}

