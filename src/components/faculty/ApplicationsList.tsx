"use client";

import { useState } from "react";
import { useProjectApplications } from "@/src/hooks/useApplications";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import ApplicationCard from "./ApplicationCard";
import { ProjectCardSkeleton } from "@/src/components/shared/LoadingState";
import EmptyState from "@/src/components/shared/EmptyState";
import { Inbox } from "lucide-react";
import type { ApplicationStatus } from "@/src/types";

interface ApplicationsListProps {
  projectId: string;
  projectSkills: string[];
}

const ApplicationsList = ({ projectId, projectSkills }: ApplicationsListProps) => {
  const { data: applications, isLoading } = useProjectApplications(projectId);
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");

  const filteredApplications =
    applications?.filter((app) => (filter === "all" ? true : app.status === filter)) || [];

  const pendingCount = applications?.filter((app) => app.status === "pending").length || 0;
  const acceptedCount = applications?.filter((app) => app.status === "accepted").length || 0;
  const rejectedCount = applications?.filter((app) => app.status === "rejected").length || 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Applications</h2>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All ({applications?.length || 0})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedCount})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter}>
          {filteredApplications.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No Applications"
              description={
                filter === "all"
                  ? "No applications received yet"
                  : `No ${filter} applications`
              }
            />
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application, index) => (
                <ApplicationCard
                  key={application.id || `application-${index}`}
                  application={application}
                  projectSkills={projectSkills}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationsList;

