"use client";

import { useProjectTasks, useUpdateTaskStatus } from "@/src/hooks/useTasks";
import { useAuth } from "@/src/contexts/AuthContext";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Calendar } from "lucide-react";
import { ProjectCardSkeleton } from "@/src/components/shared/LoadingState";
import EmptyState from "@/src/components/shared/EmptyState";
import { ListTodo } from "lucide-react";
import type { TaskStatus } from "@/src/types";

interface StudentTaskListProps {
  projectId: string;
}

const StudentTaskList = ({ projectId }: StudentTaskListProps) => {
  const { user } = useAuth();
  const { data: tasks, isLoading } = useProjectTasks(projectId);
  const updateTask = useUpdateTaskStatus();

  // Filter tasks assigned to the current student
  const studentTasks = tasks?.filter(
    (task) => task.assigned_to === user?.id
  ) || [];

  const handleToggleComplete = (taskId: string, currentStatus: TaskStatus) => {
    const newStatus: TaskStatus =
      currentStatus === "completed" ? "in_progress" : "completed";
    updateTask.mutate({ taskId, data: { status: newStatus } });
  };

  if (isLoading) {
    return <ProjectCardSkeleton />;
  }

  if (!studentTasks || studentTasks.length === 0) {
    return (
      <EmptyState
        icon={ListTodo}
        title="No Tasks Yet"
        description="Tasks will appear here once they are assigned by the faculty."
      />
    );
  }

  const completedCount = studentTasks.filter((t) => t.status === "completed").length;
  const progressPercentage = Math.round((completedCount / studentTasks.length) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Tasks</h3>
        <span className="text-sm text-muted-foreground">
          {completedCount} of {studentTasks.length} completed ({progressPercentage}%)
        </span>
      </div>

      <div className="space-y-3">
        {studentTasks.map((task) => (
          <Card key={task.id || `task-${task.title}`} className="p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.status === "completed"}
                onCheckedChange={() => handleToggleComplete(task.id, task.status)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4
                    className={`font-medium ${
                      task.status === "completed"
                        ? "line-through text-muted-foreground"
                        : ""
                    }`}
                  >
                    {task.title}
                  </h4>
                  {task.status === "in_progress" && (
                    <Badge variant="secondary">In Progress</Badge>
                  )}
                  {task.status === "completed" && (
                    <Badge variant="default">Completed</Badge>
                  )}
                </div>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {task.description}
                  </p>
                )}
                {task.due_date && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3" />
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentTaskList;

