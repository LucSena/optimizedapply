// src/components/resume/form-steps/WorkExperienceForm.tsx
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

const workExperienceSchema = z.object({
  experiences: z.array(z.object({
    company: z.string().min(2, 'Company name is required'),
    position: z.string().min(2, 'Position is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    description: z.string().min(20, 'Description must be at least 20 characters'),
  })).min(1, 'Add at least one work experience'),
});

type WorkExperienceFormData = z.infer<typeof workExperienceSchema>;

export default function WorkExperienceForm() {
  const { state, dispatch } = useResumeCreation();

  const form = useForm<WorkExperienceFormData>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      experiences: state.formData.workExperiences.length > 0
        ? state.formData.workExperiences.map(exp => ({
            ...exp,
            startDate: exp.startDate.toISOString().split('T')[0],
            endDate: exp.endDate ? exp.endDate.toISOString().split('T')[0] : undefined,
          }))
        : [{ company: '', position: '', startDate: '', description: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'experiences',
  });

  const onSubmit = (data: WorkExperienceFormData) => {
    const formattedData = data.experiences.map(exp => ({
      ...exp,
      startDate: new Date(exp.startDate),
      endDate: exp.endDate ? new Date(exp.endDate) : undefined,
    }));

    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        workExperiences: formattedData,
      },
    });
  };

  // Auto-save on form change
  // Auto-save on form change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      const experiences = value.experiences;
      if (experiences && experiences.every(exp => exp && exp.startDate)) {
        onSubmit(value as WorkExperienceFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <p className="text-muted-foreground">
          Add your relevant work experience, starting with the most recent.
        </p>
      </div>

      <form className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`experiences.${index}.company`}>Company</Label>
                  <Input
                    {...form.register(`experiences.${index}.company`)}
                    placeholder="Company name"
                  />
                  {form.formState.errors.experiences?.[index]?.company && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.experiences[index]?.company?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`experiences.${index}.position`}>Position</Label>
                  <Input
                    {...form.register(`experiences.${index}.position`)}
                    placeholder="Your role"
                  />
                  {form.formState.errors.experiences?.[index]?.position && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.experiences[index]?.position?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`experiences.${index}.startDate`}>Start Date</Label>
                  <Input
                    type="date"
                    {...form.register(`experiences.${index}.startDate`)}
                  />
                  {form.formState.errors.experiences?.[index]?.startDate && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.experiences[index]?.startDate?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`experiences.${index}.endDate`}>End Date</Label>
                  <Input
                    type="date"
                    {...form.register(`experiences.${index}.endDate`)}
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor={`experiences.${index}.description`}>Description</Label>
                  <Textarea
                    {...form.register(`experiences.${index}.description`)}
                    rows={4}
                    placeholder="Describe your responsibilities and achievements..."
                  />
                  {form.formState.errors.experiences?.[index]?.description && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.experiences[index]?.description?.message}
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
                  Remove Experience
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
          })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Experience
        </Button>
      </form>
    </div>
  );
}