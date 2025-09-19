import React, { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface EnhancedInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: string;
  max?: string;
  validation?: (value: string) => string | null;
  helpText?: string;
  required?: boolean;
  className?: string;
}

export const EnhancedInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  min,
  max,
  validation,
  helpText,
  required = false,
  className
}: EnhancedInputProps) => {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (validation && touched) {
      setError(validation(newValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validation) {
      setError(validation(value));
    }
  };

  const isValid = !error && value && touched;
  const hasError = error && touched;

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-foreground flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          className={cn(
            "transition-all duration-200",
            hasError && "border-destructive focus:border-destructive",
            isValid && "border-green-500 focus:border-green-500"
          )}
        />
        
        {/* Validation Icons */}
        {touched && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {hasError ? (
              <AlertCircle className="w-4 h-4 text-destructive" />
            ) : isValid ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : null}
          </div>
        )}
      </div>
      
      {/* Help Text / Error Message */}
      {helpText && !hasError && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
      
      {hasError && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};