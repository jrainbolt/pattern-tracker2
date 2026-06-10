export type Difficulty = "Easy" | "Medium" | "Hard";

export interface PracticeLink {
  label: string;
  url: string;
}

export interface ExampleProblem {
  title: string;
  difficulty: Difficulty;
  summary: string;
  links: PracticeLink[];
}

export interface Pattern {
  id: string;
  name: string;
  shortName: string;
  difficulty: Difficulty;
  summary: string;
  what: string;
  when: string[];
  clues: string[];
  javaTemplate: string;
  mistakes: string[];
  complexity: string;
  examples: ExampleProblem[];
}

export interface QuizCard {
  id: string;
  title: string;
  summary: string;
  answerPatternId: string;
  dataStructure: string;
  timeComplexity: string;
  explanation: string;
  difficulty: Difficulty;
}

export interface RoadmapItem {
  id: string;
  title: string;
  patternId: string;
  difficulty: Difficulty;
  summary: string;
  externalLinks: PracticeLink[];
}

export interface VisualizerStep {
  line: number;
  explanation: string;
  variables: Record<string, string | number | boolean>;
  structures: Record<string, string[]>;
}

export interface Visualizer {
  id: string;
  title: string;
  patternId: string;
  description: string;
  code: string[];
  steps: VisualizerStep[];
}

export type Confidence = "low" | "medium" | "high";

export interface ProgressState {
  quizAttempts: Record<string, { correct: number; incorrect: number; lastAttemptAt: string }>;
  reviewSchedule: Record<string, { dueAt: string; confidence: Confidence; attempts: number }>;
  completedLessons: Record<string, string>;
  visualizerCompletion: Record<string, string>;
  roadmapProgress: Record<string, boolean>;
}
