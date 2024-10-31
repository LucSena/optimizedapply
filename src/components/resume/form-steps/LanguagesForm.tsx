// src/components/resume/form-steps/LanguagesForm.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from 'react';

const languageLevels = ['BASIC', 'INTERMEDIATE', 'ADVANCED', 'FLUENT', 'NATIVE'] as const;

const languagesSchema = z.object({
  languages: z.array(z.object({
    name: z.string().min(2, 'Language name is required'),
    level: z.enum(languageLevels),
  }))
  // Removido o .min(1) para tornar opcional
});

type LanguagesFormData = z.infer<typeof languagesSchema>;

export default function LanguagesForm() {
  const { state, dispatch } = useResumeCreation();

  const form = useForm<LanguagesFormData>({
    resolver: zodResolver(languagesSchema),
    defaultValues: {
      languages: state.formData.languages || [], // Modificado aqui
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'languages',
  });

  const onSubmit = (data: LanguagesFormData) => {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        languages: data.languages,
      },
    });
  };

  // Auto-save on form change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      const languages = value.languages;
      if (languages && languages.every(lang => lang && lang.name && lang.level)) {
        onSubmit(value as LanguagesFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Languages</h2>
        <p className="text-muted-foreground">
          Add languages you know and your proficiency level.
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
                  <Label htmlFor={`languages.${index}.name`}>Language</Label>
                  <Input
                    {...form.register(`languages.${index}.name`)}
                    placeholder="e.g., English, Spanish"
                  />
                  {form.formState.errors.languages?.[index]?.name && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.languages[index]?.name?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`languages.${index}.level`}>Proficiency Level</Label>
                  <Select
                    onValueChange={(value) => {
                      form.setValue(`languages.${index}.level`, value as any);
                    }}
                    defaultValue={field.level}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level.charAt(0) + level.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  Remove Language
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: '', level: 'INTERMEDIATE' })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Language
        </Button>
      </form>
    </div>
  );
}