"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useProjectById } from "@/src/hooks/useProjects";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { ArrowLeft, Clock, Calendar, Users, User, FileQuestion } from "lucide-react";
import ProjectStatusBadge from "@/src/components/shared/ProjectStatusBadge";
import { LoadingSpinner } from "@/src/components/shared/LoadingState";
import EmptyState from "@/src/components/shared/EmptyState";
import { useAuth } from "@/src/contexts/AuthContext";
import ApplicationModal from "@/src/components/student/ApplicationModal";

const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

const ProjectDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const projectId = params?.id as string;
  const { data: project, isLoading, error } = useProjectById(projectId);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const handleApplyClick = () => {
    if (!project) return;

    if (!user) {
      toast.info("Please sign in to apply for projects.");
      router.push("/login");
      return;
    }

    if (user.role !== "student") {
      toast.error("Only students can apply to projects.");
      return;
    }

    setIsApplicationModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link href="/projects">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link href="/projects">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <EmptyState
            icon={FileQuestion}
            title="Project Not Found"
            description="The project you're looking for doesn't exist or has been removed."
          />
        </div>
      </div>
    );
  }

  const spotsRemaining = (project.max_students ?? 0) - (project.current_students ?? 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/projects">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <ProjectStatusBadge status={project.status} />
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatRelativeTime(project.created_at)}
                  </span>
                </div>
                <CardTitle className="text-3xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.skills && project.skills.length > 0 ? (
                    project.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No skills specified</span>
                  )}
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Project Requirements</h3>
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-line">
                    {project.requirements || "No specific requirements provided."}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-border sticky top-24">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Students
                  </span>
                  <span className="font-semibold text-primary">
                    {project.current_students ?? 0} / {project.max_students}
                  </span>
                </div>
                
                <Separator />
                
                {project.deadline && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Deadline
                      </span>
                      <span className="font-medium">
                        {new Date(project.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <Separator />
                  </>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Posted
                  </span>
                  <span className="font-medium">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Faculty
                  </span>
                  <span className="font-medium">
                    {project.faculty_name || "Unknown"}
                  </span>
                </div>
                
                <Separator className="my-4" />
                
                <Button className="w-full" size="lg" variant="default" onClick={handleApplyClick}>
                  Apply for Project
                </Button>
                <Button className="w-full" variant="outline">
                  Save for Later
                </Button>
              </CardContent>
            </Card>

            {/* Project Stats */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <ProjectStatusBadge status={project.status} />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Spots Available</span>
                    <span className="font-medium">{spotsRemaining}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Max Students</span>
                    <span className="font-medium">{project.max_students}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Students</span>
                    <span className="font-medium">{project.current_students ?? 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {project && (
        <ApplicationModal
          open={isApplicationModalOpen}
          onOpenChange={setIsApplicationModalOpen}
          projectId={project.id}
          projectTitle={project.title}
        />
      )}
    </div>
  );
};

export default ProjectDetail;