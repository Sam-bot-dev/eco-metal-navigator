import { motion } from "framer-motion";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface ProfessionalButtonProps extends ButtonProps {
  loading?: boolean;
  glow?: boolean;
}

export const ProfessionalButton = ({ 
  children, 
  className, 
  loading = false,
  glow = false,
  ...props 
}: ProfessionalButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <Button 
        {...props} 
        disabled={loading || props.disabled}
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          loading && "cursor-not-allowed opacity-70",
          glow && "pulse-professional",
          className
        )}
      >
        {loading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        )}
        <span className="flex items-center gap-2 relative z-10">
          {loading && <div className="loading-spinner" />}
          {children}
        </span>
      </Button>
    </motion.div>
  );
};