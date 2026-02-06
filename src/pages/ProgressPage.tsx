import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Calendar, TrendingUp, Award, Target } from 'lucide-react';
import { Header } from '@/components/Header';
import { DIMENSION_COLORS } from '@/lib/constants';

// Mock progress data
const mockProgressData = [
  { date: 'Jan 15', clarity: 15, confidence: 12, content: 14, structure: 11, total: 52 },
  { date: 'Jan 18', clarity: 17, confidence: 14, content: 15, structure: 13, total: 59 },
  { date: 'Jan 22', clarity: 18, confidence: 15, content: 17, structure: 14, total: 64 },
  { date: 'Jan 25', clarity: 19, confidence: 17, content: 18, structure: 16, total: 70 },
  { date: 'Jan 29', clarity: 20, confidence: 18, content: 19, structure: 17, total: 74 },
  { date: 'Feb 1', clarity: 21, confidence: 19, content: 20, structure: 18, total: 78 },
  { date: 'Feb 4', clarity: 22, confidence: 20, content: 21, structure: 19, total: 82 },
];

const stats = [
  {
    label: 'Total Assessments',
    value: '12',
    icon: Target,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    label: 'Current Streak',
    value: '5 days',
    icon: Calendar,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    label: 'Improvement',
    value: '+30%',
    icon: TrendingUp,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    label: 'Best Score',
    value: '82/100',
    icon: Award,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

export default function ProgressPage() {
  const [progressData, setProgressData] = useState(mockProgressData);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Progress</h1>
          <p className="text-muted-foreground">Track your interview readiness over time</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-card border border-border rounded-2xl p-5 shadow-card"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-6 shadow-card mb-8"
        >
          <h3 className="font-semibold mb-6">Score Progression</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Total Score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Dimension Breakdown Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-6 shadow-card"
        >
          <h3 className="font-semibold mb-6">Dimension Progress</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  domain={[0, 25]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="clarity"
                  name="Clarity"
                  stroke={DIMENSION_COLORS.clarity}
                  strokeWidth={2}
                  dot={{ fill: DIMENSION_COLORS.clarity }}
                />
                <Line
                  type="monotone"
                  dataKey="confidence"
                  name="Confidence"
                  stroke={DIMENSION_COLORS.confidence}
                  strokeWidth={2}
                  dot={{ fill: DIMENSION_COLORS.confidence }}
                />
                <Line
                  type="monotone"
                  dataKey="content"
                  name="Content"
                  stroke={DIMENSION_COLORS.content}
                  strokeWidth={2}
                  dot={{ fill: DIMENSION_COLORS.content }}
                />
                <Line
                  type="monotone"
                  dataKey="structure"
                  name="Structure"
                  stroke={DIMENSION_COLORS.structure}
                  strokeWidth={2}
                  dot={{ fill: DIMENSION_COLORS.structure }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Velocity Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-6"
        >
          <h3 className="font-semibold mb-2 text-primary flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progress Velocity
          </h3>
          <p className="text-foreground">
            You're improving at <span className="font-bold text-primary">+4.3 points/week</span>. 
            At this rate, you'll reach "Ready" level in approximately <span className="font-bold">2 weeks</span>.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
