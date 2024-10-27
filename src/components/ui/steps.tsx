import React from 'react';
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepsProps {
  steps: Array<{ id: number; title: string }>;
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Steps({ steps, currentStep, onStepClick }: StepsProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border p-2 md:p-4">
      <div className="w-full overflow-x-auto md:overflow-x-visible">
        <nav 
          aria-label="Progress" 
          className="min-w-[640px] md:min-w-0 w-full"
        >
          <ol className="flex items-center justify-between w-full">
            {steps.map((step, stepIdx) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              const isClickable = step.id <= currentStep;

              return (
                <li 
                  key={step.title} 
                  className={cn(
                    "relative flex-1 flex justify-center",
                  )}
                >
                  <div className="group flex flex-col items-center">
                    {/* Connector Line */}
                    {stepIdx !== steps.length - 1 && (
                      <div
                        className={cn(
                          "absolute top-1/2 h-[2px] -translate-y-1/2",
                          "transition-colors duration-300 ease-in-out",
                          isCompleted ? "bg-primary" : "bg-gray-200",
                          "left-[50%] w-[100%]"
                        )}
                        style={{
                          width: 'calc(100% - 1rem)'
                        }}
                      />
                    )}

                    {/* Step Button */}
                    <button
                      onClick={() => isClickable && onStepClick?.(step.id)}
                      disabled={!isClickable}
                      className={cn(
                        "relative z-10",
                        "w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center",
                        "transition-all duration-200 ease-in-out border-2",
                        isCompleted 
                          ? "bg-primary border-primary text-white hover:bg-primary/90"
                          : isCurrent
                            ? "bg-white border-primary text-primary"
                            : "bg-white border-gray-200 text-gray-400",
                        isClickable ? "cursor-pointer" : "cursor-not-allowed"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-semibold">{step.id}</span>
                      )}
                    </button>

                    {/* Step Title */}
                    <span
                      className={cn(
                        "mt-2 text-[10px] md:text-xs font-medium",
                        "transition-colors duration-200",
                        "text-center",
                        isCurrent 
                          ? "text-primary" 
                          : isCompleted
                            ? "text-gray-600"
                            : "text-gray-400"
                      )}
                    >
                      <span className="hidden md:block">{step.title}</span>
                      <span className="block md:hidden">
                        {step.title.length > 10 ? `${step.title.slice(0, 10)}...` : step.title}
                      </span>
                    </span>

                    {/* Hover Tooltip - Only show on truncated text
                    {step.title.length > 10 && (
                      <div className="absolute -bottom-8 scale-0 group-hover:scale-100 transition-transform duration-200 bg-gray-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-20">
                        {step.title}
                      </div>
                    )} */}
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default Steps;