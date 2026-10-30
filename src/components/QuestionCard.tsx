/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Question } from '../types/quiz.ts';
import { AnswerOption } from './AnswerOption.tsx';
import { AnswerFeedback } from './AnswerFeedback.tsx';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  options: string[];
  selectedAnswer: string | null;
  isSubmitted: boolean;
  onSelectOption: (option: string) => void;
  onNextQuestion: () => void;
  isLastQuestionInLevel: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  options,
  selectedAnswer,
  isSubmitted,
  onSelectOption,
  onNextQuestion,
  isLastQuestionInLevel
}) => {
  const letters = ['A', 'B', 'C', 'D'];

  // Keyboard shortcut listener: 1, 2, 3, 4 to select options; Enter to advance when submitted
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing in input, ignore
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (!isSubmitted) {
        if (e.key === '1' && options[0]) onSelectOption(options[0]);
        if (e.key === '2' && options[1]) onSelectOption(options[1]);
        if (e.key === '3' && options[2]) onSelectOption(options[2]);
        if (e.key === '4' && options[3]) onSelectOption(options[3]);
      } else {
        if (e.key === 'Enter') {
          onNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSubmitted, options, onSelectOption, onNextQuestion]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Question metadata header */}
      <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#9AA4B8]">
          <span className="text-[#00F5FF] font-semibold">{question.topic}</span>
          <span aria-hidden="true" className="text-white/20">·</span>
          <span>Question {questionNumber} of {totalQuestions}</span>
        </div>
        <div className="text-[#9AA4B8]/60 text-[11px] hidden sm:block">
          Use keys 1-4 to select
        </div>
      </div>

      {/* Main Question Text */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#F5F7FF] leading-snug tracking-tight mb-6">
        {question.question}
      </h2>

      {/* Code Snippet Box (if provided) */}
      {question.codeSnippet && (
        <div className="mb-6 rounded-xl bg-[#090B12] border border-white/10 overflow-hidden shadow-inner">
          <div className="px-4 py-2 bg-[#111522] border-b border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#9AA4B8]">
            <span>Code Example</span>
            <span className="text-white/30">{question.technology.toUpperCase()}</span>
          </div>
          <pre className="p-4 text-xs sm:text-sm font-mono text-[#00F5FF] overflow-x-auto leading-relaxed">
            <code>{question.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Multiple-Choice Answer Options Grid */}
      <div className="space-y-3 mb-4">
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === question.correctAnswer;
          const label = letters[idx] || `${idx + 1}`;

          return (
            <AnswerOption
              key={option}
              label={label}
              optionText={option}
              isSelected={isSelected}
              isCorrectOption={isCorrectOption}
              isSubmitted={isSubmitted}
              onSelect={() => onSelectOption(option)}
            />
          );
        })}
      </div>

      {/* Immediate Educational Feedback when submitted */}
      {isSubmitted && (
        <AnswerFeedback
          isCorrect={selectedAnswer === question.correctAnswer}
          explanation={question.explanation}
          correctAnswer={question.correctAnswer}
          learningObjective={question.learningObjective}
          onNextQuestion={onNextQuestion}
          isLastQuestionInLevel={isLastQuestionInLevel}
        />
      )}
    </div>
  );
};
