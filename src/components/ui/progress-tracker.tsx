import React from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  current?: boolean;
}

interface ProgressTrackerProps {
  steps: Step[];
  className?: string;
}

export const ProgressTracker = ({ steps, className }: ProgressTrackerProps) => {
  return (
    <div className={cn("w-full py-4", className)}>
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
          <div 
            className="h-full bg-primary transition-all duration-700 ease-out"
            style={{ 
              width: `${((steps.filter(s => s.completed).length) / Math.max(steps.length - 1, 1)) * 100}%` 
            }}
          />
        </div>
        
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={cn(
              "flex flex-col items-center text-center min-w-0 flex-1",
              index > 0 && "ml-4"
            )}
          >
            {/* Step Circle */}
            <div
              className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 mb-2",
                step.completed
                  ? "bg-primary border-primary text-primary-foreground shadow-lg"
                  : step.current
                  ? "bg-primary/10 border-primary text-primary animate-pulse"
                  : "bg-background border-muted-foreground/30 text-muted-foreground"
              )}
            >
              {step.completed ? (
                <Check className="w-5 h-5" />
              ) : (
                <Circle className="w-4 h-4" fill="currentColor" />
              )}
            </div>
            
            {/* Step Content */}
            <div className="max-w-32">
              <h4 
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  step.completed || step.current 
                    ? "text-foreground" 
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </h4>
              {step.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};