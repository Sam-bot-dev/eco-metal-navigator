import { motion } from "framer-motion";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  loading?: boolean;
  pulse?: boolean;
  float?: boolean;
}

export const AnimatedButton = ({ 
  children, 
  className, 
  loading = false,
  pulse = false,
  float = false,
  asChild = false,
  ...props 
}: AnimatedButtonProps) => {
  if (asChild) {
    return (
      <Button
        {...props}
        asChild
        disabled={loading || props.disabled}
        className={cn(
          "relative overflow-hidden transition-all duration-300 ease-out transform hover:scale-105 active:scale-95",
          loading && "cursor-not-allowed",
          float && "hover-float",
          pulse && "pulse-glow",
          className
        )}
      >
        {children}
      </Button>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        float && "hover-float",
        pulse && "pulse-glow"
      )}
    >
      <Button 
        {...props} 
        disabled={loading || props.disabled}
        className={cn(
          "relative overflow-hidden",
          loading && "cursor-not-allowed",
          className
        )}
      >
        {loading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        )}
        <motion.span
          className="flex items-center gap-2"
          animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
        >
          {loading && (
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
          {children}
        </motion.span>
      </Button>
    </motion.div>
  );
};