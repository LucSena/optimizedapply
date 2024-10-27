// src/components/resume/form-steps/SkillsForm.tsx
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

const skillLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'] as const;

const skillsSchema = z.object({
  skills: z.array(z.object({
    name: z.string().min(2, 'Skill name is required'),
    level: z.enum(skillLevels),
  })).min(1, 'Add at least one skill'),
});

type SkillsFormData = z.infer<typeof skillsSchema>;

export default function SkillsForm() {
  const { state, dispatch } = useResumeCreation();

  const form = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: state.formData.skills.length > 0
        ? state.formData.skills
        : [{ name: '', level: 'INTERMEDIATE' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'skills',
  });

  const onSubmit = (data: SkillsFormData) => {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        skills: data.skills,
      },
    });
  };

  // Auto-save on form change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      const skills = value.skills;
      if (skills && skills.every(skill => skill && skill.name && skill.level)) {
        onSubmit(value as SkillsFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-muted-foreground">
          Add your technical and professional skills with proficiency levels.
        </p>
      </div>

      <form className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`skills.${index}.name`}>Skill Name</Label>
                  <Input
                    {...form.register(`skills.${index}.name`)}
                    placeholder="e.g., JavaScript, Project Management"
                  />
                  {form.formState.errors.skills?.[index]?.name && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.skills[index]?.name?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`skills.${index}.level`}>Proficiency Level</Label>
                  <Select
                    onValueChange={(value: any) => {
                      form.setValue(`skills.${index}.level`, value as any);
                    }}
                    defaultValue={field.level}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillLevels.map((level) => (
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
                  Remove Skill
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
          Add Another Skill
        </Button>
      </form>
    </div>
  );
}