/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, BookOpen } from 'lucide-react';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  correctAnswer: string;
  learningObjective?: string;
  onNextQuestion: () => void;
  isLastQuestionInLevel: boolean;
}

export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({
  isCorrect,
  explanation,
  correctAnswer,
  learningObjective,
  onNextQuestion,
  isLastQuestionInLevel
}) => {
  return (
    <div
      className={`mt-6 p-5 sm:p-6 rounded-2xl border transition-all ${
        isCorrect
          ? 'bg-[#35E69B]/5 border-[#35E69B]/30'
          : 'bg-[#FF5577]/5 border-[#FF5577]/30'
      }`}
    >
      {/* Feedback Title with Icon */}
      <div className="flex items-center gap-2.5 mb-3">
        {isCorrect ? (
          <CheckCircle2 className="w-5 h-5 text-[#35E69B] shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-[#FF5577] shrink-0" />
        )}
        <h4
          className={`text-base font-bold tracking-tight ${
            isCorrect ? 'text-[#35E69B]' : 'text-[#FF5577]'
          }`}
        >
          {isCorrect ? 'Correct! Great job.' : "Not quite! Let's understand why."}
        </h4>
      </div>

      {/* Correct answer callout if user was wrong */}
      {!isCorrect && (
        <div className="mb-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
          <span className="text-[#9AA4B8] font-mono">Correct Answer: </span>
          <span className="text-[#35E69B] font-semibold">{correctAnswer}</span>
        </div>
      )}

      {/* In-depth educational explanation */}
      <div className="flex items-start gap-3 mb-4 text-sm text-[#F5F7FF] leading-relaxed">
        <Lightbulb className="w-4 h-4 text-[#00F5FF] shrink-0 mt-0.5" />
        <div>
          <p>{explanation}</p>
        </div>
      </div>

      {/* Learning objective if present */}
      {learningObjective && (
        <div className="flex items-center gap-2 text-xs text-[#9AA4B8] mb-6 pt-3 border-t border-white/[0.06]">
          <BookOpen className="w-3.5 h-3.5 text-[#9B5CFF] shrink-0" />
          <span><strong className="text-white/80 font-medium">Objective:</strong> {learningObjective}</span>
        </div>
      )}

      {/* Next Question / Finish Level CTA */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNextQuestion}
          autoFocus
          className="px-6 py-2.5 text-sm font-semibold text-[#090B12] bg-[#00F5FF] hover:bg-[#35E69B] active:scale-[0.98] rounded-xl transition-all shadow-[0_0_20px_-3px_rgba(0,245,255,0.4)] flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span>{isLastQuestionInLevel ? 'Complete Level' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
