"use client";

import Link from "next/link";

import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Calendar, Users } from "lucide-react";

import SkillsBadge from "../shared/SkillsBadge";
import ProjectStatusBadge from "../shared/ProjectStatusBadge";

type ProjectShape = {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  faculty_name?: string;
  skills?: string[];
  deadline?: string | null;
  max_students?: number;
  current_students?: number;
};

interface ProjectCardProps {
  project: ProjectShape;
  onApply?: () => void;
  appliedStatus?: "none" | "pending" | "accepted" | "rejected" | string;
}

const ProjectCard = ({ project, onApply, appliedStatus = "none" }: ProjectCardProps) => {
  const spotsRemaining = (project.max_students ?? 0) - (project.current_students ?? 0);
  const isFull = spotsRemaining <= 0;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 truncate">{project.title}</h3>
            <p className="text-sm text-muted-foreground">By {project.faculty_name || "Faculty"}</p>
          </div>
          <ProjectStatusBadge status={project.status ?? "open"} />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.skills?.slice(0, 3).map((skill, index) => (
            <SkillsBadge key={index} skill={skill} />
          ))}
          {project.skills && project.skills.length > 3 && (
            <Badge variant="outline">+{project.skills.length - 3} more</Badge>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {project.deadline && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(project.deadline).toLocaleDateString()}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {spotsRemaining} spots left
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href={appliedStatus === "accepted" ? `/student/projects/${project.id}` : `/projects/${project.id}`}>
              View Details
            </Link>
          </Button>

          {appliedStatus === "none" && !isFull && onApply && (
            <Button onClick={onApply} className="flex-1">
              Apply Now
            </Button>
          )}

          {appliedStatus === "pending" && (
            <Button disabled className="flex-1">
              Pending
            </Button>
          )}

          {appliedStatus === "accepted" && (
            <Button disabled variant="secondary" className="flex-1">
              Accepted
            </Button>
          )}

          {appliedStatus === "rejected" && (
            <Button disabled variant="destructive" className="flex-1">
              Rejected
            </Button>
          )}

          {isFull && appliedStatus === "none" && (
            <Button disabled className="flex-1">
              Full
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;


