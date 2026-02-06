import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Check, X, Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { TARGET_ROLES } from '@/lib/constants';
import { TargetRole } from '@/types/assessment';

interface SkillMatch {
  skill: string;
  found: boolean;
  importance: 'high' | 'medium' | 'low';
}

interface ResumeAnalysis {
  matchPercentage: number;
  foundSkills: string[];
  missingSkills: string[];
  skillMatches: SkillMatch[];
  recommendations: string[];
}

// Mock skill requirements by role
const ROLE_REQUIREMENTS: Record<string, string[]> = {
  'software-engineer': [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL',
    'Git', 'REST APIs', 'Data Structures', 'Algorithms', 'System Design',
    'Testing', 'CI/CD', 'Cloud (AWS/GCP)', 'Docker'
  ],
  'product-manager': [
    'Product Strategy', 'User Research', 'Agile/Scrum', 'Data Analysis',
    'Roadmapping', 'Stakeholder Management', 'A/B Testing', 'SQL',
    'Wireframing', 'Market Analysis', 'KPIs/Metrics', 'JIRA'
  ],
  'data-analyst': [
    'SQL', 'Python', 'Excel', 'Tableau', 'Power BI', 'Statistics',
    'Data Visualization', 'ETL', 'A/B Testing', 'Regression Analysis',
    'Machine Learning Basics', 'Business Intelligence'
  ],
};

export default function ResumePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  
  const targetRole = (localStorage.getItem('targetRole') as TargetRole) || 'software-engineer';
  const roleInfo = TARGET_ROLES.find(r => r.id === targetRole);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type === 'text/plain')) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const analyzeResume = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis (will integrate with AI later)
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const requirements = ROLE_REQUIREMENTS[targetRole] || ROLE_REQUIREMENTS['software-engineer'];
    
    // Mock analysis - randomly select some skills as found
    const foundSkills = requirements.filter(() => Math.random() > 0.4);
    const missingSkills = requirements.filter(s => !foundSkills.includes(s));
    
    const skillMatches: SkillMatch[] = requirements.map((skill, i) => ({
      skill,
      found: foundSkills.includes(skill),
      importance: i < 5 ? 'high' : i < 10 ? 'medium' : 'low',
    }));
    
    const mockAnalysis: ResumeAnalysis = {
      matchPercentage: Math.round((foundSkills.length / requirements.length) * 100),
      foundSkills,
      missingSkills,
      skillMatches,
      recommendations: [
        `Add more ${missingSkills[0]} experience to your resume`,
        `Highlight any projects involving ${missingSkills[1] || 'relevant technologies'}`,
        'Quantify your achievements with specific metrics',
        'Include keywords from job descriptions',
      ],
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-4">
            <span className="text-lg">{roleInfo?.icon}</span>
            <span className="font-medium">{roleInfo?.title}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Resume Analysis</h1>
          <p className="text-muted-foreground">Upload your resume to identify skill gaps</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Upload Area */}
          {!analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={handleFileSelect}
              />
              
              {file ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" onClick={() => setFile(null)}>
                      Remove
                    </Button>
                    <Button onClick={analyzeResume} disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze Resume
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-secondary rounded-2xl flex items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Drop your resume here</p>
                    <p className="text-sm text-muted-foreground">
                      or{' '}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-primary hover:underline"
                      >
                        browse files
                      </button>
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF and TXT files
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Analysis Results */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Match Score */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-card text-center">
                  <h3 className="text-lg font-medium text-muted-foreground mb-4">Role Match</h3>
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="hsl(var(--border))"
                        strokeWidth="12"
                        fill="none"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke={analysis.matchPercentage >= 70 ? 'hsl(var(--content))' : analysis.matchPercentage >= 50 ? 'hsl(var(--structure))' : 'hsl(var(--destructive))'}
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 70}
                        initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - analysis.matchPercentage / 100) }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">{analysis.matchPercentage}%</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {analysis.matchPercentage >= 70
                      ? 'Strong match for this role!'
                      : analysis.matchPercentage >= 50
                      ? 'Good foundation, some gaps to address'
                      : 'Consider building more relevant skills'}
                  </p>
                </div>

                {/* Skill Matches Grid */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <h3 className="font-semibold mb-4">Skills Assessment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {analysis.skillMatches.map((match, index) => (
                      <motion.div
                        key={match.skill}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          match.found ? 'bg-green-500/10' : 'bg-secondary'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {match.found ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className={match.found ? 'text-foreground' : 'text-muted-foreground'}>
                            {match.skill}
                          </span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          match.importance === 'high' 
                            ? 'bg-red-500/20 text-red-500'
                            : match.importance === 'medium'
                            ? 'bg-amber-500/20 text-amber-500'
                            : 'bg-gray-500/20 text-gray-500'
                        }`}>
                          {match.importance}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                    <AlertCircle className="h-5 w-5" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-2 text-foreground"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {rec}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => { setFile(null); setAnalysis(null); }}>
                    Upload New Resume
                  </Button>
                  <Button onClick={() => navigate('/assessment')}>
                    Start Practice Interview
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
