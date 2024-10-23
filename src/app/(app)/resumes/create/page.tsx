// src/app/(app)/resumes/create/page.tsx
'use client';

import { useState } from 'react';
import TemplateSelector from '@/components/resume/TemplateSelector';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function CreateResumePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  // Exemplo - Na implementação real virá do contexto de autenticação
  const userType: 'FREE' | 'PREMIUM' = 'FREE';

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleNext = () => {
    if (!selectedTemplate) return;
    // Aqui vamos implementar a navegação para o próximo passo
    // (formulário de preenchimento do currículo)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Create Your Resume</h1>
        <p className="text-muted-foreground mb-8">
          Start by selecting a template that best fits your style
        </p>

        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelect={handleTemplateSelect}
          userType={userType}
        />

        <div className="mt-8 flex justify-end">
          <Button
            size="lg"
            disabled={!selectedTemplate}
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