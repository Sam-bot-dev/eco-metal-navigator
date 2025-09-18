import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";

interface ProfessionalCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export const ProfessionalCard = ({ 
  children, 
  className, 
  delay = 0,
  hover = true 
}: ProfessionalCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.22, 1, 0.36, 1] // Professional easing
      }}
      className={cn(
        "group",
        hover && "hover-lift hover-glow-subtle cursor-pointer",
        className
      )}
    >
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:border-accent/20">
        {children}
      </Card>
    </motion.div>
  );
};

interface ProfessionalCardHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const ProfessionalCardHeader = ({ 
  title, 
  description, 
  icon, 
  className 
}: ProfessionalCardHeaderProps) => {
  return (
    <CardHeader className={className}>
      {icon && (
        <motion.div 
          className="flex justify-center mb-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-2 rounded-lg bg-accent/10 text-accent">
            {icon}
          </div>
        </motion.div>
      )}
      <CardTitle className="text-lg font-semibold text-center">{title}</CardTitle>
      {description && (
        <CardDescription className="text-center text-sm">
          {description}
        </CardDescription>
      )}
    </CardHeader>
  );
};

export const ProfessionalCardContent = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <CardContent className={className}>
      {children}
    </CardContent>
  );
};