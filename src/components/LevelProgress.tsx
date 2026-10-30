/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DifficultyLevel } from '../types/quiz.ts';
import { Check } from 'lucide-react';

interface LevelProgressProps {
  currentLevel: DifficultyLevel;
  currentQuestionIndex: number;
  totalQuestionsInLevel: number;
  levelResults: Record<DifficultyLevel, { passed: boolean } | null>;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  currentQuestionIndex,
  totalQuestionsInLevel,
  levelResults
}) => {
  const levels: { key: DifficultyLevel; label: string; num: number; colorHex: string }[] = [
    { key: 'beginner', label: 'Beginner', num: 1, colorHex: '#B6FF5C' },
    { key: 'intermediate', label: 'Intermediate', num: 2, colorHex: '#00F5FF' },
    { key: 'advanced', label: 'Advanced', num: 3, colorHex: '#9B5CFF' }
  ];

  const currentLevelIndex = levels.findIndex(l => l.key === currentLevel);
  const currentLevelData = levels[currentLevelIndex] || levels[0];

  // Question progress within this level (1-indexed for display)
  const questionNumber = currentQuestionIndex + 1;
  const questionProgressPercent = Math.min(
    100,
    Math.round((questionNumber / totalQuestionsInLevel) * 100)
  );

  return (
    <div className="w-full bg-[#111522] border-b border-white/[0.08] py-4 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        {/* Tier status indicator row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#F5F7FF] font-semibold">
              Level {currentLevelData.num} of 3
            </span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span style={{ color: currentLevelData.colorHex }} className="font-semibold uppercase tracking-wider text-[11px] font-mono">
              {currentLevelData.label}
            </span>
          </div>

          <div className="font-mono text-[#9AA4B8] tabular-nums">
            Question <span className="text-[#F5F7FF] font-semibold">{questionNumber}</span> of {totalQuestionsInLevel}
          </div>
        </div>

        {/* 3 Connected Level Segments */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {levels.map((lvl, idx) => {
            const isCompleted = levelResults[lvl.key]?.passed;
            const isCurrent = lvl.key === currentLevel;
            const isLocked = idx > currentLevelIndex && !isCompleted;

            let barBg = 'bg-white/10';
            let borderColor = 'border-transparent';
            let textColor = 'text-[#9AA4B8]';
            let glow = '';

            if (isCompleted) {
              barBg = lvl.key === 'beginner' ? 'bg-[#B6FF5C]' : lvl.key === 'intermediate' ? 'bg-[#00F5FF]' : 'bg-[#9B5CFF]';
              textColor = 'text-[#F5F7FF]';
            } else if (isCurrent) {
              barBg = 'bg-white/20';
              borderColor = lvl.key === 'beginner' ? 'border-[#B6FF5C]' : lvl.key === 'intermediate' ? 'border-[#00F5FF]' : 'border-[#9B5CFF]';
              glow = lvl.key === 'beginner' ? 'shadow-[0_0_12px_rgba(182,255,92,0.3)]' : lvl.key === 'intermediate' ? 'shadow-[0_0_12px_rgba(0,245,255,0.3)]' : 'shadow-[0_0_12px_rgba(155,92,255,0.3)]';
              textColor = 'text-[#F5F7FF] font-semibold';
            }

            return (
              <div key={lvl.key} className="flex flex-col gap-1.5">
                <div
                  className={`h-2.5 rounded-full transition-all duration-300 relative overflow-hidden border ${barBg} ${borderColor} ${glow}`}
                >
                  {/* If current level, show the intra-level question fill inside */}
                  {isCurrent && (
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${questionProgressPercent}%`,
                        backgroundColor: lvl.colorHex
                      }}
                    />
                  )}
                </div>
                <div className="flex items-center justify-between px-0.5">
                  <span className={`text-[11px] font-mono tracking-tight flex items-center gap-1 ${textColor}`}>
                    {isCompleted && <Check className="w-3 h-3 text-[#B6FF5C]" />}
                    {lvl.label}
                  </span>
                  <span className="text-[10px] font-mono text-[#9AA4B8]/70">
                    {isCompleted ? 'Passed' : isCurrent ? 'In Progress' : 'Locked'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
