"use client";

import { Badge } from '@/src/components/ui/badge';
import { X } from 'lucide-react';

interface SkillsBadgeProps {
  skill: string;
  variant?: 'default' | 'secondary' | 'outline';
  onRemove?: () => void;
}

const SkillsBadge = ({ skill, variant = 'secondary', onRemove }: SkillsBadgeProps) => {
  return (
    <Badge variant={variant} className="gap-1">
      {skill}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:bg-foreground/20 rounded-full p-0.5"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
};

export default SkillsBadge;



