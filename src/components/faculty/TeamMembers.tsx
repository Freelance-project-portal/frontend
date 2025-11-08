"use client";

import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import EmptyState from "@/src/components/shared/EmptyState";
import SkillsBadge from "@/src/components/shared/SkillsBadge";
import { Users, UserMinus } from "lucide-react";
import type { ProjectMember } from "@/src/types";

interface TeamMembersProps {
  projectId: string;
  members?: ProjectMember[];
  onRemoveMember?: (memberId: string) => void;
}

const TeamMembers = ({ projectId, members = [], onRemoveMember }: TeamMembersProps) => {
  if (!members || members.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No Team Members Yet"
        description="Accepted students will appear here as team members."
      />
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Team Members ({members.length})</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => {
          const initials = member.student_name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          return (
            <Card key={member.id} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{member.student_name}</h3>
                    <p className="text-xs text-muted-foreground">
                      Joined {new Date(member.joined_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {member.student_skills && member.student_skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {member.student_skills.slice(0, 3).map((skill, index) => (
                      <SkillsBadge key={index} skill={skill} variant="outline" />
                    ))}
                    {member.student_skills.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{member.student_skills.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Tasks: {member.tasks_completed || 0}/{member.tasks_assigned || 0}
                  </span>
                </div>

                {onRemoveMember && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveMember(member.id)}
                    className="w-full text-destructive hover:text-destructive"
                  >
                    <UserMinus className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TeamMembers;

