"use client";

import { useState } from "react";
import { useRecentProjects } from "@/src/hooks/useProjects";
import ProjectCard from "@/src/components/student/ProjectCard";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Search, SlidersHorizontal, FolderOpen } from "lucide-react";
import { ProjectGridSkeleton } from "@/src/components/shared/LoadingState";
import EmptyState from "@/src/components/shared/EmptyState";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const { data: projects, isLoading } = useRecentProjects();

  const filteredProjects = projects?.filter((project) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        (project.title ?? "").toLowerCase().includes(query) ||
        (project.description ?? "").toLowerCase().includes(query) ||
        project.skills?.some((skill) => skill.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Category filter (if we add categories to projects later)
    // For now, category filter is not implemented as projects don't have categories
    if (category !== "all") {
      // Category filtering can be added when projects have category field
    }

    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Browse Projects
            </h1>
            <p className="text-muted-foreground">
              Find your next opportunity from thousands of projects
            </p>
          </div>
          <ProjectGridSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Browse Projects
          </h1>
          <p className="text-muted-foreground">
            Find your next opportunity from thousands of projects
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search projects by keyword..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="mobile">Mobile Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-3">
              <Button variant="outline" className="w-full">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredProjects?.length ?? 0}
            </span>{" "}
            {filteredProjects?.length === 1 ? "project" : "projects"}
          </p>
        </div>

        {/* Project Grid */}
        {filteredProjects && filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                appliedStatus="none"
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FolderOpen}
            title="No Projects Found"
            description={
              searchQuery
                ? "Try adjusting your search terms"
                : "No projects available at the moment"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Projects;
