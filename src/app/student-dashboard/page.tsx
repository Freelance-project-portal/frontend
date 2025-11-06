"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Card } from "@/src/components/ui/card";

import ProjectBrowser from "@/src/components/student/ProjectBrowser";
import MyProjects from "@/src/components/student/MyProjects";
import RecommendedProjects from "@/src/components/student/RecommendedProjects";
import ApplicationModal from "@/src/components/student/ApplicationModal";

import { useAuth } from "@/src/contexts/AuthContext";
import { useMyApplications } from "@/src/hooks/useApplications";
import { useMyProjects } from "@/src/hooks/useProjects";

import { FolderOpen, Send, CheckCircle } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();

  const { data: applications } = useMyApplications(user?.id || "");
  const { data: myProjects } = useMyProjects(user?.id || "");

  const [selectedProject, setSelectedProject] = useState<{ id: string; title: string } | null>(null);

  const pendingApplications =
    applications?.filter((app: { status: string }) => app.status === "pending").length || 0;
  const activeProjects =
    myProjects?.filter((p: { status: string }) => p.status === "active").length || 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">Discover projects, track your applications, and manage your work</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeProjects}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Send className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingApplications}</p>
                <p className="text-sm text-muted-foreground">Pending Applications</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{applications?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recommended Projects Section */}
        <div className="mb-8">
          <RecommendedProjects onApply={(projectId: string) => setSelectedProject({ id: projectId, title: "Project" })} />
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="browse">Browse Projects</TabsTrigger>
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <ProjectBrowser />
          </TabsContent>
          <TabsContent value="my-projects">
            <MyProjects />
          </TabsContent>
        </Tabs>
      </div>

      {selectedProject && (
        <ApplicationModal
          open={!!selectedProject}
          onOpenChange={(open: boolean) => !open && setSelectedProject(null)}
          projectId={selectedProject.id}
          projectTitle={selectedProject.title}
        />
      )}
    </div>
  );
};

export default StudentDashboard;


