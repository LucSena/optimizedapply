// src/components/resume/form-steps/PreviewStep.tsx
'use client';

import { useState } from 'react';
import { useResumeCreation } from '@/contexts/ResumeCreationContext';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Download, FileText, Loader2 } from "lucide-react";
import TorontoTemplate from "@/components/resume-templates/toronto";
import TorontoPDFTemplate from "@/components/resume-templates/toronto/pdf";

interface PreviewStepProps {
  onFinish: () => void;
}

export default function PreviewStep({ onFinish }: PreviewStepProps) {
  const { state } = useResumeCreation();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('web');

  // Certifique-se de que todos os dados necessários estão presentes
  const resumeData = {
    personalInfo: state.formData.personalInfo!,
    professionalSummary: state.formData.professionalSummary!,
    workExperiences: state.formData.workExperiences,
    educations: state.formData.educations,
    skills: state.formData.skills,
    languages: state.formData.languages,
    projects: state.formData.projects,
    certifications: state.formData.certifications,
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Aqui você implementará a lógica de geração do PDF
      // Por enquanto, vamos simular um delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Implementar geração real do PDF
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Preview Your Resume</h2>
        <p className="text-muted-foreground">
          Review your resume and make sure everything looks perfect before finishing.
        </p>
      </div>

      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="web">
              <FileText className="h-4 w-4 mr-2" />
              Web View
            </TabsTrigger>
            <TabsTrigger value="pdf">
              <Download className="h-4 w-4 mr-2" />
              PDF Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="web" className="mt-4">
            <Card className="overflow-hidden bg-white">
              <div className="max-h-[800px] overflow-y-auto">
                {state.templateId === 'toronto' && (
                  <TorontoTemplate
                    data={resumeData}
                    variant="full"
                  />
                )}
                {/* Adicione outros templates aqui quando houver */}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="pdf" className="mt-4">
            <Card className="overflow-hidden bg-white p-4">
              <div className="aspect-[1/1.414] w-full border rounded-lg">
                {state.templateId === 'toronto' && (
                  <TorontoPDFTemplate
                    data={resumeData}
                    variant="full"
                  />
                )}
                {/* Adicione outros templates PDF aqui quando houver */}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => setActiveTab('web')}
          >
            Edit Resume
          </Button>

          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>

          <Button onClick={onFinish}>
            Finish
          </Button>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">What's Next?</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Download your resume in PDF format</li>
          <li>Use your resume to apply for jobs</li>
          <li>Keep it updated with new experiences and skills</li>
          <li>Create different versions for different job applications</li>
        </ul>
      </div>
    </div>
  );
}