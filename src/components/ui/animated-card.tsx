import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover3d?: boolean;
}

export const AnimatedCard = ({ 
  children, 
  className, 
  delay = 0,
  hover3d = false 
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.25, 0, 1]
      }}
      whileHover={hover3d ? {
        rotateX: 5,
        rotateY: 5,
        scale: 1.05,
        transition: { duration: 0.2 }
      } : {
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn("transform-3d cursor-pointer", className)}
    >
      <Card className="shadow-card hover:shadow-glow transition-all duration-300 glass">
        {children}
      </Card>
    </motion.div>
  );
};

interface AnimatedCardHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const AnimatedCardHeader = ({ title, description, icon }: AnimatedCardHeaderProps) => {
  return (
    <CardHeader>
      {icon && (
        <motion.div 
          className="flex justify-center mb-4"
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
      )}
      <CardTitle className="text-xl gradient-text">{title}</CardTitle>
      {description && (
        <CardDescription className="text-base">{description}</CardDescription>
      )}
    </CardHeader>
  );
};

export const AnimatedCardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <CardContent className={className}>
      {children}
    </CardContent>
  );
};