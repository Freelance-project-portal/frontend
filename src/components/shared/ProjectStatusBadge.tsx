"use client";

import { Badge } from "@/src/components/ui/badge";
import { CheckCircle, Clock, FileText, XCircle } from "lucide-react";

type ProjectStatus = "active" | "completed" | "draft" | "closed" | string;

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

const ProjectStatusBadge = ({ status }: ProjectStatusBadgeProps) => {
  const statusConfig = {
    active: {
      label: "Active",
      icon: Clock,
      variant: "default" as const,
    },
    completed: {
      label: "Completed",
      icon: CheckCircle,
      variant: "secondary" as const,
    },
    draft: {
      label: "Draft",
      icon: FileText,
      variant: "outline" as const,
    },
    closed: {
      label: "Closed",
      icon: XCircle,
      variant: "destructive" as const,
    },
  } as const;

  const config = (statusConfig as Record<string, { label: string; icon: any; variant: "default" | "secondary" | "outline" | "destructive" }>)[status] ??
    { label: status, icon: FileText, variant: "outline" as const };
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export default ProjectStatusBadge;


