import { motion } from 'framer-motion';
import { Mic, Square } from 'lucide-react';

interface RecordButtonProps {
  isRecording: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function RecordButton({ isRecording, onClick, disabled }: RecordButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center justify-center w-20 h-20 rounded-full transition-colors ${
        isRecording
          ? 'bg-destructive text-destructive-foreground'
          : 'bg-primary text-primary-foreground'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
    >
      {/* Pulsing ring when recording */}
      {isRecording && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full bg-destructive"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-destructive"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
        </>
      )}
      
      <motion.div
        initial={false}
        animate={{ rotate: isRecording ? 0 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isRecording ? (
          <Square className="h-8 w-8" fill="currentColor" />
        ) : (
          <Mic className="h-8 w-8" />
        )}
      </motion.div>
    </motion.button>
  );
}
