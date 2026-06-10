import { Link } from "react-router-dom";
import { ProgressBar } from "../components/ProgressBar";
import { StatCard } from "../components/StatCard";
import type { ProgressState } from "../types";
import { getProgressStats } from "../utils/progressStats";

export default function Dashboard({ progress }: { progress: ProgressState }) {
  const stats = getProgressStats(progress);
  const lessonPct = Math.round((stats.completedLessons / stats.totalLessons) * 100);
  const roadmapPct = Math.round((stats.completedRoadmap / stats.totalRoadmap) * 100);

  return (
    <section className="page heroGrid">
      <div className="heroPanel">
        <p className="eyebrow">Java-first coding interview practice</p>
        <h1>Learn the pattern before memorizing the problem.</h1>
        <p className="lead">
          Build recognition skills with focused lessons, flashcards, spaced review, and small algorithm visualizers.
        </p>
        <div className="actionRow">
          <Link className="button primary" to="/learn">Start Learning</Link>
          <Link className="button" to="/quiz">Practice Cards</Link>
          <Link className="button" to="/review">Review Due</Link>
        </div>
      </div>
      <aside className="summaryPanel">
        <div className="statsGrid">
          <StatCard label="Accuracy" value={`${stats.accuracy}%`} detail={`${stats.correct} correct / ${stats.incorrect} misses`} />
          <StatCard label="Due Reviews" value={stats.dueReviews} detail="Cards ready today" />
          <StatCard label="Visualizers" value={`${stats.completedVisualizers}/${stats.totalVisualizers}`} detail="Completed walkthroughs" />
        </div>
        <ProgressBar label="Lessons complete" value={lessonPct} />
        <ProgressBar label="Roadmap complete" value={roadmapPct} />
      </aside>
      <div className="quickGrid">
        <Link className="featureCard" to="/learn"><strong>Pattern lessons</strong><span>Clues, Java templates, mistakes, and complexity notes.</span></Link>
        <Link className="featureCard" to="/quiz"><strong>Flashcard quiz</strong><span>Identify pattern, data structure, and time complexity.</span></Link>
        <Link className="featureCard" to="/visualizers"><strong>Algorithm visualizers</strong><span>Step through Java snippets with state panels.</span></Link>
        <Link className="featureCard" to="/roadmap"><strong>Practice roadmap</strong><span>Original summaries mapped to patterns.</span></Link>
      </div>
    </section>
  );
}
