/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ArrowRight,
  Printer,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Target,
  Sparkles,
  Layers,
  History,
  FileCheck
} from 'lucide-react';
import { AssessmentResult, DifficultyLevel, Technology } from '../types/quiz.ts';
import { formatDuration } from '../utils/scoring.ts';
import { LEVEL_ORDER } from '../utils/assessmentEngine.ts';

interface ResultsDashboardProps {
  result: AssessmentResult;
  onRetry: (tech: Technology) => void;
  onChooseOtherTech: () => void;
  onViewHistory: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  onRetry,
  onChooseOtherTech,
  onViewHistory
}) => {
  const [showQuestionReview, setShowQuestionReview] = useState(false);
  const [filterReview, setFilterReview] = useState<'all' | 'incorrect'>('all');

  const filteredAnswers = result.answers.filter(a => {
    if (filterReview === 'incorrect') return !a.isCorrect;
    return true;
  });

  const getClassificationBadgeColor = (lvl: DifficultyLevel) => {
    switch (lvl) {
      case 'advanced':
        return 'text-[#9B5CFF] border-[#9B5CFF]/30 bg-[#9B5CFF]/10 shadow-[0_0_20px_rgba(155,92,255,0.25)]';
      case 'intermediate':
        return 'text-[#00F5FF] border-[#00F5FF]/30 bg-[#00F5FF]/10 shadow-[0_0_20px_rgba(0,245,255,0.25)]';
      case 'beginner':
        return 'text-[#B6FF5C] border-[#B6FF5C]/30 bg-[#B6FF5C]/10 shadow-[0_0_20px_rgba(182,255,92,0.25)]';
    }
  };

  // Circular gauge math (radius = 54, circumference = 2 * PI * 54 = 339.29)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.overallAccuracy / 100) * circumference;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Top action toolbar (hidden during print) */}
      <div className="flex items-center justify-between gap-4 mb-6 no-print">
        <button
          onClick={onChooseOtherTech}
          className="text-xs font-medium text-[#9AA4B8] hover:text-[#F5F7FF] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Switch Technology</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onViewHistory}
            className="px-3 py-1.5 rounded-lg bg-[#151B2B] hover:bg-[#1f283f] border border-white/10 text-xs font-medium text-[#F5F7FF] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-[#00F5FF]" />
            <span>My Results</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-[#151B2B] hover:bg-[#1f283f] border border-white/10 text-xs font-medium text-[#F5F7FF] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#B6FF5C]" />
            <span>Export / Print</span>
          </button>
        </div>
      </div>

      {/* Main Results Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#151B2B] border border-white/[0.08] mb-8 relative overflow-hidden glass-card">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Overall Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-mono text-[#9AA4B8] mb-3">
              <span className="text-[#00F5FF] uppercase font-bold">{result.technology} Assessment</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span>{result.date}</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FF] tracking-tight">
                Skill Classification
              </h1>
              <div
                className={`px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${getClassificationBadgeColor(
                  result.finalClassification
                )}`}
              >
                {result.finalClassification}
              </div>
            </div>

            <p className="text-sm text-[#9AA4B8] leading-relaxed max-w-xl mb-6">
              {result.classificationReason}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto md:mx-0">
              <div className="p-3 rounded-xl bg-[#111522] border border-white/[0.06]">
                <div className="text-[11px] font-mono text-[#9AA4B8] mb-1">Total Questions</div>
                <div className="text-lg font-bold font-mono text-[#F5F7FF] tabular-nums">
                  {result.totalQuestions}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#111522] border border-white/[0.06]">
                <div className="text-[11px] font-mono text-[#9AA4B8] mb-1">Correct Ratio</div>
                <div className="text-lg font-bold font-mono text-[#35E69B] tabular-nums">
                  {result.totalCorrect}/{result.totalQuestions}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#111522] border border-white/[0.06]">
                <div className="text-[11px] font-mono text-[#9AA4B8] mb-1">Total Time</div>
                <div className="text-lg font-bold font-mono text-[#00F5FF] tabular-nums">
                  {formatDuration(result.totalTimeSeconds)}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Circular Score Gauge */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 128 128">
                {/* Background Track */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className="stroke-white/10"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Animated Progress Gauge */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke={result.overallAccuracy >= 70 ? '#35E69B' : '#00F5FF'}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold font-mono text-[#F5F7FF] tabular-nums">
                  {result.overallAccuracy}%
                </span>
                <span className="text-[10px] font-mono text-[#9AA4B8] uppercase tracking-wider">
                  Accuracy
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#9AA4B8] mt-2">
              {result.passedAll ? (
                <span className="text-[#35E69B] font-semibold">All Tiers Mastered</span>
              ) : (
                <span>Performance Ratio</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Performance by Level Cards */}
      <div className="mb-10">
        <h3 className="text-sm font-mono text-[#00F5FF] uppercase tracking-wider mb-4">
          Performance by Difficulty Level
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEVEL_ORDER.map(level => {
            const data = result.levelBreakdown[level];
            const isAttempted = !!data;
            const isPassed = data?.passed;

            let borderStyle = 'border-white/[0.08]';
            let statusText = 'Locked / Unattempted';
            let statusColor = 'text-[#9AA4B8]/60';

            if (isAttempted) {
              if (isPassed) {
                borderStyle = 'border-[#35E69B]/40 bg-[#35E69B]/5';
                statusText = 'Passed Level (≥ 70%)';
                statusColor = 'text-[#35E69B] font-semibold';
              } else {
                borderStyle = 'border-[#FF5577]/40 bg-[#FF5577]/5';
                statusText = 'Did Not Meet 70%';
                statusColor = 'text-[#FF5577] font-semibold';
              }
            }

            return (
              <div
                key={level}
                className={`p-5 rounded-2xl bg-[#151B2B] border flex flex-col justify-between ${borderStyle}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-bold text-[#F5F7FF] capitalize">
                      {level}
                    </span>
                    <span className={`text-[11px] font-mono ${statusColor}`}>
                      {statusText}
                    </span>
                  </div>

                  {data ? (
                    <div className="space-y-1.5 my-3 text-xs font-mono text-[#9AA4B8]">
                      <div className="flex justify-between">
                        <span>Score:</span>
                        <span className="text-[#F5F7FF] font-bold">{data.scorePercentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="text-[#F5F7FF] font-bold">
                          {data.correctAnswers} / {data.totalQuestions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="text-[#F5F7FF]">{formatDuration(data.timeSpentSeconds)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-[#9AA4B8]/60 my-3">
                      This level was not attempted in this assessment session.
                    </p>
                  )}
                </div>

                {data && (
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full ${data.passed ? 'bg-[#35E69B]' : 'bg-[#FF5577]'}`}
                      style={{ width: `${data.scorePercentage}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Weaknesses Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Strengths Analysis */}
        <div className="p-6 rounded-2xl bg-[#151B2B] border border-white/[0.08]">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-[#35E69B]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Demonstrated Strengths ({result.strengths.length})</span>
          </div>

          {result.strengths.length > 0 ? (
            <div className="space-y-3">
              {result.strengths.map(topic => (
                <div
                  key={topic.topic}
                  className="p-3.5 rounded-xl bg-[#111522] border border-white/[0.06]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#F5F7FF]">
                      {topic.topic}
                    </span>
                    <span className="font-mono text-xs text-[#35E69B] font-bold">
                      {topic.accuracyPercentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#9AA4B8]">
                    <span>{topic.correct} of {topic.attempted} answered correctly</span>
                    {!topic.isReliable && (
                      <span className="text-white/40">(Preliminary)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-[#9AA4B8] p-4 rounded-xl bg-[#111522] border border-white/[0.04]">
              {result.totalQuestions < 5
                ? 'Not enough answers to assess strengths reliably.'
                : 'All tested topics indicate room for focused practice and mastery.'}
            </div>
          )}
        </div>

        {/* Weaknesses Analysis */}
        <div className="p-6 rounded-2xl bg-[#151B2B] border border-white/[0.08]">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-[#FF5577]">
            <Target className="w-4 h-4" />
            <span>Topics Requiring Improvement ({result.weaknesses.length})</span>
          </div>

          {result.weaknesses.length > 0 ? (
            <div className="space-y-3">
              {result.weaknesses.map(topic => (
                <div
                  key={topic.topic}
                  className="p-3.5 rounded-xl bg-[#111522] border border-white/[0.06]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#F5F7FF]">
                      {topic.topic}
                    </span>
                    <span className="font-mono text-xs text-[#FF5577] font-bold">
                      {topic.accuracyPercentage}%
                    </span>
                  </div>
                  <p className="text-[11px] text-[#9AA4B8] leading-relaxed mb-1.5">
                    {topic.reviewGuidance}
                  </p>
                  <div className="text-[10px] font-mono text-white/50">
                    Accuracy: {topic.correct}/{topic.attempted}
                    {!topic.isReliable && ' · (Single sample)'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-[#35E69B] p-4 rounded-xl bg-[#111522] border border-white/[0.04]">
              Exceptional proficiency! No topic fell below the 75% accuracy threshold.
            </div>
          )}
        </div>
      </div>

      {/* Personalized Learning Recommendations */}
      {result.weaknesses.length > 0 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111522] border border-white/[0.08] mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Tailored Study Plan</span>
          </div>
          <h3 className="text-lg font-bold text-[#F5F7FF] tracking-tight mb-2">
            Priority Action Items
          </h3>
          <p className="text-xs text-[#9AA4B8] mb-6">
            Prioritized by lowest accuracy. Tackle foundational gaps before advancing to complex specifications.
          </p>

          <div className="space-y-4">
            {result.weaknesses.slice(0, 4).map((rec, index) => (
              <div
                key={rec.topic}
                className="p-4 rounded-xl bg-[#151B2B] border border-white/[0.06] flex flex-col sm:flex-row items-start gap-4"
              >
                <div className="w-7 h-7 rounded-lg bg-[#00F5FF]/10 text-[#00F5FF] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-[#F5F7FF]">
                      {rec.topic}
                    </h4>
                    <span className="font-mono text-xs text-[#FF5577]">
                      {rec.accuracyPercentage}% Accuracy
                    </span>
                  </div>
                  <div className="text-xs text-[#9AA4B8] mb-2 leading-relaxed">
                    <span className="text-white/70 font-medium">Objective: </span>
                    {rec.suggestedObjective}
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/20 border border-white/[0.04] text-xs text-[#00F5FF]/90 font-mono">
                    <span className="text-white/40 block text-[10px] uppercase">Practice Task:</span>
                    {rec.practiceTask}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question-by-Question Review Section */}
      <div className="mb-10 no-print">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-mono text-[#00F5FF] uppercase tracking-wider">
            Detailed Question Review
          </h3>
          <button
            onClick={() => setShowQuestionReview(!showQuestionReview)}
            className="text-xs font-medium text-[#9AA4B8] hover:text-[#F5F7FF] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{showQuestionReview ? 'Hide Questions' : `Review All Questions (${result.answers.length})`}</span>
            {showQuestionReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showQuestionReview && (
          <div className="space-y-4">
            {/* Filter Toggle Buttons */}
            <div className="flex items-center gap-2 p-1 bg-[#111522] rounded-lg max-w-xs">
              <button
                onClick={() => setFilterReview('all')}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  filterReview === 'all'
                    ? 'bg-[#151B2B] text-[#F5F7FF] shadow-sm'
                    : 'text-[#9AA4B8] hover:text-[#F5F7FF]'
                }`}
              >
                All ({result.answers.length})
              </button>
              <button
                onClick={() => setFilterReview('incorrect')}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  filterReview === 'incorrect'
                    ? 'bg-[#151B2B] text-[#FF5577] shadow-sm'
                    : 'text-[#9AA4B8] hover:text-[#F5F7FF]'
                }`}
              >
                Incorrect ({result.totalIncorrect})
              </button>
            </div>

            {/* Questions List */}
            {filteredAnswers.map((item, idx) => (
              <div
                key={item.questionId}
                className="p-5 rounded-2xl bg-[#151B2B] border border-white/[0.08]"
              >
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#9AA4B8] mb-2">
                  <div className="flex items-center gap-2">
                    <span className="capitalize text-[#00F5FF] font-semibold">{item.level}</span>
                    <span className="text-white/20">·</span>
                    <span>{item.topic}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.isCorrect ? (
                      <span className="text-[#35E69B] flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="text-[#FF5577] flex items-center gap-1 font-semibold">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-sm sm:text-base font-semibold text-[#F5F7FF] mb-3">
                  {idx + 1}. {item.questionText}
                </h4>

                {item.codeSnippet && (
                  <pre className="mb-3 p-3 rounded-xl bg-[#090B12] text-xs font-mono text-[#00F5FF] overflow-x-auto">
                    <code>{item.codeSnippet}</code>
                  </pre>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                  <div
                    className={`p-2.5 rounded-lg border ${
                      item.isCorrect
                        ? 'bg-[#35E69B]/10 border-[#35E69B]/30 text-[#35E69B]'
                        : 'bg-[#FF5577]/10 border-[#FF5577]/30 text-[#FF5577]'
                    }`}
                  >
                    <span className="text-[10px] block font-mono text-white/50 uppercase">
                      Your Answer:
                    </span>
                    {item.selectedAnswer}
                  </div>

                  {!item.isCorrect && (
                    <div className="p-2.5 rounded-lg border bg-[#35E69B]/10 border-[#35E69B]/30 text-[#35E69B]">
                      <span className="text-[10px] block font-mono text-white/50 uppercase">
                        Correct Answer:
                      </span>
                      {item.correctAnswer}
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#9AA4B8] leading-relaxed">
                  <strong className="text-white/70">Explanation: </strong>
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Final Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.08] no-print">
        <button
          onClick={onChooseOtherTech}
          className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#F5F7FF] bg-[#151B2B] hover:bg-[#1f283f] border border-white/10 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Layers className="w-4 h-4 text-[#00F5FF]" />
          <span>Assess Another Technology</span>
        </button>

        <button
          onClick={() => onRetry(result.technology)}
          className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-[#090B12] bg-[#00F5FF] hover:bg-[#35E69B] active:scale-[0.98] rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_-3px_rgba(0,245,255,0.4)] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Assessment</span>
        </button>
      </div>
    </div>
  );
};
