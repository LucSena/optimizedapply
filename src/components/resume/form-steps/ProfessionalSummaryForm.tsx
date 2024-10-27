// src/components/resume/form-steps/ProfessionalSummaryForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeCreation } from '@/contexts/ResumeCreationContext';
import React from 'react';

const professionalSummarySchema = z.object({
  summary: z.string().min(50, 'Professional summary must be at least 50 characters'),
});

type ProfessionalSummaryFormData = z.infer<typeof professionalSummarySchema>;

export default function ProfessionalSummaryForm() {
  const { state, dispatch } = useResumeCreation();

  const form = useForm<ProfessionalSummaryFormData>({
    resolver: zodResolver(professionalSummarySchema),
    defaultValues: state.formData.professionalSummary || {
      summary: '',
    },
  });

  const onSubmit = (data: ProfessionalSummaryFormData) => {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        professionalSummary: data,
      },
    });
  };

  // Auto-save on form change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onSubmit(value as ProfessionalSummaryFormData);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Professional Summary</h2>
        <p className="text-muted-foreground">
          Write a brief summary of your professional background and key achievements.
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            {...form.register('summary')}
            rows={6}
            placeholder="Experienced professional with expertise in..."
          />
          {form.formState.errors.summary && (
            <p className="text-sm text-destructive">
              {form.formState.errors.summary.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}