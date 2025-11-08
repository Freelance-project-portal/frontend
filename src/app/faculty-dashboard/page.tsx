"use client";

import { useState } from "react";

import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import ProjectsList from "@/src/components/faculty/ProjectsList";
import CreateProjectModal from "@/src/components/faculty/CreateProjectModal";
import { useAuth } from "@/src/contexts/AuthContext";
import { useFacultyProjects } from "@/src/hooks/useProjects";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";
import { LoadingSpinner } from "@/src/components/shared/LoadingState";
import { Plus, FolderOpen, Send, CheckCircle } from "lucide-react";

const FacultyDashboard = () => {
  // Protect route - require faculty role
  const isChecking = useAuthGuard("faculty");
  
  const { user } = useAuth();
  const { data: projects } = useFacultyProjects(user?.id || "");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const activeProjects = projects?.filter((p) => p.status === "active").length || 0;
  const completedProjects = projects?.filter((p) => p.status === "completed").length || 0;

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Faculty Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your projects, review applications, and collaborate with students
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{projects?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Total Projects</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <FolderOpen className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeProjects}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Send className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Pending Applications</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedProjects}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Projects List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">My Projects</h2>
          <ProjectsList />
        </div>
      </div>

      <CreateProjectModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  );
};

export default FacultyDashboard;


