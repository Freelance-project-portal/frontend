import { useState } from 'react';

import { useFacultyProjects, useDeleteProject } from '@/src/hooks/useProjects';
import { useAuth } from '@/src/contexts/AuthContext';
import FacultyProjectCard from './FacultyProjectCard';
import EditProjectModal from './EditProjectModal';
import { ProjectGridSkeleton } from '@/src/components/shared/LoadingState';
import EmptyState from '@/src/components/shared/EmptyState';
import ConfirmDialog from '@/src/components/shared/ConfirmDialog';
import { FolderOpen } from 'lucide-react';
import type { Project } from '@/src/types';

const ProjectsList = () => {
  const { user } = useAuth();
  const { data: projects, isLoading } = useFacultyProjects(user?.id || '');
  const deleteProject = useDeleteProject();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deletingProjectId) {
      await deleteProject.mutateAsync(deletingProjectId);
      setDeletingProjectId(null);
    }
  };

  if (isLoading) {
    return <ProjectGridSkeleton />;
  }

  if (!projects || projects.length === 0) {
    return (
      <EmptyState
        icon={FolderOpen}
        title="No Projects Yet"
        description="Create your first project to get started with student collaboration."
      />
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <FacultyProjectCard
            key={project.id}
            project={project as any}
            onEdit={() => setEditingProject(project as any)}
            onDelete={() => setDeletingProjectId(project.id)}
            applicationCount={0}
          />
        ))}
      </div>

      {editingProject && (
        <EditProjectModal
          open={!!editingProject}
          onOpenChange={(open) => !open && setEditingProject(null)}
          project={editingProject}
        />
      )}

      <ConfirmDialog
        open={!!deletingProjectId}
        onOpenChange={(open) => !open && setDeletingProjectId(null)}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={handleDelete}
        destructive
      />
    </>
  );
};

export default ProjectsList;



