/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  History,
  Trash2,
  ArrowRight,
  CodeXml,
  Palette,
  Terminal,
  Clock,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { AssessmentResult, DifficultyLevel, Technology } from '../types/quiz.ts';
import { formatDuration } from '../utils/scoring.ts';

interface ResultsHistoryProps {
  history: AssessmentResult[];
  onOpenResult: (result: AssessmentResult) => void;
  onClearHistory: () => void;
  onStartAssessment: () => void;
}

export const ResultsHistory: React.FC<ResultsHistoryProps> = ({
  history,
  onOpenResult,
  onClearHistory,
  onStartAssessment
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const getTechIcon = (tech: Technology) => {
    switch (tech) {
      case 'html':
        return <CodeXml className="w-5 h-5 text-[#FF6B4A]" />;
      case 'css':
        return <Palette className="w-5 h-5 text-[#00F5FF]" />;
      case 'javascript':
        return <Terminal className="w-5 h-5 text-[#FFE600]" />;
    }
  };

  const getLevelBadgeClass = (lvl: DifficultyLevel) => {
    switch (lvl) {
      case 'advanced':
        return 'text-[#9B5CFF] bg-[#9B5CFF]/10 border-[#9B5CFF]/30';
      case 'intermediate':
        return 'text-[#00F5FF] bg-[#00F5FF]/10 border-[#00F5FF]/30';
      case 'beginner':
        return 'text-[#B6FF5C] bg-[#B6FF5C]/10 border-[#B6FF5C]/30';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Title & Clear History Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-1">
            LocalStorage Archive
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FF] tracking-tight">
            My Assessment History
          </h1>
        </div>

        {history.length > 0 && (
          <div>
            {!showClearConfirm ? (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-3.5 py-2 rounded-xl bg-[#151B2B] hover:bg-[#FF5577]/10 hover:border-[#FF5577]/30 border border-white/10 text-xs font-medium text-[#9AA4B8] hover:text-[#FF5577] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All History</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#111522] border border-[#FF5577]/40">
                <span className="text-[11px] text-[#FF5577] font-medium pl-2">
                  Confirm delete?
                </span>
                <button
                  onClick={() => {
                    onClearHistory();
                    setShowClearConfirm(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#FF5577] text-white text-xs font-semibold hover:bg-[#FF5577]/90 cursor-pointer"
                >
                  Yes, Clear
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2 py-1 rounded-lg bg-white/5 text-xs text-[#9AA4B8] hover:text-[#F5F7FF] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* History List or Empty State */}
      {history.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#151B2B] border border-white/[0.08] text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-xl bg-[#111522] border border-white/10 flex items-center justify-center text-[#00F5FF] mx-auto mb-4">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#F5F7FF] mb-2">
            No Assessments Completed Yet
          </h3>
          <p className="text-xs text-[#9AA4B8] leading-relaxed mb-6">
            Take your first assessment in HTML, CSS, or JavaScript to discover your baseline proficiency and receive a detailed diagnostic report.
          </p>
          <button
            onClick={onStartAssessment}
            className="px-6 py-2.5 text-xs font-semibold text-[#090B12] bg-[#00F5FF] hover:bg-[#35E69B] active:scale-[0.98] rounded-xl transition-all shadow-[0_0_20px_-3px_rgba(0,245,255,0.4)] cursor-pointer"
          >
            Start Your First Assessment
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map(item => (
            <div
              key={item.id}
              onClick={() => onOpenResult(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenResult(item);
                }
              }}
              className="p-5 rounded-2xl bg-[#151B2B] border border-white/[0.08] hover:border-[#00F5FF]/30 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#111522] border border-white/10 flex items-center justify-center shrink-0">
                  {getTechIcon(item.technology)}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-[#F5F7FF] uppercase tracking-tight">
                      {item.technology}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase ${getLevelBadgeClass(
                        item.finalClassification
                      )}`}
                    >
                      {item.finalClassification}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#9AA4B8] font-mono">
                    <span>{item.date}</span>
                    <span>·</span>
                    <span>{item.totalQuestions} questions</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#00F5FF]" />
                      {formatDuration(item.totalTimeSeconds)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Accuracy & Open Result Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.04]">
                <div className="text-left sm:text-right">
                  <div className="text-lg font-bold font-mono text-[#00F5FF] tabular-nums">
                    {item.overallAccuracy}%
                  </div>
                  <div className="text-[10px] font-mono text-[#9AA4B8]">
                    {item.totalCorrect}/{item.totalQuestions} Correct
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-[#111522] border border-white/10 flex items-center justify-center text-[#9AA4B8] group-hover:text-[#00F5FF] group-hover:border-[#00F5FF]/40 transition-colors">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
