"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useProjectById } from "@/src/hooks/useProjects";
import { useMyApplications } from "@/src/hooks/useApplications";
import { useProjectMembers } from "@/src/hooks/useProjectMembers";
import { useProjectTasks } from "@/src/hooks/useTasks";
import { useAuth } from "@/src/contexts/AuthContext";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Skeleton } from "@/src/components/ui/skeleton";
import ProjectStatusBadge from "@/src/components/shared/ProjectStatusBadge";
import SkillsBadge from "@/src/components/shared/SkillsBadge";
import SkillsMatch from "@/src/components/shared/SkillsMatch";
import StudentTaskList from "@/src/components/student/StudentTaskList";
import { ArrowLeft, Calendar, Users, User } from "lucide-react";
import { calculateSkillMatch, getMatchedSkills } from "@/src/lib/recommendations";
import ApplicationModal from "@/src/components/student/ApplicationModal";
import EmptyState from "@/src/components/shared/EmptyState";
import { FileQuestion } from "lucide-react";

const StudentProjectDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { user, profile } = useAuth();
  const id = params.id as string;

  const { data: project, isLoading } = useProjectById(id || "");
  const { data: applications } = useMyApplications(user?.id || "");
  const { data: projectMembers, error: membersError } = useProjectMembers(id || "");
  const { data: tasks } = useProjectTasks(id || "");
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const application = applications?.find((app) => app.project_id === id);
  
  // Check if the current user is already a member of the project
  // If the API returns 403, it means the user is not a member
  // If it succeeds, check if user ID is in the members list
  const isMember = projectMembers?.some(
    (member) => member.student_id === user?.id
  ) || false;

  // Fallback: if user has tasks assigned, they should be able to see them
  // This handles edge cases where membership check might fail but tasks exist
  const hasAssignedTasks = tasks?.some((task) => {
    let assignedTo: string | null = null;
    if (typeof task.assigned_to === 'string') {
      assignedTo = task.assigned_to;
    } else if (task.assigned_to && typeof task.assigned_to === 'object') {
      const assignedToObj = task.assigned_to as any;
      assignedTo = assignedToObj._id?.toString() || assignedToObj.toString() || null;
    }
    return assignedTo === user?.id;
  }) || false;

  // Show tasks if user is a member OR has assigned tasks
  const shouldShowTasks = isMember || hasAssignedTasks;

  const isAccepted = application?.status === "accepted";
  const isPending = application?.status === "pending";
  const isRejected = application?.status === "rejected";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <EmptyState
            icon={FileQuestion}
            title="Project Not Found"
            description="The project you're looking for doesn't exist or has been removed."
          />
        </div>
      </div>
    );
  }

  const skillMatch = calculateSkillMatch(profile?.skills || [], project.skills || []);
  const { matched, unmatched } = getMatchedSkills(profile?.skills || [], project.skills || []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/student-dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                  <p className="text-muted-foreground">By {project.faculty_name || "Faculty"}</p>
                </div>
                <ProjectStatusBadge status={project.status} />
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                {project.deadline && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {project.current_students || 0} / {project.max_students} students
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3">Requirements</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{project.requirements}</p>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {project.skills?.map((skill, index) => (
                    <SkillsBadge key={index} skill={skill} />
                  ))}
                </div>
              </div>
            </Card>

            {/* Tasks (if member or has assigned tasks) */}
            {shouldShowTasks && (
              <Card className="p-6">
                <StudentTaskList projectId={project.id} />
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {/* Skills Match Card */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Your Skills Match</h3>
              <SkillsMatch
                matchPercentage={skillMatch}
                matchedSkills={matched}
                unmatchedSkills={unmatched}
              />
            </Card>

            {/* Faculty Card */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Faculty</p>
                  <p className="font-semibold">{project.faculty_name || "Faculty Member"}</p>
                </div>
              </div>
            </Card>

            {/* Application Status / Action */}
            <Card className="p-6">
              {!application && !isMember && (
                <Button onClick={() => setShowApplicationModal(true)} className="w-full">
                  Apply to Project
                </Button>
              )}

              {isMember && (
                <div className="text-center">
                  <Badge variant="default" className="mb-2">
                    Project Member
                  </Badge>
                  <p className="text-sm text-muted-foreground">You are part of this project</p>
                </div>
              )}

              {isPending && !isMember && (
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">
                    Application Pending
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Your application is under review
                  </p>
                </div>
              )}

              {isAccepted && !isMember && (
                <div className="text-center">
                  <Badge variant="default" className="mb-2">
                    Accepted
                  </Badge>
                  <p className="text-sm text-muted-foreground">You are part of this project</p>
                </div>
              )}

              {isRejected && !isMember && (
                <div className="text-center">
                  <Badge variant="destructive" className="mb-2">
                    Application Rejected
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Unfortunately, your application was not accepted
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {showApplicationModal && (
        <ApplicationModal
          open={showApplicationModal}
          onOpenChange={setShowApplicationModal}
          projectId={project.id}
          projectTitle={project.title}
        />
      )}
    </div>
  );
};

export default StudentProjectDetail;

