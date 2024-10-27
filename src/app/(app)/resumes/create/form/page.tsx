// src/app/(app)/resumes/create/form/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useResumeCreation } from '@/contexts/ResumeCreationContext';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Steps } from "@/components/ui/steps";

// Importar os componentes de cada etapa que vamos criar
import PersonalInfoForm from '@/components/resume/form-steps/PersonalInfoForm';
import ProfessionalSummaryForm from '@/components/resume/form-steps/ProfessionalSummaryForm';
import WorkExperienceForm from '@/components/resume/form-steps/WorkExperienceForm';
import EducationForm from '@/components/resume/form-steps/EducationForm';
import SkillsForm from '@/components/resume/form-steps/SkillsForm';
import LanguagesForm from '@/components/resume/form-steps/LanguagesForm';
import ProjectsForm from '@/components/resume/form-steps/ProjectsForm';
import CertificationsForm from '@/components/resume/form-steps/CertificationsForm';
import PreviewStep from '@/components/resume/form-steps/PreviewStep';

const steps = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Professional Summary' },
  { id: 3, title: 'Work Experience' },
  { id: 4, title: 'Education' },
  { id: 5, title: 'Skills' },
  { id: 6, title: 'Languages' },
  { id: 7, title: 'Projects' },
  { id: 8, title: 'Certifications' },
  { id: 9, title: 'Preview' }
];

export default function ResumeFormPage() {
  const router = useRouter();
  const { state, dispatch } = useResumeCreation();

  // Se não tiver template selecionado, volta para a seleção
  useEffect(() => {
    if (!state.templateId) {
      router.push('/resumes/create');
    }
  }, [state.templateId, router]);

  // Garantir que sempre começa no primeiro step ao entrar na página
  useEffect(() => {
    if (state.step !== 1) {
      dispatch({ type: 'SET_STEP', payload: 1 });
    }
  }, []);

  const handleNext = () => {
    if (state.step < steps.length) {
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  const handleBack = () => {
    if (state.step > 1) {
      dispatch({ type: 'PREV_STEP' });
    } else {
      router.push('/resumes/create');
    }
  };

  const handleFinish = () => {
    // Implementar a lógica de finalização e salvamento
    router.push('/resumes');
  };

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return <ProfessionalSummaryForm />;
      case 3:
        return <WorkExperienceForm />;
      case 4:
        return <EducationForm />;
      case 5:
        return <SkillsForm />;
      case 6:
        return <LanguagesForm />;
      case 7:
        return <ProjectsForm />;
      case 8:
        return <CertificationsForm />;
      case 9:
        return <PreviewStep onFinish={handleFinish} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 overflow-x-auto">
          <div className="min-w-[800px]">
            <Steps
              steps={steps}
              currentStep={state.step}
              onStepClick={(step) => dispatch({ type: 'SET_STEP', payload: step })}
            />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-6">
          {renderStep()}

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            {state.step < steps.length ? (
              <Button
                onClick={handleNext}
                className="gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                className="gap-2"
              >
                Finish
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}