import { motion } from 'framer-motion';
import { DimensionScores, ReadinessLevel } from '@/types/assessment';
import { DIMENSION_COLORS } from '@/lib/constants';

interface ScoreCardProps {
  scores: DimensionScores;
  totalScore: number;
  readinessLevel: ReadinessLevel;
}

const dimensionLabels = {
  clarity: 'Clarity',
  confidence: 'Confidence',
  content: 'Content',
  structure: 'Structure',
};

const levelStyles: Record<ReadinessLevel, string> = {
  Beginner: 'level-beginner',
  Practicing: 'level-practicing',
  Ready: 'level-ready',
  Expert: 'level-expert',
};

export function ScoreCard({ scores, totalScore, readinessLevel }: ScoreCardProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-card"
    >
      {/* Total Score Circle */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="hsl(var(--border))"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="45"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {totalScore}
            </motion.span>
            <span className="text-xs text-muted-foreground">out of 100</span>
          </div>
        </div>
        
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className={`mt-3 px-4 py-1.5 rounded-full text-sm font-medium border ${levelStyles[readinessLevel]}`}
        >
          {readinessLevel}
        </motion.span>
      </div>

      {/* Dimension Breakdown */}
      <div className="space-y-4">
        {(Object.keys(scores) as Array<keyof DimensionScores>).map((key, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{dimensionLabels[key]}</span>
              <span className="text-sm text-muted-foreground">{scores[key]}/25</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: DIMENSION_COLORS[key] }}
                initial={{ width: 0 }}
                animate={{ width: `${(scores[key] / 25) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
