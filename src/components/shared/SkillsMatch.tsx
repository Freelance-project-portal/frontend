"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { CheckCircle, XCircle } from "lucide-react";

interface SkillsMatchProps {
  matchPercentage: number;
  matchedSkills?: string[];
  unmatchedSkills?: string[];
}

const SkillsMatch = ({
  matchPercentage,
  matchedSkills,
  unmatchedSkills,
}: SkillsMatchProps) => {
  const getColor = () => {
    if (matchPercentage >= 70) return "text-green-600";
    if (matchPercentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Skills Match</span>
              <span className={`text-sm font-bold ${getColor()}`}>
                {matchPercentage}%
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
              <div
                className={`h-full transition-all ${
                  matchPercentage >= 70
                    ? "bg-green-600"
                    : matchPercentage >= 40
                    ? "bg-yellow-600"
                    : "bg-red-600"
                }`}
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>
        </TooltipTrigger>
        {(matchedSkills?.length || unmatchedSkills?.length) && (
          <TooltipContent side="bottom" className="max-w-xs">
            {matchedSkills && matchedSkills.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-semibold mb-1 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  Matched Skills:
                </p>
                <p className="text-xs">{matchedSkills.join(", ")}</p>
              </div>
            )}
            {unmatchedSkills && unmatchedSkills.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-1 flex items-center gap-1">
                  <XCircle className="h-3 w-3 text-red-600" />
                  Missing Skills:
                </p>
                <p className="text-xs">{unmatchedSkills.join(", ")}</p>
              </div>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SkillsMatch;

