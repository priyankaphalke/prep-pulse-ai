import { RoleInfo, InterviewQuestion } from '@/types/assessment';

export const TARGET_ROLES: RoleInfo[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Technical coding interviews, system design, and problem-solving assessments',
    icon: '💻',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Product sense, strategy, metrics, and stakeholder communication',
    icon: '📊',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'SQL, analytics, data storytelling, and business insights',
    icon: '📈',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Machine learning, statistics, and technical presentations',
    icon: '🧠',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Design process, portfolio presentation, and user research',
    icon: '🎨',
    color: 'from-rose-500 to-red-500',
  },
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    description: 'Campaign strategy, brand storytelling, and growth metrics',
    icon: '📣',
    color: 'from-indigo-500 to-violet-500',
  },
];

export const SAMPLE_QUESTIONS: Record<string, InterviewQuestion[]> = {
  'software-engineer': [
    {
      id: 'se-1',
      question: 'Tell me about a challenging technical problem you solved. Walk me through your approach.',
      category: 'behavioral',
      difficulty: 'medium',
      expected_duration: 90,
    },
    {
      id: 'se-2',
      question: 'Describe a time when you had to learn a new technology quickly. How did you approach it?',
      category: 'behavioral',
      difficulty: 'easy',
      expected_duration: 60,
    },
    {
      id: 'se-3',
      question: 'How would you design a URL shortening service like bit.ly?',
      category: 'technical',
      difficulty: 'hard',
      expected_duration: 90,
    },
  ],
  'product-manager': [
    {
      id: 'pm-1',
      question: 'Tell me about a product you launched. What was your strategy and how did you measure success?',
      category: 'behavioral',
      difficulty: 'medium',
      expected_duration: 90,
    },
    {
      id: 'pm-2',
      question: 'How would you prioritize features for a new mobile banking app?',
      category: 'situational',
      difficulty: 'medium',
      expected_duration: 90,
    },
  ],
  'data-analyst': [
    {
      id: 'da-1',
      question: 'Describe a time when you used data to influence a business decision. What was the outcome?',
      category: 'behavioral',
      difficulty: 'medium',
      expected_duration: 90,
    },
    {
      id: 'da-2',
      question: 'How would you investigate a sudden 20% drop in user engagement?',
      category: 'situational',
      difficulty: 'medium',
      expected_duration: 90,
    },
  ],
  'data-scientist': [
    {
      id: 'ds-1',
      question: 'Tell me about a machine learning project you worked on. What approach did you take?',
      category: 'technical',
      difficulty: 'medium',
      expected_duration: 90,
    },
  ],
  'ux-designer': [
    {
      id: 'ux-1',
      question: 'Walk me through your design process for a recent project. How did you validate your decisions?',
      category: 'behavioral',
      difficulty: 'medium',
      expected_duration: 90,
    },
  ],
  'marketing-manager': [
    {
      id: 'mm-1',
      question: 'Tell me about a successful marketing campaign you led. What made it effective?',
      category: 'behavioral',
      difficulty: 'medium',
      expected_duration: 90,
    },
  ],
};

export const READINESS_THRESHOLDS = {
  Beginner: { min: 0, max: 39 },
  Practicing: { min: 40, max: 64 },
  Ready: { min: 65, max: 84 },
  Expert: { min: 85, max: 100 },
};

export const DIMENSION_COLORS = {
  clarity: '#0EA5E9',
  confidence: '#8B5CF6',
  content: '#22C55E',
  structure: '#F59E0B',
};

export const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'so', 'right', 'I mean'];
