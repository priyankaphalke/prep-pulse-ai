import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AssessmentModeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
  color: string;
}

export function AssessmentModeCard({
  title,
  description,
  icon: Icon,
  isSelected,
  onClick,
  color,
}: AssessmentModeCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-glow'
          : 'border-border bg-card hover:border-primary/30'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      
      {isSelected && (
        <motion.div
          layoutId="selected-indicator"
          className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      )}
    </motion.button>
  );
}
