import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Zap, Trophy, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  targetArea: 'clarity' | 'confidence' | 'content' | 'structure';
  completed?: boolean;
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Elevator Pitch Sprint',
    description: 'Introduce yourself in 30 seconds. Focus on clarity and impact.',
    duration: 2,
    difficulty: 'Easy',
    targetArea: 'clarity',
  },
  {
    id: '2',
    title: 'STAR Story Builder',
    description: 'Practice answering "Tell me about a time..." with perfect structure.',
    duration: 3,
    difficulty: 'Medium',
    targetArea: 'structure',
  },
  {
    id: '3',
    title: 'Filler Word Eliminator',
    description: 'Speak for 60 seconds without using um, uh, like, or you know.',
    duration: 2,
    difficulty: 'Medium',
    targetArea: 'confidence',
  },
  {
    id: '4',
    title: 'Technical Deep Dive',
    description: 'Explain a complex concept simply. Show depth without jargon.',
    duration: 3,
    difficulty: 'Hard',
    targetArea: 'content',
  },
  {
    id: '5',
    title: 'Rapid Fire Q&A',
    description: '5 quick questions, 15 seconds each. Think on your feet!',
    duration: 2,
    difficulty: 'Hard',
    targetArea: 'confidence',
  },
  {
    id: '6',
    title: 'Achievement Showcase',
    description: 'Describe your biggest win with specific metrics and impact.',
    duration: 2,
    difficulty: 'Easy',
    targetArea: 'content',
  },
];

const difficultyColors = {
  Easy: 'bg-green-500/10 text-green-600 border-green-500/20',
  Medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Hard: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const areaColors = {
  clarity: 'text-clarity',
  confidence: 'text-confidence',
  content: 'text-content',
  structure: 'text-structure',
};

export default function PracticePage() {
  const navigate = useNavigate();
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const handleStartChallenge = (challenge: Challenge) => {
    // For now, navigate to assessment with the challenge context
    localStorage.setItem('currentChallenge', JSON.stringify(challenge));
    navigate('/assessment');
  };

  const toggleComplete = (id: string) => {
    setCompletedChallenges(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Zap className="h-4 w-4" />
            <span className="font-medium">Micro-Challenges</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Practice Challenges</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            2-minute targeted exercises to strengthen your weakest areas. Complete daily for rapid improvement.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Daily Progress</span>
            <span className="font-medium">{completedChallenges.length}/{challenges.length}</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedChallenges.length / challenges.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {challenges.map((challenge, index) => {
            const isCompleted = completedChallenges.includes(challenge.id);
            
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`relative bg-card border rounded-2xl p-6 shadow-card transition-all ${
                  isCompleted ? 'border-primary/30 bg-primary/5' : 'border-border hover:border-primary/20'
                }`}
              >
                {/* Completed Badge */}
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                )}

                {/* Difficulty & Duration */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full border ${difficultyColors[challenge.difficulty]}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {challenge.duration} min
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-semibold mb-2">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>

                {/* Target Area */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium uppercase ${areaColors[challenge.targetArea]}`}>
                    {challenge.targetArea}
                  </span>
                  
                  <Button
                    size="sm"
                    variant={isCompleted ? 'outline' : 'default'}
                    onClick={() => isCompleted ? toggleComplete(challenge.id) : handleStartChallenge(challenge)}
                  >
                    {isCompleted ? (
                      'Retry'
                    ) : (
                      <>
                        Start
                        <Play className="ml-1 h-3 w-3" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Streak Bonus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 text-center">
            <Trophy className="h-10 w-10 text-amber-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">Daily Streak Bonus</h3>
            <p className="text-sm text-muted-foreground">
              Complete all challenges today to maintain your streak and unlock special practice scenarios!
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
