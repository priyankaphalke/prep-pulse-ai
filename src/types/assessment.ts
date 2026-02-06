export type TargetRole = 
  | 'software-engineer'
  | 'product-manager'
  | 'data-analyst'
  | 'data-scientist'
  | 'ux-designer'
  | 'marketing-manager';

export interface RoleInfo {
  id: TargetRole;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export type ReadinessLevel = 'Beginner' | 'Practicing' | 'Ready' | 'Expert';

export interface DimensionScores {
  clarity: number;
  confidence: number;
  content: number;
  structure: number;
}

export interface SpeechAnalysis {
  pace_rating: 'Slow' | 'Good' | 'Fast';
  filler_word_percentage: number;
  confidence_indicators: string[];
  words_per_minute: number;
  filler_count: number;
  pause_duration: number;
}

export interface StructureCompliance {
  star_method_used: boolean;
  missing_components: ('situation' | 'task' | 'action' | 'result')[];
}

export interface AssessmentResult {
  scores: DimensionScores;
  total_score: number;
  readiness_level: ReadinessLevel;
  speech_analysis: SpeechAnalysis;
  structure_compliance: StructureCompliance;
  strengths: string[];
  critical_gaps: string[];
  interviewer_perception: string;
  priority_fixes: string[];
  practice_question: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  target_role: TargetRole;
  question: string;
  transcript: string;
  audio_url?: string;
  result: AssessmentResult;
  created_at: string;
}

export interface ProgressEntry {
  id: string;
  user_id: string;
  date: string;
  overall_score: number;
  dimension_scores: DimensionScores;
}

export interface ParsedResume {
  id: string;
  user_id: string;
  file_url: string;
  parsed_skills: string[];
  gaps_identified: string[];
  target_role: TargetRole;
  match_percentage: number;
  created_at: string;
}

export type InterviewerPersona = 'Friendly' | 'Stress' | 'Tech';

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'behavioral' | 'technical' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  expected_duration: number; // seconds
}

export type AssessmentMode = 'voice' | 'resume' | 'quiz';
