// src/app/(app)/resumes/create/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TemplateSelector from '@/components/resume/TemplateSelector';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useResumeCreation } from '@/contexts/ResumeCreationContext';

export default function CreateResumePage() {
  const router = useRouter();
  const { state, dispatch } = useResumeCreation();
  
  // Exemplo - Na implementação real virá do contexto de autenticação
  const userType: 'FREE' | 'PREMIUM' = 'FREE';

  // Se já tiver começado a criar o currículo, redireciona para a etapa correta
  useEffect(() => {
    if (state.step > 1) {
      router.push(`/resumes/create/form`);
    }
  }, [state.step, router]);

  const handleTemplateSelect = (templateId: string) => {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });
  };

  const handleNext = () => {
    if (!state.templateId) return;
    dispatch({ type: 'NEXT_STEP' });
    router.push('/resumes/create/form');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Create Your Resume</h1>
        <p className="text-muted-foreground mb-8">
          Start by selecting a template that best fits your style
        </p>

        <TemplateSelector
          selectedTemplate={state.templateId}
          onSelect={handleTemplateSelect}
          userType={userType}
        />

        <div className="mt-8 flex justify-end">
          <Button
            size="lg"
            disabled={!state.templateId}
            onClick={handleNext}
          >
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}