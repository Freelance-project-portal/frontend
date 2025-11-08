"use client";

import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { useAcceptApplication, useRejectApplication } from "@/src/hooks/useApplications";
import type { Application } from "@/src/types";
import SkillsBadge from "@/src/components/shared/SkillsBadge";
import SkillsMatch from "@/src/components/shared/SkillsMatch";
import { Calendar, Download, User } from "lucide-react";
import { calculateSkillMatch, getMatchedSkills } from "@/src/lib/recommendations";

interface ApplicationCardProps {
  application: Application;
  projectSkills: string[];
}

const ApplicationCard = ({ application, projectSkills }: ApplicationCardProps) => {
  const acceptApplication = useAcceptApplication();
  const rejectApplication = useRejectApplication();

  const studentSkills = application.student_skills || [];
  const skillMatch = calculateSkillMatch(studentSkills, projectSkills);
  const { matched, unmatched } = getMatchedSkills(studentSkills, projectSkills);

  const handleAccept = () => {
    acceptApplication.mutate(application.id);
  };

  const handleReject = () => {
    rejectApplication.mutate(application.id);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">
                {application.student_name || "Student"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {application.student_email}
              </p>
            </div>
          </div>
          <Badge
            variant={
              application.status === "pending"
                ? "secondary"
                : application.status === "accepted"
                ? "default"
                : "destructive"
            }
          >
            {application.status}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Applied {new Date(application.applied_at).toLocaleDateString()}
        </div>

        {studentSkills.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {studentSkills.map((skill, index) => (
                <SkillsBadge key={`${skill}-${index}`} skill={skill} variant="outline" />
              ))}
            </div>
          </div>
        )}

        <SkillsMatch
          matchPercentage={skillMatch}
          matchedSkills={matched}
          unmatchedSkills={unmatched}
        />

        <div>
          <p className="text-sm font-medium mb-2">Cover Letter</p>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {application.cover_letter}
          </p>
        </div>

        {application.resume_url && (
          <Button variant="outline" className="w-full" asChild>
            <a
              href={application.resume_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </a>
          </Button>
        )}

        {application.status === "pending" && (
          <div className="flex gap-2">
            <Button
              onClick={handleAccept}
              disabled={acceptApplication.isPending}
              className="flex-1"
            >
              {acceptApplication.isPending ? "Accepting..." : "Accept"}
            </Button>
            <Button
              onClick={handleReject}
              disabled={rejectApplication.isPending}
              variant="destructive"
              className="flex-1"
            >
              {rejectApplication.isPending ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ApplicationCard;

