import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  progress?: number;
}

export const EnhancedCard = ({ 
  children, 
  className, 
  delay = 0,
  title,
  description,
  icon,
  progress
}: EnhancedCardProps) => {
  return (
    <div 
      className={cn(
        "animate-fadeInUp opacity-0", 
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards',
        animationDuration: '600ms',
        animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:bg-card/90 group">
        {(title || description || icon) && (
          <CardHeader className="relative">
            {progress !== undefined && (
              <div className="absolute top-0 left-0 h-1 bg-primary/20 w-full rounded-t-lg overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            <div className="flex items-start gap-3">
              {icon && (
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-200">
                  {icon}
                </div>
              )}
              <div className="flex-1">
                {title && (
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {title}
                  </CardTitle>
                )}
                {description && (
                  <CardDescription className="mt-1 text-muted-foreground">
                    {description}
                  </CardDescription>
                )}
              </div>
            </div>
          </CardHeader>
        )}
        <CardContent className={cn("space-y-4", !title && !description && !icon && "pt-6")}>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

// Add the animation class to Tailwind
declare global {
  namespace JSX {
    interface IntrinsicElements {
      style: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
    }
  }
}

// Inject CSS for the animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fadeInUp {
      animation: fadeInUp 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
  `;
  document.head.appendChild(style);
}