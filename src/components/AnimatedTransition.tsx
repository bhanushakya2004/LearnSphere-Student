
import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ 
  children, 
  className,
  delay = 0 
}) => {
  return (
    <div 
      className={cn(
        "animate-enter",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'backwards'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
