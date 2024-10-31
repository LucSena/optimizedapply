// src/app/(app)/resumes/create/form/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useResumeCreation } from '@/contexts/ResumeCreationContext';
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Steps } from "@/components/ui/steps";
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast();
  const { state, dispatch } = useResumeCreation();

  useEffect(() => {
    if (!state.templateId) {
      router.push('/resumes/create');
    }
  }, [state.templateId, router]);

  useEffect(() => {
    if (state.step !== 1) {
      dispatch({ type: 'SET_STEP', payload: 1 });
    }
  }, []);

  const handleNext = () => {
    // Validar apenas os passos obrigatórios (1 a 5)
    if (state.step >= 1 && state.step <= 5) {
      const { personalInfo, professionalSummary, workExperiences, educations, skills } = state.formData;

      switch (state.step) {
        case 1:
          if (!personalInfo?.fullName || !personalInfo?.email) {
            toast({
              variant: "destructive",
              title: "Required Fields Missing",
              description: (
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span>Please provide your full name and email address to continue.</span>
                </div>
              ),
              className: "border-destructive",
              duration: 5000, // 5 segundos
            });
            return;
          }
          break;
        case 2:
          if (!professionalSummary?.summary) {
            toast({
              variant: "destructive",
              title: "Professional Summary Required",
              description: (
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span>Please provide a professional summary to continue.</span>
                </div>
              ),
              className: "border-destructive",
              duration: 5000,
            });
            return;
          }
          break;
        case 3:
          if (!workExperiences || workExperiences.length === 0) {
            toast({
              variant: "destructive",
              title: "Work Experience Required",
              description: (
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span>Please add at least one work experience entry to continue.</span>
                </div>
              ),
              className: "border-destructive",
              duration: 5000,
            });
            return;
          }
          break;
        case 4:
          if (!educations || educations.length === 0) {
            toast({
              variant: "destructive",
              title: "Education Required",
              description: (
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span>Please add at least one education entry to continue.</span>
                </div>
              ),
              className: "border-destructive",
              duration: 5000,
            });
            return;
          }
          break;
        case 5:
          if (!skills || skills.length === 0) {
            toast({
              variant: "destructive",
              title: "Skills Required",
              description: (
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span>Please add at least one skill to continue.</span>
                </div>
              ),
              className: "border-destructive",
              duration: 5000,
            });
            return;
          }
          break;
      }
    }

    // Se chegou aqui, pode avançar
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