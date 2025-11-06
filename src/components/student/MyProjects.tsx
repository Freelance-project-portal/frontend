"use client";

import { useState } from "react";

import { useAuth } from "@/src/contexts/AuthContext";
import { useMyProjects } from "@/src/hooks/useProjects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

import ProjectCard from "./ProjectCard";
import { ProjectGridSkeleton } from "@/src/components/shared/LoadingState";
import EmptyState from "@/src/components/shared/EmptyState";

import { FolderOpen, CheckCircle } from "lucide-react";

const MyProjects = () => {
  const { user } = useAuth();
  const { data: projects, isLoading } = useMyProjects(user?.id || "");

  const activeProjects = projects?.filter((p) => p.status === "active") || [];
  const completedProjects = projects?.filter((p) => p.status === "completed") || [];

  if (isLoading) {
    return <ProjectGridSkeleton />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Projects</h2>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Projects ({activeProjects.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeProjects.length === 0 ? (
            <EmptyState
              icon={FolderOpen}
              title="No Active Projects"
              description="You haven't joined any projects yet. Browse and apply to projects to get started."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProjects.map((project) => (
                <ProjectCard key={project.id} project={project} appliedStatus="accepted" />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedProjects.length === 0 ? (
            <EmptyState
              icon={CheckCircle}
              title="No Completed Projects"
              description="Complete your active projects to see them here."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} appliedStatus="accepted" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyProjects;



