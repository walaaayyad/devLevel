/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check, X } from 'lucide-react';

interface AnswerOptionProps {
  label: string; // 'A', 'B', 'C', 'D'
  optionText: string;
  isSelected: boolean;
  isCorrectOption: boolean;
  isSubmitted: boolean;
  onSelect: () => void;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  label,
  optionText,
  isSelected,
  isCorrectOption,
  isSubmitted,
  onSelect
}) => {
  // Determine card styles based on submission state
  let cardBg = 'bg-[#151B2B] hover:bg-[#1a2236] border-white/[0.08] text-[#F5F7FF]';
  let badgeStyle = 'bg-white/5 border-white/10 text-[#9AA4B8]';
  let icon = null;

  if (isSubmitted) {
    if (isCorrectOption) {
      // Correct answer is always highlighted in green
      cardBg = 'bg-[#35E69B]/10 border-[#35E69B] text-[#F5F7FF] shadow-[0_0_20px_-5px_rgba(53,230,155,0.3)]';
      badgeStyle = 'bg-[#35E69B] text-[#090B12] font-bold border-[#35E69B]';
      icon = <Check className="w-4 h-4 text-[#35E69B] shrink-0" />;
    } else if (isSelected && !isCorrectOption) {
      // Selected incorrect answer is highlighted in red
      cardBg = 'bg-[#FF5577]/10 border-[#FF5577] text-[#F5F7FF] shadow-[0_0_20px_-5px_rgba(255,85,119,0.3)]';
      badgeStyle = 'bg-[#FF5577] text-white font-bold border-[#FF5577]';
      icon = <X className="w-4 h-4 text-[#FF5577] shrink-0" />;
    } else {
      // Other non-selected options fade slightly
      cardBg = 'bg-[#151B2B]/60 border-white/[0.04] text-[#9AA4B8] opacity-60';
      badgeStyle = 'bg-white/5 border-white/5 text-[#9AA4B8]';
    }
  } else if (isSelected) {
    cardBg = 'bg-[#00F5FF]/10 border-[#00F5FF] text-[#F5F7FF] shadow-[0_0_15px_-3px_rgba(0,245,255,0.3)]';
    badgeStyle = 'bg-[#00F5FF] text-[#090B12] font-bold border-[#00F5FF]';
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isSubmitted}
      className={`w-full p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all duration-150 cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF] ${cardBg}`}
      aria-label={`Option ${label}: ${optionText}`}
    >
      {/* Option Letter Indicator */}
      <div
        className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-mono shrink-0 transition-colors ${badgeStyle}`}
      >
        {label}
      </div>

      {/* Option Text */}
      <div className="flex-1 text-sm sm:text-base leading-snug pt-0.5 font-normal">
        {optionText}
      </div>

      {/* State Icon (Checkmark or Cross) */}
      {icon && (
        <div className="pt-1">
          {icon}
        </div>
      )}
    </button>
  );
};
