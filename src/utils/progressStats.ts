import { patterns } from "../data/patterns";
import { quizCards } from "../data/quizCards";
import { roadmapItems } from "../data/roadmapItems";
import { visualizers } from "../data/visualizers";
import type { ProgressState } from "../types";
import { isDue } from "./storage";

export function getProgressStats(progress: ProgressState) {
  const correct = Object.values(progress.quizAttempts).reduce((sum, item) => sum + item.correct, 0);
  const incorrect = Object.values(progress.quizAttempts).reduce((sum, item) => sum + item.incorrect, 0);
  const completedLessons = Object.keys(progress.completedLessons).length;
  const completedRoadmap = Object.values(progress.roadmapProgress).filter(Boolean).length;
  const completedVisualizers = Object.keys(progress.visualizerCompletion).length;
  const dueReviews = quizCards.filter((card) => isDue(progress.reviewSchedule[card.id]?.dueAt)).length;

  return {
    correct,
    incorrect,
    accuracy: correct + incorrect === 0 ? 0 : Math.round((correct / (correct + incorrect)) * 100),
    completedLessons,
    totalLessons: patterns.length,
    completedRoadmap,
    totalRoadmap: roadmapItems.length,
    completedVisualizers,
    totalVisualizers: visualizers.length,
    dueReviews,
  };
}
