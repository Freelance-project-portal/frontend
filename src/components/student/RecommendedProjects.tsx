"use client";

import { useMemo } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRecommendedProjects } from "@/src/hooks/useProjects";
import ProjectCard from "./ProjectCard";
import { ProjectCardSkeleton } from "@/src/components/shared/LoadingState";
import EmptyState from "@/src/components/shared/EmptyState";
import { Lightbulb } from "lucide-react";
import { calculateSkillMatch } from "@/src/lib/recommendations";

interface RecommendedProjectsProps {
  onApply: (projectId: string) => void;
}

const RecommendedProjects = ({ onApply }: RecommendedProjectsProps) => {
  const { user, profile } = useAuth();
  const { data: projects, isLoading } = useRecommendedProjects(user?.id || "");

  // Calculate match percentages and get top 3 projects
  const topProjects = useMemo(() => {
    if (!projects || !profile?.skills || projects.length === 0) {
      return [];
    }

    // Calculate match percentage for each project
    const projectsWithMatch = projects.map((project) => ({
      project,
      matchPercentage: calculateSkillMatch(profile.skills || [], project.skills || []),
    }));

    // Sort by match percentage (descending) and take top 3
    const sorted = projectsWithMatch
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 3);

    // Only return projects if at least one has > 50% match
    const hasGoodMatch = sorted.some((item) => item.matchPercentage > 50);
    
    return hasGoodMatch ? sorted.map((item) => item.project) : [];
  }, [projects, profile?.skills]);

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!topProjects || topProjects.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
        <EmptyState
          icon={Lightbulb}
          title="No Recommendations Yet"
          description="Update your profile with skills to get personalized project recommendations."
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Recommended for You</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topProjects.map((project) => (
          <ProjectCard key={project.id} project={project as any} onApply={() => onApply(project.id)} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProjects;
