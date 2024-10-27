// src/components/resume/form-steps/ProjectsForm.tsx
'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeCreation } from '@/contexts/ResumeCreationContext';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const projectsSchema = z.object({
  projects: z.array(z.object({
    name: z.string().min(2, 'Project name is required'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  })).min(1, 'Add at least one project'),
});

type ProjectsFormData = z.infer<typeof projectsSchema>;

export default function ProjectsForm() {
  const { state, dispatch } = useResumeCreation();

  const form = useForm<ProjectsFormData>({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      projects: state.formData.projects.length > 0
        ? state.formData.projects
        : [{ name: '', description: '', url: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'projects',
  });

  const onSubmit = (data: ProjectsFormData) => {
    const formattedData = data.projects.map(project => ({
      ...project,
      url: project.url || undefined, // Convert empty string to undefined
    }));

    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        projects: formattedData,
      },
    });
  };

  // Auto-save on form change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      const projects = value.projects;
      if (projects && projects.every(proj => proj && proj.name && proj.description)) {
        onSubmit(value as ProjectsFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-muted-foreground">
          Add notable projects you've worked on. These can be work, personal, or academic projects.
        </p>
      </div>

      <form className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`projects.${index}.name`}>Project Name</Label>
                  <Input
                    {...form.register(`projects.${index}.name`)}
                    placeholder="e.g., E-commerce Platform, Portfolio Website"
                  />
                  {form.formState.errors.projects?.[index]?.name && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.projects[index]?.name?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`projects.${index}.description`}>Description</Label>
                  <Textarea
                    {...form.register(`projects.${index}.description`)}
                    rows={4}
                    placeholder="Describe the project, your role, and key achievements..."
                  />
                  {form.formState.errors.projects?.[index]?.description && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.projects[index]?.description?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`projects.${index}.url`}>Project URL (Optional)</Label>
                  <Input
                    {...form.register(`projects.${index}.url`)}
                    placeholder="https://..."
                    type="url"
                  />
                  {form.formState.errors.projects?.[index]?.url && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.projects[index]?.url?.message}
                    </p>
                  )}
                </div>
              </div>

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="mt-4"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Project
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: '', description: '', url: '' })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Project
        </Button>
      </form>
    </div>
  );
}