"use client";

import { useParams, useRouter } from "next/navigation";
import { useProjectById } from "@/src/hooks/useProjects";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import ProjectStatusBadge from "@/src/components/shared/ProjectStatusBadge";
import SkillsBadge from "@/src/components/shared/SkillsBadge";
import TasksManager from "@/src/components/faculty/TasksManager";
import ApplicationsList from "@/src/components/faculty/ApplicationsList";
import TeamMembers from "@/src/components/faculty/TeamMembers";
import { useProjectMembers, useRemoveProjectMember } from "@/src/hooks/useProjectMembers";
import { ArrowLeft, Calendar, Users } from "lucide-react";

const FacultyProjectDetail = () => {
  // Protect route - require faculty role
  const isChecking = useAuthGuard("faculty");
  
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const { data: project, isLoading } = useProjectById(id || "");
  const { data: members } = useProjectMembers(id || "");
  const removeMember = useRemoveProjectMember();

  const handleRemoveMember = (memberId: string) => {
    if (id) {
      removeMember.mutate({ projectId: id, memberId });
    }
  };

  if (isChecking || isLoading) {
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
          <p>Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/faculty-dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Project Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <p className="text-muted-foreground">
                Created {new Date(project.created_at).toLocaleDateString()}
              </p>
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

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Requirements</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {project.requirements}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {project.skills && project.skills.length > 0 ? (
                  project.skills.map((skill, index) => (
                    <SkillsBadge key={index} skill={skill} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No skills specified</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="team">Team Members</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <Card className="p-6">
              <TasksManager
                projectId={project.id}
                projectMembers={members?.map((member) => {
                  // Safely extract student_id as string
                  let studentId = '';
                  if (typeof member.student_id === 'string') {
                    studentId = member.student_id;
                  } else if (member.student_id && typeof member.student_id === 'object') {
                    const studentIdObj = member.student_id as any;
                    studentId = studentIdObj._id?.toString() || studentIdObj.toString() || '';
                  }
                  return {
                    id: studentId,
                    student_name: member.student_name,
                  };
                })}
              />
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="p-6">
              <ApplicationsList
                projectId={project.id}
                projectSkills={project.skills || []}
              />
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card className="p-6">
              <TeamMembers
                projectId={project.id}
                members={members}
                onRemoveMember={handleRemoveMember}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyProjectDetail;

