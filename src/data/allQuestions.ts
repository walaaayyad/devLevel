/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DifficultyLevel, Question, Technology, TechnologyInfo } from '../types/quiz.ts';
import { htmlQuestions } from './htmlQuestions.ts';
import { cssQuestions } from './cssQuestions.ts';
import { javascriptQuestions } from './javascriptQuestions.ts';

export const allQuestions: Record<Technology, Question[]> = {
  html: htmlQuestions,
  css: cssQuestions,
  javascript: javascriptQuestions,
};

export const technologiesInfo: Record<Technology, TechnologyInfo> = {
  html: {
    id: 'html',
    name: 'HTML',
    subtitle: 'Structure the Web',
    description: 'Test your knowledge of semantic HTML, document structure, forms, accessibility, and modern HTML elements.',
    accentColor: '#FF6B4A', // Coral/orange
    borderColor: 'rgba(255, 107, 74, 0.4)',
    glowColor: 'rgba(255, 107, 74, 0.25)',
    icon: 'CodeXml',
    levels: [
      {
        level: 'beginner',
        label: 'Beginner',
        questionCount: htmlQuestions.filter(q => q.level === 'beginner').length
      },
      {
        level: 'intermediate',
        label: 'Intermediate',
        questionCount: htmlQuestions.filter(q => q.level === 'intermediate').length
      },
      {
        level: 'advanced',
        label: 'Advanced',
        questionCount: htmlQuestions.filter(q => q.level === 'advanced').length
      }
    ]
  },
  css: {
    id: 'css',
    name: 'CSS',
    subtitle: 'Design the Experience',
    description: 'Evaluate your skills in selectors, the box model, Flexbox, Grid, responsive design, animations, and modern CSS.',
    accentColor: '#00F5FF', // Neon Cyan
    borderColor: 'rgba(0, 245, 255, 0.4)',
    glowColor: 'rgba(0, 245, 255, 0.25)',
    icon: 'Palette',
    levels: [
      {
        level: 'beginner',
        label: 'Beginner',
        questionCount: cssQuestions.filter(q => q.level === 'beginner').length
      },
      {
        level: 'intermediate',
        label: 'Intermediate',
        questionCount: cssQuestions.filter(q => q.level === 'intermediate').length
      },
      {
        level: 'advanced',
        label: 'Advanced',
        questionCount: cssQuestions.filter(q => q.level === 'advanced').length
      }
    ]
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    subtitle: 'Bring Interfaces to Life',
    description: 'Challenge your understanding of variables, functions, arrays, objects, DOM manipulation, asynchronous JavaScript, and advanced concepts.',
    accentColor: '#FFE600', // Neon Yellow/Gold
    borderColor: 'rgba(255, 230, 0, 0.4)',
    glowColor: 'rgba(255, 230, 0, 0.25)',
    icon: 'Terminal',
    levels: [
      {
        level: 'beginner',
        label: 'Beginner',
        questionCount: javascriptQuestions.filter(q => q.level === 'beginner').length
      },
      {
        level: 'intermediate',
        label: 'Intermediate',
        questionCount: javascriptQuestions.filter(q => q.level === 'intermediate').length
      },
      {
        level: 'advanced',
        label: 'Advanced',
        questionCount: javascriptQuestions.filter(q => q.level === 'advanced').length
      }
    ]
  }
};

/**
 * Retrieves questions for a specific technology and difficulty level.
 * Optionally limits to maxCount.
 */
export function getQuestionsForLevel(
  technology: Technology,
  level: DifficultyLevel,
  maxCount?: number
): Question[] {
  const bank = allQuestions[technology] || [];
  const levelQuestions = bank.filter(q => q.level === level);
  if (typeof maxCount === 'number' && maxCount > 0) {
    return levelQuestions.slice(0, maxCount);
  }
  return levelQuestions;
}

/**
 * Gets total question count for a technology across all levels.
 */
export function getTotalQuestionsForTech(technology: Technology): number {
  return allQuestions[technology]?.length || 0;
}
