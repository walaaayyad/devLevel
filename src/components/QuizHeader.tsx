/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CodeXml, Palette, Terminal, X, Clock } from 'lucide-react';
import { DifficultyLevel, Technology } from '../types/quiz.ts';
import { formatDuration } from '../utils/scoring.ts';

interface QuizHeaderProps {
  technology: Technology;
  level: DifficultyLevel;
  elapsedSeconds: number;
  onExitClick: () => void;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  technology,
  level,
  elapsedSeconds,
  onExitClick
}) => {
  const getTechDetails = () => {
    switch (technology) {
      case 'html':
        return {
          name: 'HTML',
          icon: <CodeXml className="w-4 h-4 text-[#FF6B4A]" />,
          color: 'text-[#FF6B4A]'
        };
      case 'css':
        return {
          name: 'CSS',
          icon: <Palette className="w-4 h-4 text-[#00F5FF]" />,
          color: 'text-[#00F5FF]'
        };
      case 'javascript':
        return {
          name: 'JavaScript',
          icon: <Terminal className="w-4 h-4 text-[#FFE600]" />,
          color: 'text-[#FFE600]'
        };
    }
  };

  const tech = getTechDetails();

  return (
    <div className="bg-[#090B12] border-b border-white/[0.08] px-4 sm:px-6 py-3.5">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Technology & Level identifier */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#151B2B] border border-white/10 flex items-center justify-center">
            {tech.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${tech.color}`}>
                {tech.name}
              </span>
              <span className="text-white/30 text-xs">/</span>
              <span className="text-xs font-mono capitalize text-[#F5F7FF]">
                {level} Level
              </span>
            </div>
          </div>
        </div>

        {/* Timer and Exit Action */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#9AA4B8] tabular-nums">
            <Clock className="w-3.5 h-3.5 text-[#00F5FF]" />
            <span>{formatDuration(elapsedSeconds)}</span>
          </div>

          <button
            onClick={onExitClick}
            className="p-1.5 text-[#9AA4B8] hover:text-[#F5F7FF] hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1 text-xs"
            aria-label="Exit Assessment"
            title="Exit Assessment"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
