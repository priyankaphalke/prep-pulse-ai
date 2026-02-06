import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Download, RotateCcw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { ScoreCard } from '@/components/ScoreCard';
import { ScoreRadarChart } from '@/components/ScoreRadarChart';
import { FeedbackCard } from '@/components/FeedbackCard';
import { AssessmentResult } from '@/types/assessment';

interface StoredAssessment {
  question: string;
  transcript: string;
  result: AssessmentResult;
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<StoredAssessment | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('lastAssessmentResult');
    if (stored) {
      setAssessment(JSON.parse(stored));
    }
  }, []);

  if (!assessment) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12 text-center">
          <p className="text-muted-foreground">No assessment results found.</p>
          <Button className="mt-4" onClick={() => navigate('/assessment')}>
            Start Assessment
          </Button>
        </main>
      </div>
    );
  }

  const { question, transcript, result } = assessment;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={() => navigate('/assessment')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessment
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Results</h1>
          <p className="text-muted-foreground">Here's how you performed in this assessment</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Scores */}
          <div className="lg:col-span-1 space-y-6">
            <ScoreCard
              scores={result.scores}
              totalScore={result.total_score}
              readinessLevel={result.readiness_level}
            />
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-card"
            >
              <h3 className="font-semibold mb-4">Performance Overview</h3>
              <ScoreRadarChart scores={result.scores} />
            </motion.div>

            {/* Question & Response */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-card"
            >
              <h3 className="font-semibold mb-4">Your Response</h3>
              <div className="mb-4 p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Question</p>
                <p className="font-medium">{question}</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Transcript</p>
                <p className="text-sm leading-relaxed">{transcript}</p>
              </div>
            </motion.div>

            {/* Speech Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-card"
            >
              <h3 className="font-semibold mb-4">Speech Analysis</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-2xl font-bold">{result.speech_analysis.words_per_minute}</p>
                  <p className="text-xs text-muted-foreground">Words/min</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-2xl font-bold">{result.speech_analysis.pace_rating}</p>
                  <p className="text-xs text-muted-foreground">Pace</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-2xl font-bold">{result.speech_analysis.filler_count}</p>
                  <p className="text-xs text-muted-foreground">Filler Words</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-2xl font-bold">{result.structure_compliance.star_method_used ? '✓' : '✗'}</p>
                  <p className="text-xs text-muted-foreground">STAR Method</p>
                </div>
              </div>
            </motion.div>

            {/* Feedback Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeedbackCard
                type="strength"
                title="What You Did Well"
                items={result.strengths}
                delay={0.5}
              />
              <FeedbackCard
                type="gap"
                title="Areas to Improve"
                items={result.critical_gaps}
                delay={0.6}
              />
              <FeedbackCard
                type="perception"
                title="Interviewer Perception"
                items={[result.interviewer_perception]}
                delay={0.7}
              />
              <FeedbackCard
                type="fix"
                title="Priority Fixes"
                items={result.priority_fixes}
                delay={0.8}
              />
            </div>

            {/* Next Question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-primary/5 border border-primary/20 rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-2 text-primary">Practice This Next</h3>
              <p className="text-foreground mb-4">{result.practice_question}</p>
              <Button onClick={() => navigate('/assessment')}>
                Practice Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex justify-center gap-4"
        >
          <Button variant="outline" onClick={() => navigate('/assessment')}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Another Question
          </Button>
          <Button onClick={() => navigate('/progress')}>
            View Progress
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
