"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Briefcase, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { logoutUser } from "@/src/services/auth";
import { toast } from "sonner";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const check = () => setIsLoggedIn(Boolean(localStorage.getItem("token")));
    check();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "userRole") check();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // List of routes that require authentication
  const authRequiredRoutes = [
    "/student-dashboard",
    "/faculty-dashboard",
  ];

  const handleLogout = () => {
    const currentPath = pathname || window.location.pathname;
    const isOnAuthRequiredPage = authRequiredRoutes.some(route => 
      currentPath.startsWith(route)
    );
    
    logoutUser();
    setIsLoggedIn(false);
    toast.success("Logged out successfully!!");
    
    // If on an auth-required page, redirect to home
    if (isOnAuthRequiredPage) {
      window.location.href = "/";
    }
  };

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    if (!token) {
      // Not logged in, redirect to login page
      window.location.href = "/login";
      return;
    }

    // Get user role and redirect to appropriate dashboard
    const userRole = localStorage.getItem("userRole");
    if (userRole === "faculty") {
      window.location.href = "/faculty-dashboard";
    } else {
      window.location.href = "/student-dashboard";
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            <Briefcase className="h-6 w-6 text-primary" />
            FreelanceHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Browse Projects
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              How It Works
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="cursor-pointer">
                  Sign In
                </Button>
              </Link>
            )}
            <Button
              variant="hero"
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-md cursor-pointer"
              onClick={handleDashboardClick}
            >
              Go to dashboard
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border pt-4">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Browse Projects
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              How It Works
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              {isLoggedIn ? (
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" className="w-full">
                    Sign In
                  </Button>
                </Link>
              )}
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                onClick={handleDashboardClick}
              >
                Go to dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
