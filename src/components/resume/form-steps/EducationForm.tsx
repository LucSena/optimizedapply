// src/components/resume/form-steps/EducationForm.tsx
'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeCreation } from '@/contexts/ResumeCreationContext';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const educationSchema = z.object({
  educations: z.array(z.object({
    institution: z.string().min(2, 'Institution name is required'),
    degree: z.string().min(2, 'Degree is required'),
    fieldOfStudy: z.string().min(2, 'Field of study is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
  })).min(1, 'Add at least one education'),
});

type EducationFormData = z.infer<typeof educationSchema>;

export default function EducationForm() {
  const { state, dispatch } = useResumeCreation();

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: state.formData.educations.length > 0
        ? state.formData.educations.map(edu => ({
            ...edu,
            startDate: edu.startDate.toISOString().split('T')[0],
            endDate: edu.endDate ? edu.endDate.toISOString().split('T')[0] : undefined,
          }))
        : [{ institution: '', degree: '', fieldOfStudy: '', startDate: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'educations',
  });

  const onSubmit = (data: EducationFormData) => {
    const formattedData = data.educations.map(edu => ({
      ...edu,
      startDate: new Date(edu.startDate),
      endDate: edu.endDate ? new Date(edu.endDate) : undefined,
    }));

    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        educations: formattedData,
      },
    });
  };

  // Auto-save on form change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      const educations = value.educations;
      if (educations && educations.every(edu => edu && edu.startDate)) {
        onSubmit(value as EducationFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Education</h2>
        <p className="text-muted-foreground">
          Add your educational background, starting with the most recent.
        </p>
      </div>

      <form className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`educations.${index}.institution`}>Institution</Label>
                  <Input
                    {...form.register(`educations.${index}.institution`)}
                    placeholder="University or School name"
                  />
                  {form.formState.errors.educations?.[index]?.institution && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.educations[index]?.institution?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`educations.${index}.degree`}>Degree</Label>
                  <Input
                    {...form.register(`educations.${index}.degree`)}
                    placeholder="e.g., Bachelor's, Master's"
                  />
                  {form.formState.errors.educations?.[index]?.degree && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.educations[index]?.degree?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`educations.${index}.fieldOfStudy`}>Field of Study</Label>
                  <Input
                    {...form.register(`educations.${index}.fieldOfStudy`)}
                    placeholder="e.g., Computer Science"
                  />
                  {form.formState.errors.educations?.[index]?.fieldOfStudy && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.educations[index]?.fieldOfStudy?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`educations.${index}.startDate`}>Start Date</Label>
                  <Input
                    type="date"
                    {...form.register(`educations.${index}.startDate`)}
                  />
                  {form.formState.errors.educations?.[index]?.startDate && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.educations[index]?.startDate?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`educations.${index}.endDate`}>End Date</Label>
                  <Input
                    type="date"
                    {...form.register(`educations.${index}.endDate`)}
                  />
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
                  Remove Education
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
          })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Education
        </Button>
      </form>
    </div>
  );
}