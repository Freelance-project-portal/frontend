import { Card } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MoreVertical, Edit, Trash2, Users, ListTodo, Send } from 'lucide-react';
import Link from 'next/link';
import ProjectStatusBadge from '@/src/components/shared/ProjectStatusBadge';
import SkillsBadge from '@/src/components/shared/SkillsBadge';

type ProjectLike = any;

interface FacultyProjectCardProps {
  project: ProjectLike;
  onEdit?: () => void;
  onDelete?: () => void;
  applicationCount?: number;
}

const FacultyProjectCard = ({
  project,
  onEdit,
  onDelete,
  applicationCount = 0,
}: FacultyProjectCardProps) => {
  const hasNewApplications = applicationCount > 0;
  const projectId = project?.id ?? project?._id;
  const createdAt = project?.created_at ?? project?.createdAt;
  const skills: string[] = project?.skills ?? project?.skillsRequired ?? [];

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 truncate">{project?.title}</h3>
            <p className="text-sm text-muted-foreground">
              Created {createdAt ? new Date(createdAt).toLocaleDateString() : '—'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ProjectStatusBadge status={project?.status} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {project?.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill: string, index: number) => (
            <SkillsBadge key={index} skill={skill} variant="outline" />
          ))}
          {skills.length > 3 && (
            <Badge variant="outline">+{skills.length - 3}</Badge>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm font-medium">
              <Users className="h-4 w-4" />
              {(project?.current_students ?? 0)}/{project?.max_students ?? 0}
            </div>
            <p className="text-xs text-muted-foreground">Students</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm font-medium relative">
              <Send className="h-4 w-4" />
              {applicationCount}
              {hasNewApplications && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">Applications</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm font-medium">
              <ListTodo className="h-4 w-4" />
              0
            </div>
            <p className="text-xs text-muted-foreground">Tasks</p>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link href={`/faculty/projects/${projectId}`}>View Project</Link>
        </Button>
      </div>
    </Card>
  );
};

export default FacultyProjectCard;


