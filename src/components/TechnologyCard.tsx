/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CodeXml, Palette, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Technology, TechnologyInfo } from '../types/quiz.ts';

interface TechnologyCardProps {
  info: TechnologyInfo;
  onSelect: (tech: Technology) => void;
  hasInProgress?: boolean;
}

export const TechnologyCard: React.FC<TechnologyCardProps> = ({
  info,
  onSelect,
  hasInProgress = false
}) => {
  const totalQuestions = info.levels.reduce((sum, l) => sum + l.questionCount, 0);

  const getIcon = () => {
    switch (info.id) {
      case 'html':
        return <CodeXml className="w-6 h-6 text-[#FF6B4A]" />;
      case 'css':
        return <Palette className="w-6 h-6 text-[#00F5FF]" />;
      case 'javascript':
        return <Terminal className="w-6 h-6 text-[#FFE600]" />;
    }
  };

  const getAccentBorderClass = () => {
    switch (info.id) {
      case 'html':
        return 'group-hover:border-[#FF6B4A]/50 group-hover:shadow-[0_0_25px_-5px_rgba(255,107,74,0.3)]';
      case 'css':
        return 'group-hover:border-[#00F5FF]/50 group-hover:shadow-[0_0_25px_-5px_rgba(0,245,255,0.3)]';
      case 'javascript':
        return 'group-hover:border-[#FFE600]/50 group-hover:shadow-[0_0_25px_-5px_rgba(255,230,0,0.3)]';
    }
  };

  const getBadgeColor = (levelName: string) => {
    switch (levelName) {
      case 'beginner':
        return 'text-[#B6FF5C]';
      case 'intermediate':
        return 'text-[#00F5FF]';
      case 'advanced':
        return 'text-[#9B5CFF]';
      default:
        return 'text-[#9AA4B8]';
    }
  };

  return (
    <div
      onClick={() => onSelect(info.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(info.id);
        }
      }}
      className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-[#151B2B] border border-white/[0.08] transition-all duration-200 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF] ${getAccentBorderClass()}`}
    >
      <div>
        {/* Top bar with icon and total questions */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#111522] border border-white/10 flex items-center justify-center transition-transform group-hover:scale-105">
            {getIcon()}
          </div>
          <div className="text-right">
            <span className="font-mono text-xs text-[#9AA4B8] tabular-nums">
              {totalQuestions} questions
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-bold text-[#F5F7FF] tracking-tight group-hover:text-white transition-colors">
          {info.name}
        </h3>
        <p className="text-xs font-medium text-[#00F5FF] mb-3">
          {info.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-[#9AA4B8] leading-relaxed mb-6">
          {info.description}
        </p>

        {/* Difficulty tiers unboxed info */}
        <div className="pt-4 border-t border-white/[0.06] mb-6">
          <div className="text-[11px] font-mono text-[#9AA4B8]/80 mb-2 uppercase tracking-wider">
            Assessment Path
          </div>
          <div className="flex items-center gap-2 text-xs">
            {info.levels.map((lvl, idx) => (
              <React.Fragment key={lvl.level}>
                {idx > 0 && <span className="text-white/20">→</span>}
                <span className={`font-medium ${getBadgeColor(lvl.level)}`}>
                  {lvl.label} <span className="text-white/40 text-[10px]">({lvl.questionCount})</span>
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-2 flex items-center justify-between">
        <button
          type="button"
          tabIndex={-1}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5F7FF] group-hover:text-[#00F5FF] transition-colors"
        >
          <span>{hasInProgress ? 'Resume Assessment' : 'Start Quiz'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {hasInProgress && (
          <span className="text-[11px] font-mono text-[#B6FF5C]">
            In Progress
          </span>
        )}
      </div>
    </div>
  );
};
