"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useRecentProjects } from "@/src/hooks/useProjects";
import { useMyApplications } from "@/src/hooks/useApplications";
import { useAuth } from "@/src/contexts/AuthContext";

import ProjectCard from "./ProjectCard";
import ProjectSearchBar from "./ProjectSearchBar";

import { ProjectGridSkeleton } from "@/src/components/shared/LoadingState";
import EmptyState from "@/src/components/shared/EmptyState";

import { FolderOpen } from "lucide-react";

import ApplicationModal from "./ApplicationModal";

const ProjectBrowser = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { data: projects, isLoading } = useRecentProjects();
  const { data: applications } = useMyApplications(user?.id || "");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<{ id: string; title: string } | null>(null);

  const handleApplyClick = (projectId: string, projectTitle: string) => {
    if (!user) {
      toast.info("Please sign in to apply for projects.");
      router.push("/login");
      return;
    }

    if (user.role !== "student") {
      toast.error("Only students can apply to projects.");
      return;
    }

    setSelectedProject({ id: projectId, title: projectTitle });
  };

  const getApplicationStatus = (projectId: string) => {
    const application = applications?.find((app) => app.project_id === projectId);
    if (!application) return "none";
    return application.status as string;
  };

  const filteredProjects = projects?.filter((project) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (project.title ?? "").toLowerCase().includes(query) ||
      (project.description ?? "").toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return <ProjectGridSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Browse Projects</h2>
        <ProjectSearchBar onSearch={setSearchQuery} />
      </div>

      {filteredProjects && filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              appliedStatus={getApplicationStatus(project.id)}
              onApply={() => handleApplyClick(project.id, project.title ?? "Project")}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FolderOpen}
          title="No Projects Found"
          description={searchQuery ? "Try adjusting your search terms" : "No projects available at the moment"}
        />
      )}

      {selectedProject && (
        <ApplicationModal
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
          projectId={selectedProject.id}
          projectTitle={selectedProject.title}
        />
      )}
    </div>
  );
};

export default ProjectBrowser;



