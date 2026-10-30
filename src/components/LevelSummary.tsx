/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ArrowRight,
  Home,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';
import { AnswerRecord, DifficultyLevel, LevelResult } from '../types/quiz.ts';
import { formatDuration } from '../utils/scoring.ts';
import { getNextLevel } from '../utils/assessmentEngine.ts';

interface LevelSummaryProps {
  levelResult: LevelResult;
  answers: AnswerRecord[];
  onProceedNext: () => void;
  onRetryLevel: () => void;
  onFinalize: () => void;
  onReturnHome: () => void;
}

export const LevelSummary: React.FC<LevelSummaryProps> = ({
  levelResult,
  answers,
  onProceedNext,
  onRetryLevel,
  onFinalize,
  onReturnHome
}) => {
  const [showReview, setShowReview] = useState(false);

  const levelAnswers = answers.filter(a => a.level === levelResult.level);
  const incorrectAnswers = levelAnswers.filter(a => !a.isCorrect);

  const nextLevel = getNextLevel(levelResult.level);
  const hasNextLevel = !!nextLevel;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Level Header Banner */}
      <div className="p-8 rounded-2xl bg-[#151B2B] border border-white/[0.08] mb-8 text-center relative overflow-hidden">
        {/* Subtle accent glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{
            backgroundColor: levelResult.passed ? '#35E69B' : '#FF5577'
          }}
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-4">
            <span className="capitalize">{levelResult.level} Level Assessment</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FF] tracking-tight mb-3">
            {levelResult.passed
              ? `${levelResult.level.charAt(0).toUpperCase() + levelResult.level.slice(1)} Level Completed!`
              : `Your Current Level is ${levelResult.level.charAt(0).toUpperCase() + levelResult.level.slice(1)}`}
          </h2>

          <p className="text-sm sm:text-base text-[#9AA4B8] max-w-lg mx-auto mb-6">
            {levelResult.passed ? (
              hasNextLevel ? (
                `You scored ${levelResult.scorePercentage}%. You met the 70% threshold and are ready to continue to ${nextLevel?.toUpperCase()}.`
              ) : (
                `Congratulations! You achieved ${levelResult.scorePercentage}% on the Advanced level.`
              )
            ) : (
              `You scored ${levelResult.scorePercentage}% (70% required to advance). Review the recommended topics and practice again to improve your score.`
            )}
          </p>

          {/* Key Metric Tallies */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            <div className="p-3 rounded-xl bg-[#111522] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-[#9AA4B8] mb-1">Score</div>
              <div className="text-xl font-bold font-mono text-[#00F5FF] tabular-nums">
                {levelResult.scorePercentage}%
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#111522] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-[#9AA4B8] mb-1">Correct</div>
              <div className="text-xl font-bold font-mono text-[#35E69B] tabular-nums">
                {levelResult.correctAnswers}/{levelResult.totalQuestions}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#111522] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-[#9AA4B8] mb-1">Incorrect</div>
              <div className="text-xl font-bold font-mono text-[#FF5577] tabular-nums">
                {levelResult.totalQuestions - levelResult.correctAnswers}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#111522] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-[#9AA4B8] mb-1">Time</div>
              <div className="text-xl font-bold font-mono text-[#F5F7FF] tabular-nums">
                {formatDuration(levelResult.timeSpentSeconds)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Topics Passed */}
        <div className="p-5 rounded-2xl bg-[#151B2B] border border-white/[0.08]">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-[#35E69B]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Topics Answered Correctly ({levelResult.topicsPassed.length})</span>
          </div>
          {levelResult.topicsPassed.length > 0 ? (
            <ul className="space-y-1.5 text-xs text-[#F5F7FF]">
              {levelResult.topicsPassed.map(t => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35E69B]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[#9AA4B8]">No topics answered with full accuracy.</p>
          )}
        </div>

        {/* Topics Needing Improvement */}
        <div className="p-5 rounded-2xl bg-[#151B2B] border border-white/[0.08]">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-[#FF5577]">
            <AlertTriangle className="w-4 h-4" />
            <span>Topics Requiring Review ({levelResult.topicsFailed.length})</span>
          </div>
          {levelResult.topicsFailed.length > 0 ? (
            <ul className="space-y-1.5 text-xs text-[#F5F7FF]">
              {levelResult.topicsFailed.map(t => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5577]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[#35E69B]">Flawless level! Zero topics require review.</p>
          )}
        </div>
      </div>

      {/* Review Incorrect Answers Drawer Toggle */}
      {incorrectAnswers.length > 0 && (
        <div className="mb-8">
          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full py-3 px-4 rounded-xl bg-[#111522] border border-white/10 hover:border-white/20 text-xs font-medium text-[#9AA4B8] hover:text-[#F5F7FF] flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>Review Missed Questions ({incorrectAnswers.length})</span>
            {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showReview && (
            <div className="mt-3 space-y-3">
              {incorrectAnswers.map((item, idx) => (
                <div
                  key={item.questionId}
                  className="p-4 rounded-xl bg-[#090B12] border border-white/[0.08]"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#9AA4B8] mb-1">
                    <span>Missed #{idx + 1} · {item.topic}</span>
                  </div>
                  <div className="text-sm font-semibold text-[#F5F7FF] mb-2">
                    {item.questionText}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-2">
                    <div className="p-2 rounded-lg bg-[#FF5577]/10 border border-[#FF5577]/20 text-[#FF5577]">
                      <span className="font-mono text-[10px] block text-white/50">Your Answer:</span>
                      {item.selectedAnswer}
                    </div>
                    <div className="p-2 rounded-lg bg-[#35E69B]/10 border border-[#35E69B]/20 text-[#35E69B]">
                      <span className="font-mono text-[10px] block text-white/50">Correct Answer:</span>
                      {item.correctAnswer}
                    </div>
                  </div>
                  <p className="text-xs text-[#9AA4B8] leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Decision Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
        <button
          onClick={onReturnHome}
          className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-[#9AA4B8] hover:text-[#F5F7FF] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Exit to Home</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Retry Level Button */}
          <button
            onClick={onRetryLevel}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#F5F7FF] bg-[#151B2B] hover:bg-[#1f283f] border border-white/10 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry This Level</span>
          </button>

          {/* Next Level or Finalize Report */}
          {levelResult.passed && hasNextLevel ? (
            <button
              onClick={onProceedNext}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-[#090B12] bg-[#00F5FF] hover:bg-[#35E69B] rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_-3px_rgba(0,245,255,0.4)] cursor-pointer"
            >
              <span>Proceed to {nextLevel?.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onFinalize}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-[#090B12] bg-[#B6FF5C] hover:bg-[#35E69B] rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_-3px_rgba(182,255,92,0.4)] cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Assessment Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
