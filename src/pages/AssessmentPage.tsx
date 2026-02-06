import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mic, FileText, Zap, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { AssessmentModeCard } from '@/components/AssessmentModeCard';
import { WaveformVisualizer } from '@/components/WaveformVisualizer';
import { RecordButton } from '@/components/RecordButton';
import { SAMPLE_QUESTIONS, TARGET_ROLES } from '@/lib/constants';
import { AssessmentMode, TargetRole, AssessmentResult, InterviewQuestion } from '@/types/assessment';
import type { SpeechRecognition as SpeechRecognitionType } from '@/types/speech-recognition.d';

const modes = [
  {
    id: 'voice' as AssessmentMode,
    title: 'Voice Interview',
    description: 'Record your answer and get AI analysis',
    icon: Mic,
    color: 'bg-primary',
  },
  {
    id: 'resume' as AssessmentMode,
    title: 'Resume Analysis',
    description: 'Upload your resume for skill gap detection',
    icon: FileText,
    color: 'bg-content',
  },
  {
    id: 'quiz' as AssessmentMode,
    title: 'Quick Quiz',
    description: '5-minute knowledge check',
    icon: Zap,
    color: 'bg-confidence',
  },
];

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<AssessmentMode>('voice');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Get target role from localStorage
  const targetRole = (localStorage.getItem('targetRole') as TargetRole) || 'software-engineer';
  const roleInfo = TARGET_ROLES.find(r => r.id === targetRole);
  const questions = SAMPLE_QUESTIONS[targetRole] || SAMPLE_QUESTIONS['software-engineer'];

  useEffect(() => {
    // Select a random question on mount
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      
      // Set up MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.start();
      
      // Set up Speech Recognition
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        const recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            }
          }
          
          setTranscript(prev => {
            if (finalTranscript) {
              return prev + finalTranscript + ' ';
            }
            return prev;
          });
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
        };
        
        recognition.start();
        recognitionRef.current = recognition;
      }
      
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      setAudioStream(null);
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsRecording(false);
  }, [audioStream]);

  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      setTranscript('');
      startRecording();
    }
  };

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis for now (will integrate with backend later)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock result
    const mockResult: AssessmentResult = {
      scores: {
        clarity: Math.floor(Math.random() * 10) + 15,
        confidence: Math.floor(Math.random() * 10) + 12,
        content: Math.floor(Math.random() * 10) + 14,
        structure: Math.floor(Math.random() * 10) + 13,
      },
      total_score: 0,
      readiness_level: 'Practicing',
      speech_analysis: {
        pace_rating: 'Good',
        filler_word_percentage: 5,
        confidence_indicators: ['steady_pace', 'clear_articulation'],
        words_per_minute: 140,
        filler_count: 3,
        pause_duration: 2.5,
      },
      structure_compliance: {
        star_method_used: true,
        missing_components: ['result'],
      },
      strengths: [
        'Clear articulation of the problem statement',
        'Good use of specific examples',
        'Demonstrated technical knowledge',
      ],
      critical_gaps: [
        'Missing quantified impact or results',
        'Could elaborate more on lessons learned',
      ],
      interviewer_perception: 'Comes across as knowledgeable but could be more results-oriented.',
      priority_fixes: [
        'Always end answers with measurable outcomes',
        'Practice the STAR method for behavioral questions',
      ],
      practice_question: 'Tell me about a time you had to make a difficult decision with limited information.',
    };
    
    mockResult.total_score = Object.values(mockResult.scores).reduce((a, b) => a + b, 0);
    
    if (mockResult.total_score >= 85) mockResult.readiness_level = 'Expert';
    else if (mockResult.total_score >= 65) mockResult.readiness_level = 'Ready';
    else if (mockResult.total_score >= 40) mockResult.readiness_level = 'Practicing';
    else mockResult.readiness_level = 'Beginner';
    
    // Store result and navigate
    localStorage.setItem('lastAssessmentResult', JSON.stringify({
      question: currentQuestion?.question,
      transcript,
      result: mockResult,
    }));
    
    setIsAnalyzing(false);
    navigate('/results');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        {/* Role Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
            <span className="text-lg">{roleInfo?.icon}</span>
            <span className="font-medium">{roleInfo?.title}</span>
          </div>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          {modes.map((mode) => (
            <AssessmentModeCard
              key={mode.id}
              {...mode}
              isSelected={selectedMode === mode.id}
              onClick={() => setSelectedMode(mode.id)}
            />
          ))}
        </motion.div>

        {/* Voice Interview Interface */}
        <AnimatePresence mode="wait">
          {selectedMode === 'voice' && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              {/* Question Card */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-card">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span className="px-2 py-1 bg-secondary rounded text-xs font-medium uppercase">
                    {currentQuestion?.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {currentQuestion?.expected_duration}s recommended
                  </span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-semibold leading-relaxed">
                  {currentQuestion?.question}
                </h2>
              </div>

              {/* Recording Interface */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card">
                <div className="flex flex-col items-center">
                  {/* Waveform */}
                  <div className="w-full mb-6 bg-secondary/50 rounded-xl overflow-hidden">
                    <WaveformVisualizer isRecording={isRecording} audioStream={audioStream} />
                  </div>
                  
                  {/* Timer */}
                  <div className="text-3xl font-mono font-bold mb-4">
                    {formatTime(recordingTime)}
                  </div>
                  
                  {/* Record Button */}
                  <RecordButton
                    isRecording={isRecording}
                    onClick={handleRecordToggle}
                  />
                  
                  <p className="mt-4 text-sm text-muted-foreground">
                    {isRecording ? 'Click to stop recording' : 'Click to start recording'}
                  </p>
                  
                  {/* Keyboard hint */}
                  <p className="mt-2 text-xs text-muted-foreground">
                    Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">Space</kbd> to toggle
                  </p>
                </div>

                {/* Live Transcript */}
                {transcript && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-border"
                  >
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Live Transcript
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      {transcript}
                    </p>
                  </motion.div>
                )}

                {/* Analyze Button */}
                {transcript && !isRecording && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex justify-center"
                  >
                    <Button
                      size="lg"
                      className="btn-gradient px-8"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze Response
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10"
              >
                <h4 className="font-medium mb-2 text-primary">💡 Quick Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use the STAR method: Situation, Task, Action, Result</li>
                  <li>• Aim for 60-90 seconds per answer</li>
                  <li>• Include specific metrics and outcomes</li>
                </ul>
              </motion.div>
            </motion.div>
          )}

          {selectedMode === 'resume' && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-auto text-center"
            >
              <Button onClick={() => navigate('/resume')}>
                Go to Resume Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {selectedMode === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-auto text-center"
            >
              <Button onClick={() => navigate('/practice')}>
                Go to Practice Challenges
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
