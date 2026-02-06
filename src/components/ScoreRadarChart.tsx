import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { DimensionScores } from '@/types/assessment';
import { DIMENSION_COLORS } from '@/lib/constants';

interface ScoreRadarChartProps {
  scores: DimensionScores;
  animated?: boolean;
}

export function ScoreRadarChart({ scores, animated = true }: ScoreRadarChartProps) {
  const data = [
    { dimension: 'Clarity', score: scores.clarity, fullMark: 25 },
    { dimension: 'Confidence', score: scores.confidence, fullMark: 25 },
    { dimension: 'Content', score: scores.content, fullMark: 25 },
    { dimension: 'Structure', score: scores.structure, fullMark: 25 },
  ];

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.8 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full h-[300px] md:h-[350px] radar-bg rounded-2xl p-4"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid
            stroke="hsl(var(--border))"
            strokeOpacity={0.5}
          />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 25]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            tickCount={6}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke={DIMENSION_COLORS.clarity}
            fill={DIMENSION_COLORS.clarity}
            fillOpacity={0.3}
            strokeWidth={2}
            animationDuration={animated ? 1000 : 0}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
