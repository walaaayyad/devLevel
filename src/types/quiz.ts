/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Technology = 'html' | 'css' | 'javascript';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: string;
  technology: Technology;
  level: DifficultyLevel;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  codeSnippet?: string;
  learningObjective?: string;
}

export interface AnswerRecord {
  questionId: string;
  technology: Technology;
  level: DifficultyLevel;
  topic: string;
  questionText: string;
  codeSnippet?: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  options: string[];
  learningObjective?: string;
  timestamp: number;
}

export interface LevelResult {
  level: DifficultyLevel;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  topicsPassed: string[];
  topicsFailed: string[];
}

export interface TopicPerformance {
  topic: string;
  attempted: number;
  correct: number;
  accuracyPercentage: number;
  isReliable: boolean; // Minimum questions threshold met
  status: 'mastered' | 'proficient' | 'needs-review';
  reviewGuidance: string;
  suggestedObjective: string;
  practiceTask: string;
}

export interface AssessmentResult {
  id: string;
  technology: Technology;
  date: string;
  timestamp: number;
  finalClassification: DifficultyLevel;
  classificationReason: string;
  levelsCompleted: DifficultyLevel[];
  levelBreakdown: Record<DifficultyLevel, LevelResult | null>;
  totalQuestions: number;
  totalCorrect: number;
  totalIncorrect: number;
  overallAccuracy: number;
  totalTimeSeconds: number;
  topicPerformances: TopicPerformance[];
  strengths: TopicPerformance[];
  weaknesses: TopicPerformance[];
  answers: AnswerRecord[];
  passedAll: boolean;
}

export interface AssessmentConfig {
  passingThresholdPercent: number; // e.g. 70
  questionsPerLevel: number; // e.g. 10
  minTopicQuestionsForReliability: number; // e.g. 2
}

export interface TechnologyInfo {
  id: Technology;
  name: string;
  subtitle: string;
  description: string;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  icon: string;
  levels: {
    level: DifficultyLevel;
    label: string;
    questionCount: number;
  }[];
}

export interface InProgressQuizState {
  attemptId: string;
  technology: Technology;
  currentLevel: DifficultyLevel;
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  isSubmitted: boolean;
  shuffledOptions: string[];
  answers: AnswerRecord[];
  levelResults: Record<DifficultyLevel, LevelResult | null>;
  startTime: number;
  levelStartTime: number;
  isLevelSummary: boolean;
}
