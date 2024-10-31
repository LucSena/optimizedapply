// src/components/resume/form-steps/CertificationsForm.tsx
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

const certificationsSchema = z.object({
  certifications: z.array(z.object({
    name: z.string().min(2, 'Certification name is required'),
    issuer: z.string().min(2, 'Issuer is required'),
    date: z.string().min(1, 'Date is required'),
  }))
  // Removido o .min(1) para tornar opcional
});

type CertificationsFormData = z.infer<typeof certificationsSchema>;

export default function CertificationsForm() {
  const { state, dispatch } = useResumeCreation();

  const form = useForm<CertificationsFormData>({
    resolver: zodResolver(certificationsSchema),
    defaultValues: {
      certifications: state.formData.certifications.map(cert => ({
        ...cert,
        date: cert.date.toISOString(), // Convert Date to string
      })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'certifications',
  });

  const onSubmit = (data: CertificationsFormData) => {
    const formattedData = data.certifications.map(cert => ({
      ...cert,
      date: new Date(cert.date),
    }));

    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        certifications: formattedData,
      },
    });
  };

  // Auto-save on form change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      const certifications = value.certifications;
      if (certifications && certifications.every(cert => cert && cert.name && cert.issuer && cert.date)) {
        onSubmit(value as CertificationsFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <p className="text-muted-foreground">
          Add your professional certifications and licenses.
        </p>
      </div>

      <form className="space-y-4">
        {fields.length === 0 && (
          <div className="text-center py-8 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">No items added yet. Click the button below to add one.</p>
          </div>
        )}
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`certifications.${index}.name`}>Certification Name</Label>
                  <Input
                    {...form.register(`certifications.${index}.name`)}
                    placeholder="e.g., AWS Solutions Architect"
                  />
                  {form.formState.errors.certifications?.[index]?.name && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.certifications[index]?.name?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`certifications.${index}.issuer`}>Issuing Organization</Label>
                  <Input
                    {...form.register(`certifications.${index}.issuer`)}
                    placeholder="e.g., Amazon Web Services"
                  />
                  {form.formState.errors.certifications?.[index]?.issuer && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.certifications[index]?.issuer?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`certifications.${index}.date`}>Date Earned</Label>
                  <Input
                    type="date"
                    {...form.register(`certifications.${index}.date`)}
                  />
                  {form.formState.errors.certifications?.[index]?.date && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.certifications[index]?.date?.message}
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
                  Remove Certification
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: '', issuer: '', date: '' })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Certification
        </Button>
      </form>
    </div>
  );
}