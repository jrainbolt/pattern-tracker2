import type { Confidence, ProgressState } from "../types";

const key = "interview-pattern-trainer:v1";

export const initialProgress: ProgressState = {
  quizAttempts: {},
  reviewSchedule: {},
  completedLessons: {},
  visualizerCompletion: {},
  roadmapProgress: {},
};

export function readProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return initialProgress;
    return { ...initialProgress, ...JSON.parse(raw) };
  } catch {
    return initialProgress;
  }
}

export function writeProgress(progress: ProgressState): void {
  localStorage.setItem(key, JSON.stringify(progress));
}

export function nextDueDate(confidence: Confidence): string {
  const days = confidence === "low" ? 1 : confidence === "medium" ? 3 : 7;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export function isDue(dueAt?: string): boolean {
  return !dueAt || new Date(dueAt).getTime() <= Date.now();
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(value));
}
