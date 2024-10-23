// src/components/resume/TemplateSelector.tsx
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { torontoConfig } from '../resume-templates/configs/toronto';

// Tipos
interface TemplateSelectorProps {
  selectedTemplate: string | null;
  onSelect: (templateId: string) => void;
  userType: 'FREE' | 'PREMIUM';
}

// Por enquanto só temos o template Toronto, mas podemos adicionar mais depois
const templates = [
  torontoConfig,
  // Aqui virão outros templates quando criarmos
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelect,
  userType
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const isLocked = !template.isAvailableInFree && userType === 'FREE';

          return (
            <Card 
              key={template.id}
              className={`relative transition-all hover:border-primary/50 ${
                isSelected ? 'border-primary ring-2 ring-primary' : ''
              }`}
            >
              {/* Indicador de selecionado */}
              {isSelected && (
                <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}

              <CardContent className="pt-6">
                {/* Preview do template (usando uma versão em miniatura do próprio template) */}
                <div className="aspect-[1/1.4] bg-accent rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    {template.name} Preview
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  variant={isSelected ? "default" : "outline"}
                  className="w-full"
                  onClick={() => onSelect(template.id)}
                  disabled={isLocked}
                >
                  {isLocked ? 'Premium Only' : isSelected ? 'Selected' : 'Use Template'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;