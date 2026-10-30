/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types/quiz.ts';

export interface ValidationIssue {
  questionId: string;
  issue: string;
}

export function validateQuestion(q: Question): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!q.id || q.id.trim() === '') {
    issues.push({ questionId: q.id || 'unknown', issue: 'Missing question ID' });
  }

  if (!q.question || q.question.trim() === '') {
    issues.push({ questionId: q.id, issue: 'Empty question text' });
  }

  if (!Array.isArray(q.options) || q.options.length < 2) {
    issues.push({ questionId: q.id, issue: 'Question must have at least 2 options' });
  }

  if (!q.options.includes(q.correctAnswer)) {
    issues.push({
      questionId: q.id,
      issue: `Correct answer "${q.correctAnswer}" is not present in options array: [${q.options.join(', ')}]`
    });
  }

  // Check for duplicate options
  const uniqueOptions = new Set(q.options);
  if (uniqueOptions.size !== q.options.length) {
    issues.push({ questionId: q.id, issue: 'Question contains duplicate options' });
  }

  return issues;
}

export function validateQuestionBank(questions: Question[]): ValidationIssue[] {
  const allIssues: ValidationIssue[] = [];
  const seenIds = new Set<string>();

  for (const q of questions) {
    if (seenIds.has(q.id)) {
      allIssues.push({ questionId: q.id, issue: `Duplicate question ID: ${q.id}` });
    }
    seenIds.add(q.id);

    const issues = validateQuestion(q);
    allIssues.push(...issues);
  }

  return allIssues;
}
