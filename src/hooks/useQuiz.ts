/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getQuestionsForLevel } from '../data/allQuestions.ts';
import {
  AnswerRecord,
  AssessmentConfig,
  AssessmentResult,
  DifficultyLevel,
  InProgressQuizState,
  LevelResult,
  Question,
  Technology
} from '../types/quiz.ts';
import {
  createAssessmentResult,
  DEFAULT_ASSESSMENT_CONFIG,
  evaluateLevelResult,
  generateAttemptId,
  getNextLevel,
  LEVEL_ORDER
} from '../utils/assessmentEngine.ts';
import { shuffleArray } from '../utils/scoring.ts';
import { useLocalStorage } from './useLocalStorage.ts';

const ACTIVE_QUIZ_KEY = 'devlevel_active_quiz';
const HISTORY_KEY = 'devlevel_history';

export function useQuiz(config: AssessmentConfig = DEFAULT_ASSESSMENT_CONFIG) {
  const questionsPerLevel = config?.questionsPerLevel ?? DEFAULT_ASSESSMENT_CONFIG.questionsPerLevel;
  const passingThresholdPercent = config?.passingThresholdPercent ?? DEFAULT_ASSESSMENT_CONFIG.passingThresholdPercent;
  const minTopicQuestionsForReliability = config?.minTopicQuestionsForReliability ?? DEFAULT_ASSESSMENT_CONFIG.minTopicQuestionsForReliability;

  // Stored active attempt in LocalStorage for page refresh resumption
  const [persistedActiveState, setPersistedActiveState, clearPersistedActiveState] =
    useLocalStorage<InProgressQuizState | null>(ACTIVE_QUIZ_KEY, null);

  // Stored completed assessments history
  const [history, setHistory] = useLocalStorage<AssessmentResult[]>(HISTORY_KEY, []);

  // UI view state: 'home' | 'quiz' | 'level-summary' | 'results' | 'history'
  const [view, setView] = useState<'home' | 'quiz' | 'level-summary' | 'results' | 'history'>('home');

  // Active quiz runtime state
  const [attemptId, setAttemptId] = useState<string>('');
  const [technology, setTechnology] = useState<Technology>('html');
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>('beginner');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [levelResults, setLevelResults] = useState<Record<DifficultyLevel, LevelResult | null>>({
    beginner: null,
    intermediate: null,
    advanced: null
  });

  const [startTime, setStartTime] = useState<number>(0);
  const [levelStartTime, setLevelStartTime] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Result currently shown on results dashboard (could be fresh or opened from history)
  const [activeResult, setActiveResult] = useState<AssessmentResult | null>(null);

  // Exit dialog visibility
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);

  // Questions for the current technology and level
  const levelQuestions = useMemo<Question[]>(() => {
    return getQuestionsForLevel(technology, currentLevel, questionsPerLevel);
  }, [technology, currentLevel, questionsPerLevel]);

  const currentQuestion = useMemo<Question | null>(() => {
    return levelQuestions[currentQuestionIndex] || null;
  }, [levelQuestions, currentQuestionIndex]);

  // Shuffled options for current question
  const [shuffledOptions, setShuffledOptions] = useState<string[]>(() => {
    const initialQ = levelQuestions[0];
    return initialQ ? shuffleArray(initialQ.options) : [];
  });

  // Live timer tick when in quiz view
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (view === 'quiz' && startTime > 0) {
      interval = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [view, startTime]);

  // Sync active quiz state to LocalStorage so refreshes can be resumed
  useEffect(() => {
    if ((view === 'quiz' || view === 'level-summary') && attemptId && technology) {
      const stateToPersist: InProgressQuizState = {
        attemptId,
        technology,
        currentLevel,
        currentQuestionIndex,
        selectedAnswer,
        isSubmitted,
        shuffledOptions,
        answers,
        levelResults,
        startTime,
        levelStartTime,
        isLevelSummary: view === 'level-summary'
      };
      setPersistedActiveState(stateToPersist);
    }
  }, [
    view,
    attemptId,
    technology,
    currentLevel,
    currentQuestionIndex,
    selectedAnswer,
    isSubmitted,
    shuffledOptions,
    answers,
    levelResults,
    startTime,
    levelStartTime,
    setPersistedActiveState
  ]);

  // Start a new assessment for a selected technology
  const startAssessment = useCallback(
    (tech: Technology) => {
      const newId = generateAttemptId();
      const now = Date.now();
      const startingQuestions = getQuestionsForLevel(tech, 'beginner', questionsPerLevel);
      const firstQ = startingQuestions[0];

      setAttemptId(newId);
      setTechnology(tech);
      setCurrentLevel('beginner');
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setShuffledOptions(firstQ ? shuffleArray(firstQ.options) : []);
      setAnswers([]);
      setLevelResults({
        beginner: null,
        intermediate: null,
        advanced: null
      });
      setStartTime(now);
      setLevelStartTime(now);
      setElapsedSeconds(0);
      setActiveResult(null);
      setView('quiz');
    },
    [questionsPerLevel]
  );

  // Resume assessment from saved state
  const resumeAssessment = useCallback(() => {
    if (!persistedActiveState) return;
    setAttemptId(persistedActiveState.attemptId);
    setTechnology(persistedActiveState.technology);
    setCurrentLevel(persistedActiveState.currentLevel);
    setCurrentQuestionIndex(persistedActiveState.currentQuestionIndex);
    setSelectedAnswer(persistedActiveState.selectedAnswer);
    setIsSubmitted(persistedActiveState.isSubmitted);
    setShuffledOptions(persistedActiveState.shuffledOptions || []);
    setAnswers(persistedActiveState.answers);
    setLevelResults({
      beginner: persistedActiveState.levelResults.beginner || null,
      intermediate: persistedActiveState.levelResults.intermediate || null,
      advanced: persistedActiveState.levelResults.advanced || null
    });
    setStartTime(persistedActiveState.startTime || Date.now());
    setLevelStartTime(persistedActiveState.levelStartTime || Date.now());
    setView(persistedActiveState.isLevelSummary ? 'level-summary' : 'quiz');
  }, [persistedActiveState]);

  // Discard saved in-progress quiz
  const discardActiveAssessment = useCallback(() => {
    clearPersistedActiveState();
  }, [clearPersistedActiveState]);

  // Submit selected answer for current question
  const selectAndSubmitAnswer = useCallback(
    (option: string) => {
      if (isSubmitted || !currentQuestion) return;

      const isCorrect = option === currentQuestion.correctAnswer;
      setSelectedAnswer(option);
      setIsSubmitted(true);

      const record: AnswerRecord = {
        questionId: currentQuestion.id,
        technology: currentQuestion.technology,
        level: currentQuestion.level,
        topic: currentQuestion.topic,
        questionText: currentQuestion.question,
        codeSnippet: currentQuestion.codeSnippet,
        selectedAnswer: option,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
        explanation: currentQuestion.explanation,
        options: currentQuestion.options,
        learningObjective: currentQuestion.learningObjective,
        timestamp: Date.now()
      };

      setAnswers(prev => [...prev, record]);
    },
    [isSubmitted, currentQuestion]
  );

  // Advance to next question or complete level
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 < levelQuestions.length) {
      const nextIndex = currentQuestionIndex + 1;
      const nextQ = levelQuestions[nextIndex];

      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      if (nextQ) {
        setShuffledOptions(shuffleArray(nextQ.options));
      }
    } else {
      // Completed this level!
      const levelDuration = Math.max(1, Math.floor((Date.now() - levelStartTime) / 1000));
      const res = evaluateLevelResult(currentLevel, answers, levelDuration, {
        passingThresholdPercent,
        questionsPerLevel,
        minTopicQuestionsForReliability
      });

      setLevelResults(prev => ({
        ...prev,
        [currentLevel]: res
      }));

      setView('level-summary');
    }
  }, [
    currentQuestionIndex,
    levelQuestions,
    currentLevel,
    answers,
    levelStartTime,
    passingThresholdPercent,
    questionsPerLevel,
    minTopicQuestionsForReliability
  ]);

  // Advance to next level after passing level summary
  const proceedToNextLevel = useCallback(() => {
    const nextLvl = getNextLevel(currentLevel);
    if (!nextLvl) return;

    const nextLvlQuestions = getQuestionsForLevel(technology, nextLvl, questionsPerLevel);
    const firstQ = nextLvlQuestions[0];

    setCurrentLevel(nextLvl);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    if (firstQ) {
      setShuffledOptions(shuffleArray(firstQ.options));
    }
    setLevelStartTime(Date.now());
    setView('quiz');
  }, [currentLevel, technology, questionsPerLevel]);

  // Retry the current level
  const retryCurrentLevel = useCallback(() => {
    const lvlQuestions = getQuestionsForLevel(technology, currentLevel, questionsPerLevel);
    const firstQ = lvlQuestions[0];

    // Remove answers for this level so retry starts fresh without affecting prior levels
    setAnswers(prev => prev.filter(a => a.level !== currentLevel));
    setLevelResults(prev => ({
      ...prev,
      [currentLevel]: null
    }));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    if (firstQ) {
      setShuffledOptions(shuffleArray(firstQ.options));
    }
    setLevelStartTime(Date.now());
    setView('quiz');
  }, [currentLevel, technology, questionsPerLevel]);

  // Finalize assessment and build comprehensive report
  const finalizeAssessment = useCallback(() => {
    const totalTime = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
    const result = createAssessmentResult(
      attemptId,
      technology,
      levelResults,
      answers,
      totalTime,
      {
        passingThresholdPercent,
        questionsPerLevel,
        minTopicQuestionsForReliability
      }
    );

    // Persist to history
    setHistory(prev => [result, ...prev]);
    // Clear in-progress session
    clearPersistedActiveState();

    setActiveResult(result);
    setView('results');
  }, [
    attemptId,
    technology,
    levelResults,
    answers,
    startTime,
    passingThresholdPercent,
    questionsPerLevel,
    minTopicQuestionsForReliability,
    setHistory,
    clearPersistedActiveState
  ]);

  // Open a historical result in the results view
  const viewHistoricalResult = useCallback((res: AssessmentResult) => {
    setActiveResult(res);
    setView('results');
  }, []);

  // Clear all local history
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  // Exit quiz and return to home
  const exitToHome = useCallback(() => {
    clearPersistedActiveState();
    setIsExitModalOpen(false);
    setView('home');
  }, [clearPersistedActiveState]);

  // Fallback safe options in case shuffledOptions is empty
  const activeOptions = useMemo(() => {
    if (shuffledOptions.length > 0) return shuffledOptions;
    if (currentQuestion && currentQuestion.options) return currentQuestion.options;
    return [];
  }, [shuffledOptions, currentQuestion]);

  return {
    view,
    setView,
    attemptId,
    technology,
    currentLevel,
    currentQuestionIndex,
    currentQuestion,
    levelQuestions,
    selectedAnswer,
    isSubmitted,
    shuffledOptions: activeOptions,
    answers,
    levelResults,
    elapsedSeconds,
    activeResult,
    hasPersistedActive: !!persistedActiveState,
    persistedActiveState,
    history,
    isExitModalOpen,
    setIsExitModalOpen,
    startAssessment,
    resumeAssessment,
    discardActiveAssessment,
    selectAndSubmitAnswer,
    nextQuestion,
    proceedToNextLevel,
    retryCurrentLevel,
    finalizeAssessment,
    viewHistoricalResult,
    clearHistory,
    exitToHome
  };
}
