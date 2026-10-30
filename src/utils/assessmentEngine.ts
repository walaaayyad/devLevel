/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AnswerRecord,
  AssessmentConfig,
  AssessmentResult,
  DifficultyLevel,
  LevelResult,
  Technology
} from '../types/quiz.ts';
import { calculatePercentage, formatDate } from './scoring.ts';
import { analyzeTopicPerformances } from './topicAnalysis.ts';

export const DEFAULT_ASSESSMENT_CONFIG: AssessmentConfig = {
  passingThresholdPercent: 70, // 70% required to advance
  questionsPerLevel: 10,
  minTopicQuestionsForReliability: 2
};

export const LEVEL_ORDER: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];

export function getNextLevel(currentLevel: DifficultyLevel): DifficultyLevel | null {
  const currentIndex = LEVEL_ORDER.indexOf(currentLevel);
  if (currentIndex >= 0 && currentIndex < LEVEL_ORDER.length - 1) {
    return LEVEL_ORDER[currentIndex + 1];
  }
  return null;
}

export function evaluateLevelResult(
  level: DifficultyLevel,
  answers: AnswerRecord[],
  timeSpentSeconds: number,
  config: AssessmentConfig = DEFAULT_ASSESSMENT_CONFIG
): LevelResult {
  const levelAnswers = answers.filter(a => a.level === level);
  const totalQuestions = levelAnswers.length;
  const correctAnswers = levelAnswers.filter(a => a.isCorrect).length;
  const scorePercentage = calculatePercentage(correctAnswers, totalQuestions);
  const passed = scorePercentage >= config.passingThresholdPercent;

  const topicsPassed = Array.from(
    new Set(levelAnswers.filter(a => a.isCorrect).map(a => a.topic))
  );
  const topicsFailed = Array.from(
    new Set(levelAnswers.filter(a => !a.isCorrect).map(a => a.topic))
  );

  return {
    level,
    totalQuestions,
    correctAnswers,
    scorePercentage,
    passed,
    timeSpentSeconds,
    topicsPassed,
    topicsFailed
  };
}

export function determineClassification(
  levelResults: Record<DifficultyLevel, LevelResult | null>
): { classification: DifficultyLevel; reason: string; passedAll: boolean } {
  const beg = levelResults.beginner;
  const int = levelResults.intermediate;
  const adv = levelResults.advanced;

  // Passed all 3 levels (>= 70% in all three)
  if (beg?.passed && int?.passed && adv?.passed) {
    return {
      classification: 'advanced',
      reason: `You passed Beginner (${beg.scorePercentage}%), Intermediate (${int.scorePercentage}%), and Advanced (${adv.scorePercentage}%), proving mastery across all front-end assessment tiers.`,
      passedAll: true
    };
  }

  // Passed Beginner & Intermediate, but failed or didn't pass Advanced
  if (beg?.passed && int?.passed) {
    const advNote = adv ? `advanced attempt scored ${adv.scorePercentage}% (threshold: 70%)` : 'advanced level unattempted';
    return {
      classification: 'intermediate',
      reason: `You unlocked and passed Beginner (${beg.scorePercentage}%) and Intermediate (${int.scorePercentage}%). Your ${advNote}.`,
      passedAll: false
    };
  }

  // Did not pass Intermediate (either failed Beginner or failed Intermediate)
  const begScore = beg ? `${beg.scorePercentage}%` : 'N/A';
  const intScore = int ? `, Intermediate: ${int.scorePercentage}%` : '';
  return {
    classification: 'beginner',
    reason: `Your verified proficiency level is Beginner (Beginner: ${begScore}${intScore}). Strengthen foundational topics to unlock higher levels.`,
    passedAll: false
  };
}

export function generateAttemptId(): string {
  return `devlevel_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function createAssessmentResult(
  id: string,
  technology: Technology,
  levelBreakdown: Record<DifficultyLevel, LevelResult | null>,
  answers: AnswerRecord[],
  totalTimeSeconds: number,
  config: AssessmentConfig = DEFAULT_ASSESSMENT_CONFIG
): AssessmentResult {
  const levelsCompleted: DifficultyLevel[] = [];
  let totalQuestions = 0;
  let totalCorrect = 0;

  for (const lvl of LEVEL_ORDER) {
    const res = levelBreakdown[lvl];
    if (res) {
      levelsCompleted.push(lvl);
      totalQuestions += res.totalQuestions;
      totalCorrect += res.correctAnswers;
    }
  }

  const totalIncorrect = totalQuestions - totalCorrect;
  const overallAccuracy = calculatePercentage(totalCorrect, totalQuestions);
  const { classification, reason, passedAll } = determineClassification(levelBreakdown);
  const { topicPerformances, strengths, weaknesses } = analyzeTopicPerformances(
    answers,
    config.minTopicQuestionsForReliability
  );

  const timestamp = Date.now();

  return {
    id,
    technology,
    date: formatDate(timestamp),
    timestamp,
    finalClassification: classification,
    classificationReason: reason,
    levelsCompleted,
    levelBreakdown,
    totalQuestions,
    totalCorrect,
    totalIncorrect,
    overallAccuracy,
    totalTimeSeconds,
    topicPerformances,
    strengths,
    weaknesses,
    answers,
    passedAll
  };
}
