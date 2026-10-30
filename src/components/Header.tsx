/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Terminal, Moon, History, Sparkles } from 'lucide-react';
import { Technology } from '../types/quiz.ts';

interface HeaderProps {
  currentView: string;
  onNavigateHome: () => void;
  onNavigateHistory: () => void;
  onStartClick: () => void;
  inProgressTech?: Technology | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  onNavigateHistory,
  onStartClick,
  inProgressTech
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090B12]/85 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF] rounded-lg py-1 px-1.5 transition-transform"
          aria-label="DevLevel Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#151B2B] border border-white/10 flex items-center justify-center text-[#00F5FF] group-hover:border-[#00F5FF]/50 group-hover:shadow-[0_0_15px_-3px_rgba(0,245,255,0.4)] transition-all">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-[#F5F7FF] whitespace-nowrap">
              Dev<span className="text-[#00F5FF]">Level</span>
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (single line, unboxed, hover underline) */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-[#9AA4B8]">
          <button
            onClick={onNavigateHome}
            className={`whitespace-nowrap transition-colors hover:text-[#F5F7FF] ${
              currentView === 'home' ? 'text-[#00F5FF] font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={onNavigateHistory}
            className={`whitespace-nowrap flex items-center gap-1.5 transition-colors hover:text-[#F5F7FF] ${
              currentView === 'history' ? 'text-[#00F5FF] font-semibold' : ''
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>My Results</span>
          </button>
          <div className="flex items-center gap-1.5 text-xs text-[#9AA4B8]/70 border-l border-white/10 pl-6 select-none" title="Dark theme active">
            <Moon className="w-3.5 h-3.5 text-[#00F5FF]" />
            <span className="font-mono text-[11px] uppercase tracking-wider">Dark Theme</span>
          </div>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {inProgressTech && currentView !== 'quiz' && currentView !== 'level-summary' && (
            <span className="hidden md:inline text-xs text-[#B6FF5C] font-mono">
              Assessment in progress ({inProgressTech.toUpperCase()})
            </span>
          )}
          <button
            onClick={onStartClick}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#090B12] bg-[#00F5FF] hover:bg-[#35E69B] active:scale-[0.98] rounded-lg transition-all shadow-[0_0_20px_-4px_rgba(0,245,255,0.4)] whitespace-nowrap"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </header>
  );
};
