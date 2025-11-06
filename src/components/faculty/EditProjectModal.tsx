import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Button } from '@/src/components/ui/button';
import { useUpdateProject } from '@/src/hooks/useProjects';
import SkillsBadge from '@/src/components/shared/SkillsBadge';
import type { Project } from '@/src/types';

const projectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  requirements: z.string().min(20, 'Requirements must be at least 20 characters'),
  max_students: z.number().min(1).max(50),
  deadline: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface EditProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

const EditProjectModal = ({ open, onOpenChange, project }: EditProjectModalProps) => {
  const updateProject = useUpdateProject();
  const [skills, setSkills] = useState<string[]>(project.skills || []);
  const [skillInput, setSkillInput] = useState('');

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
      requirements: project.requirements,
      max_students: project.max_students,
      deadline: project.deadline ? project.deadline.split('T')[0] : '',
    },
  });

  useEffect(() => {
    form.reset({
      title: project.title,
      description: project.description,
      requirements: project.requirements,
      max_students: project.max_students,
      deadline: project.deadline ? project.deadline.split('T')[0] : '',
    });
    setSkills(project.skills || project.skillsRequired || []);
  }, [project]);

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const onSubmit = async (data: ProjectFormData) => {
    await updateProject.mutateAsync({
      id: project.id,
      data: {
        ...data,
        skills,
      },
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update your project details
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter project title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe the project in detail..."
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="List the requirements and prerequisites..."
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Required Skills</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  placeholder="Add a skill and press Enter"
                />
                <Button type="button" onClick={handleAddSkill} variant="outline">
                  Add
                </Button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <SkillsBadge
                      key={index}
                      skill={skill}
                      onRemove={() => handleRemoveSkill(skill)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="max_students"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Students *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateProject.isPending}>
                {updateProject.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;


