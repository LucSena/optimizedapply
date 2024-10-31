// src/components/resume/form-steps/PersonalInfoForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeCreation } from '@/contexts/ResumeCreationContext';
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const personalInfoSchema = z.object({
  // Mantemos apenas nome e email como obrigatórios
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  // Todos os outros campos são opcionais
  phone: z.string().optional(),
  address: z.string().optional(),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoForm() {
  const { state, dispatch } = useResumeCreation();
  const [showValidationAlert, setShowValidationAlert] = React.useState(false);

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: state.formData.personalInfo || {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
    },
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    // Validar apenas os campos obrigatórios
    if (data.fullName && data.email) {
      setShowValidationAlert(false);
      dispatch({
        type: 'UPDATE_FORM_DATA',
        payload: {
          personalInfo: {
            ...data,
            // Converter strings vazias para undefined
            linkedin: data.linkedin || undefined,
            website: data.website || undefined,
          },
        },
      });
    } else {
      setShowValidationAlert(true);
    }
  };

  // Auto-save on form change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.fullName && value.email) {
        onSubmit(value as PersonalInfoFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-muted-foreground">
          Add your personal details to help employers contact you. Name and email are required.
        </p>
      </div>

      {showValidationAlert && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please provide your full name and email address to continue.
          </AlertDescription>
        </Alert>
      )}

      <form className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              {...form.register('fullName')}
              placeholder="John Doe"
            />
            {form.formState.errors.fullName && (
              <p className="text-sm text-destructive">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              placeholder="john@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Campos opcionais */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              {...form.register('phone')}
              placeholder="+1 234 567 890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address (Optional)</Label>
            <Input
              id="address"
              {...form.register('address')}
              placeholder="City, Country"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
            <Input
              id="linkedin"
              {...form.register('linkedin')}
              placeholder="https://linkedin.com/in/johndoe"
            />
            {form.formState.errors.linkedin && (
              <p className="text-sm text-destructive">
                {form.formState.errors.linkedin.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              {...form.register('website')}
              placeholder="https://yourwebsite.com"
            />
            {form.formState.errors.website && (
              <p className="text-sm text-destructive">
                {form.formState.errors.website.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}