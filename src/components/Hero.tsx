/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Layers, Award, Zap, BarChart3 } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-white/[0.08]">
      {/* Background ambient lighting and subtle developer grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 20%, rgba(0, 245, 255, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 80% 40%, rgba(155, 92, 255, 0.12) 0%, transparent 50%),
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Subtle kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F5FF] mb-5 tracking-wide">
          <span>Front-End Technical Assessment</span>
          <span aria-hidden="true" className="text-white/30">·</span>
          <span>Adaptive Evaluation</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F5F7FF] max-w-3xl mx-auto leading-[1.1] mb-6">
          Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#9B5CFF] to-[#B6FF5C]">Front-End Skills.</span>
        </h1>

        {/* Supporting description */}
        <p className="text-base sm:text-lg text-[#9AA4B8] max-w-2xl mx-auto mb-9 leading-relaxed">
          Test your knowledge. Discover your strengths. Find out what to learn next.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          <button
            onClick={onStartClick}
            className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-[#090B12] bg-[#00F5FF] hover:bg-[#35E69B] active:scale-[0.98] rounded-xl transition-all shadow-[0_0_30px_-5px_rgba(0,245,255,0.5)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Start Your Assessment</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-[#F5F7FF] bg-[#151B2B] hover:bg-[#1d253a] hover:border-[#00F5FF]/30 border border-white/10 rounded-xl transition-all cursor-pointer"
          >
            Explore Technologies
          </button>
        </div>

        {/* Core Platform Pillars (truthful, accurate features) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-[#111522] border border-white/[0.06] hover:border-white/10 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#151B2B] border border-white/10 flex items-center justify-center text-[#FF6B4A] mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold text-[#F5F7FF] mb-1">3 Core Technologies</div>
            <div className="text-xs text-[#9AA4B8]">HTML, CSS, and modern JavaScript assessments.</div>
          </div>

          <div className="p-4 rounded-xl bg-[#111522] border border-white/[0.06] hover:border-white/10 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#151B2B] border border-white/10 flex items-center justify-center text-[#00F5FF] mb-3">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold text-[#F5F7FF] mb-1">3 Difficulty Levels</div>
            <div className="text-xs text-[#9AA4B8]">Beginner, Intermediate, and Advanced tiers.</div>
          </div>

          <div className="p-4 rounded-xl bg-[#111522] border border-white/[0.06] hover:border-white/10 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#151B2B] border border-white/10 flex items-center justify-center text-[#B6FF5C] mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold text-[#F5F7FF] mb-1">Instant Feedback</div>
            <div className="text-xs text-[#9AA4B8]">In-depth explanations for every answer.</div>
          </div>

          <div className="p-4 rounded-xl bg-[#111522] border border-white/[0.06] hover:border-white/10 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#151B2B] border border-white/10 flex items-center justify-center text-[#9B5CFF] mb-3">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold text-[#F5F7FF] mb-1">Personalized Results</div>
            <div className="text-xs text-[#9AA4B8]">Topic strengths, gaps, and study tasks.</div>
          </div>
        </div>
      </div>
    </section>
  );
};
