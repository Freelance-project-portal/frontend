"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";

import FileUpload from "@/src/components/shared/FileUpload";
import { useSubmitApplication } from "@/src/hooks/useApplications";
import { useAuth } from "@/src/contexts/AuthContext";
import { uploadResume } from "@/src/services/uploads";

const applicationSchema = z.object({
  cover_letter: z.string().min(50, "Cover letter must be at least 50 characters"),
  resume_url: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectTitle: string;
}

const ApplicationModal = ({ open, onOpenChange, projectId, projectTitle }: ApplicationModalProps) => {
  const submitApplication = useSubmitApplication();
  const { user } = useAuth();
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      cover_letter: "",
      resume_url: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    if (!user) {
      toast.info("Please sign in to apply for projects.");
      router.push("/login");
      return;
    }

    if (user.role !== "student") {
      toast.error("Only students can apply to projects.");
      return;
    }

    let resumeUrl = "";
    if (resumeFile) {
      try {
        setIsUploadingResume(true);
        const uploaded = await uploadResume(resumeFile);
        resumeUrl = uploaded.url;
      } catch (error: any) {
        toast.error(error.message || "Failed to upload resume");
        return;
      } finally {
        setIsUploadingResume(false);
      }
    }

    await submitApplication.mutateAsync({
      project_id: projectId,
      cover_letter: data.cover_letter,
      resume_url: resumeUrl,
    });

    form.reset();
    setResumeFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply to Project</DialogTitle>
          <DialogDescription>Submit your application for: {projectTitle}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cover_letter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Explain why you're interested in this project and what skills you bring..."
                      rows={8}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Resume (Optional)</FormLabel>
              <FileUpload onFileSelect={(file) => setResumeFile(file)} accept=".pdf,.doc,.docx" maxSizeMB={5} />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitApplication.isPending || isUploadingResume}>
                {submitApplication.isPending
                  ? "Submitting..."
                  : isUploadingResume
                  ? "Uploading Resume..."
                  : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
