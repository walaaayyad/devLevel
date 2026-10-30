/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { technologiesInfo } from '../data/allQuestions.ts';
import { Technology } from '../types/quiz.ts';
import { TechnologyCard } from './TechnologyCard.tsx';
import { CheckCircle2, ShieldCheck, TrendingUp } from 'lucide-react';

interface TechnologyGridProps {
  onSelectTechnology: (tech: Technology) => void;
  inProgressTech?: Technology | null;
}

export const TechnologyGrid: React.FC<TechnologyGridProps> = ({
  onSelectTechnology,
  inProgressTech
}) => {
  const techs: Technology[] = ['html', 'css', 'javascript'];

  return (
    <section id="technologies" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="text-xs font-mono text-[#00F5FF] uppercase tracking-wider mb-2">
            Skill Tracks
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FF] tracking-tight">
            Choose Your Assessment
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#9AA4B8] max-w-md">
          Each assessment progressively scales from Beginner to Advanced. Score 70%+ to unlock each consecutive difficulty tier.
        </p>
      </div>

      {/* Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {techs.map(tech => (
          <TechnologyCard
            key={tech}
            info={technologiesInfo[tech]}
            onSelect={onSelectTechnology}
            hasInProgress={inProgressTech === tech}
          />
        ))}
      </div>

      {/* Assessment Engine Transparency Note */}
      <div className="p-6 rounded-2xl bg-[#111522] border border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#151B2B] border border-white/10 flex items-center justify-center text-[#B6FF5C] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#F5F7FF] mb-1">
              Transparent, Deterministic Skill Classification
            </h4>
            <p className="text-xs text-[#9AA4B8] leading-relaxed max-w-2xl">
              Unlike arbitrary quiz scores, DevLevel evaluates your competency at each level independently. Qualifying for Advanced status requires passing all three levels with 70%+ accuracy on real front-end engineering questions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#9AA4B8] shrink-0 font-mono">
          <div>
            <span className="text-[#B6FF5C] font-semibold">Pass:</span> ≥ 70%
          </div>
          <div>
            <span className="text-[#00F5FF] font-semibold">Tiers:</span> 3 Sequential
          </div>
        </div>
      </div>
    </section>
  );
};
