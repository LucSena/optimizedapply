// src/components/ui/steps.tsx
import { cn } from "@/lib/utils";

interface StepsProps {
  steps: Array<{ id: number; title: string }>;
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Steps({ steps, currentStep, onStepClick }: StepsProps) {
  return (
    <div className="relative w-full overflow-x-auto pb-4">
      <div className="min-w-full">
        <nav className="flex" aria-label="Progress">
          <ol role="list" className="flex w-full items-center">
            {steps.map((step, stepIdx) => (
              <li 
                key={step.title} 
                className={cn(
                  stepIdx !== steps.length - 1 ? 'flex-1' : '', 
                  'relative'
                )}
              >
                <div className="group flex items-center min-w-[120px]">
                  <span className="flex items-center shrink-0" aria-current="step">
                    <button
                      onClick={() => onStepClick?.(step.id)}
                      className={cn(
                        'h-8 w-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors',
                        step.id < currentStep 
                          ? 'bg-primary text-primary-foreground' 
                          : step.id === currentStep
                            ? 'bg-primary text-primary-foreground ring-2 ring-primary/30'
                            : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {step.id}
                    </button>
                  </span>
                  <span 
                    className={cn(
                      'ml-3 text-sm font-medium whitespace-nowrap',
                      step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </span>
                </div>

                {stepIdx !== steps.length - 1 && (
                  <div 
                    className={cn(
                      'absolute left-16 top-4 -ml-px h-0.5',
                      'w-[calc(100%-4rem)]', // Ajuste do tamanho da linha
                      step.id < currentStep ? 'bg-primary' : 'bg-muted'
                    )}
                    aria-hidden="true" 
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}