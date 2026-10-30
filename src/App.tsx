/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useQuiz } from './hooks/useQuiz.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { TechnologyGrid } from './components/TechnologyGrid.tsx';
import { QuizHeader } from './components/QuizHeader.tsx';
import { LevelProgress } from './components/LevelProgress.tsx';
import { QuestionCard } from './components/QuestionCard.tsx';
import { LevelSummary } from './components/LevelSummary.tsx';
import { ResultsDashboard } from './components/ResultsDashboard.tsx';
import { ResultsHistory } from './components/ResultsHistory.tsx';
import { ExitConfirmModal } from './components/ExitConfirmModal.tsx';
import { PlayCircle, Trash2, ArrowRight } from 'lucide-react';

export default function App() {
  const {
    view,
    setView,
    technology,
    currentLevel,
    currentQuestionIndex,
    currentQuestion,
    levelQuestions,
    selectedAnswer,
    isSubmitted,
    shuffledOptions,
    answers,
    levelResults,
    elapsedSeconds,
    activeResult,
    hasPersistedActive,
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
  } = useQuiz();

  const handleStartFromHeader = () => {
    if (hasPersistedActive && persistedActiveState) {
      resumeAssessment();
    } else {
      // Scroll to tech grid or start default html
      const techElement = document.getElementById('technologies');
      if (techElement && view === 'home') {
        techElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        startAssessment('html');
      }
    }
  };

  const handleExploreClick = () => {
    const techElement = document.getElementById('technologies');
    if (techElement) {
      techElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090B12] text-[#F5F7FF] selection:bg-[#00F5FF]/20 selection:text-[#00F5FF]">
      {/* Top Header Navigation */}
      <Header
        currentView={view}
        onNavigateHome={() => setView('home')}
        onNavigateHistory={() => setView('history')}
        onStartClick={handleStartFromHeader}
        inProgressTech={hasPersistedActive && persistedActiveState ? persistedActiveState.technology : null}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* VIEW: HOME */}
        {view === 'home' && (
          <div>
            {/* Resume Active Assessment Banner (if found in localStorage) */}
            {hasPersistedActive && persistedActiveState && (
              <div className="bg-[#111522] border-b border-[#00F5FF]/30 py-3 px-4">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#F5F7FF]">
                    <span className="w-2 h-2 rounded-full bg-[#00F5FF]" />
                    <span>
                      You have an active in-progress assessment in{' '}
                      <strong className="text-[#00F5FF] uppercase">
                        {persistedActiveState.technology}
                      </strong>{' '}
                      ({persistedActiveState.currentLevel} level).
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={resumeAssessment}
                      className="px-3 py-1.5 rounded-lg bg-[#00F5FF] text-[#090B12] font-semibold hover:bg-[#35E69B] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Resume</span>
                    </button>
                    <button
                      onClick={discardActiveAssessment}
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 text-[#9AA4B8] hover:text-[#FF5577] flex items-center gap-1 transition-colors cursor-pointer"
                      title="Discard saved progress"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Discard</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <Hero
              onStartClick={() => startAssessment('html')}
              onExploreClick={handleExploreClick}
            />

            <TechnologyGrid
              onSelectTechnology={startAssessment}
              inProgressTech={hasPersistedActive && persistedActiveState ? persistedActiveState.technology : null}
            />
          </div>
        )}

        {/* VIEW: QUIZ ACTIVE */}
        {view === 'quiz' && currentQuestion && (
          <div className="flex-1 flex flex-col">
            <QuizHeader
              technology={technology}
              level={currentLevel}
              elapsedSeconds={elapsedSeconds}
              onExitClick={() => setIsExitModalOpen(true)}
            />

            <LevelProgress
              currentLevel={currentLevel}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestionsInLevel={levelQuestions.length}
              levelResults={levelResults}
            />

            <div className="flex-1 flex items-center justify-center">
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={levelQuestions.length}
                options={shuffledOptions}
                selectedAnswer={selectedAnswer}
                isSubmitted={isSubmitted}
                onSelectOption={selectAndSubmitAnswer}
                onNextQuestion={nextQuestion}
                isLastQuestionInLevel={currentQuestionIndex + 1 >= levelQuestions.length}
              />
            </div>
          </div>
        )}

        {/* VIEW: LEVEL SUMMARY */}
        {view === 'level-summary' && levelResults[currentLevel] && (
          <LevelSummary
            levelResult={levelResults[currentLevel]!}
            answers={answers}
            onProceedNext={proceedToNextLevel}
            onRetryLevel={retryCurrentLevel}
            onFinalize={finalizeAssessment}
            onReturnHome={exitToHome}
          />
        )}

        {/* VIEW: RESULTS DASHBOARD */}
        {view === 'results' && activeResult && (
          <ResultsDashboard
            result={activeResult}
            onRetry={startAssessment}
            onChooseOtherTech={() => setView('home')}
            onViewHistory={() => setView('history')}
          />
        )}

        {/* VIEW: ASSESSMENT HISTORY */}
        {view === 'history' && (
          <ResultsHistory
            history={history}
            onOpenResult={viewHistoricalResult}
            onClearHistory={clearHistory}
            onStartAssessment={() => setView('home')}
          />
        )}
      </main>

      {/* Confirmation Exit Modal */}
      <ExitConfirmModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirmExit={exitToHome}
      />

      {/* Clean Footer (hidden during print) */}
      <footer className="border-t border-white/[0.08] bg-[#090B12] py-8 px-4 sm:px-6 text-xs text-[#9AA4B8] no-print">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#F5F7FF]">DevLevel</span>
            <span>·</span>
            <span>Front-End Technical Assessment Platform</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>HTML5</span>
            <span>CSS3</span>
            <span>ECMAScript 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
