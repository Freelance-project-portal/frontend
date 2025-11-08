"use client";

import { useState } from "react";
import { useProjectTasks, useDeleteTask } from "@/src/hooks/useTasks";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog";
import CreateTaskForm from "./CreateTaskForm";
import ConfirmDialog from "@/src/components/shared/ConfirmDialog";
import { ProjectCardSkeleton } from "@/src/components/shared/LoadingState";
import EmptyState from "@/src/components/shared/EmptyState";
import { Plus, Calendar, Trash2, ListTodo } from "lucide-react";
import type { TaskStatus } from "@/src/types";

interface TasksManagerProps {
  projectId: string;
}

const TasksManager = ({ projectId }: TasksManagerProps) => {
  const { data: tasks, isLoading } = useProjectTasks(projectId);
  const deleteTask = useDeleteTask();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deletingTaskId) {
      await deleteTask.mutateAsync(deletingTaskId);
      setDeletingTaskId(null);
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    const config = {
      todo: { label: "To Do", variant: "outline" as const },
      in_progress: { label: "In Progress", variant: "secondary" as const },
      completed: { label: "Completed", variant: "default" as const },
    };
    return config[status];
  };

  if (isLoading) {
    return <ProjectCardSkeleton />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {!tasks || tasks.length === 0 ? (
        <EmptyState
          icon={ListTodo}
          title="No Tasks Yet"
          description="Create tasks to organize work for your project team."
          action={{
            label: "Create First Task",
            onClick: () => setShowCreateForm(true),
          }}
        />
      ) : (
        <div className="space-y-3">
          {tasks.map((task, index) => {
            const statusBadge = getStatusBadge(task.status);
            return (
              <Card key={task.id || `task-${index}`} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{task.title}</h3>
                      <Badge variant={statusBadge.variant}>
                        {statusBadge.label}
                      </Badge>
                    </div>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {task.description}
                      </p>
                    )}
                    {task.due_date && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </div>
                    )}
                    {task.assigned_to_name && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Assigned to: {task.assigned_to_name}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingTaskId(task.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a task to organize work for your project
            </DialogDescription>
          </DialogHeader>
          <CreateTaskForm
            projectId={projectId}
            onSuccess={() => setShowCreateForm(false)}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deletingTaskId}
        onOpenChange={(open) => !open && setDeletingTaskId(null)}
        title="Delete Task"
        description="Are you sure you want to delete this task?"
        onConfirm={handleDelete}
        destructive
      />
    </div>
  );
};

export default TasksManager;

