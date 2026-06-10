import { useMemo, useState } from "react";
import type { Confidence, ProgressState } from "../types";
import { initialProgress, nextDueDate, readProgress, writeProgress } from "../utils/storage";

type ProgressUpdater = (current: ProgressState) => ProgressState;

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => readProgress());

  const updateProgress = (updater: ProgressUpdater) => {
    setProgress((current) => {
      const next = updater(current);
      writeProgress(next);
      return next;
    });
  };

  const actions = useMemo(
    () => ({
      recordQuiz(cardId: string, correct: boolean) {
        updateProgress((current) => {
          const previous = current.quizAttempts[cardId] ?? { correct: 0, incorrect: 0, lastAttemptAt: "" };
          return {
            ...current,
            quizAttempts: {
              ...current.quizAttempts,
              [cardId]: {
                correct: previous.correct + (correct ? 1 : 0),
                incorrect: previous.incorrect + (correct ? 0 : 1),
                lastAttemptAt: new Date().toISOString(),
              },
            },
            reviewSchedule: {
              ...current.reviewSchedule,
              [cardId]: {
                dueAt: nextDueDate(correct ? "medium" : "low"),
                confidence: correct ? "medium" : "low",
                attempts: (current.reviewSchedule[cardId]?.attempts ?? 0) + 1,
              },
            },
          };
        });
      },
      scheduleReview(cardId: string, confidence: Confidence) {
        updateProgress((current) => ({
          ...current,
          reviewSchedule: {
            ...current.reviewSchedule,
            [cardId]: {
              dueAt: nextDueDate(confidence),
              confidence,
              attempts: (current.reviewSchedule[cardId]?.attempts ?? 0) + 1,
            },
          },
        }));
      },
      completeLesson(patternId: string) {
        updateProgress((current) => ({
          ...current,
          completedLessons: { ...current.completedLessons, [patternId]: new Date().toISOString() },
        }));
      },
      completeVisualizer(id: string) {
        updateProgress((current) => ({
          ...current,
          visualizerCompletion: { ...current.visualizerCompletion, [id]: new Date().toISOString() },
        }));
      },
      toggleRoadmap(id: string) {
        updateProgress((current) => ({
          ...current,
          roadmapProgress: { ...current.roadmapProgress, [id]: !current.roadmapProgress[id] },
        }));
      },
      resetProgress() {
        writeProgress(initialProgress);
        setProgress(initialProgress);
      },
    }),
    [],
  );

  return { progress, ...actions };
}
