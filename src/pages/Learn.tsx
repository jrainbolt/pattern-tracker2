import { Link } from "react-router-dom";
import { Badge } from "../components/Badge";
import { patterns } from "../data/patterns";
import type { ProgressState } from "../types";

export default function Learn({ progress }: { progress: ProgressState }) {
  return (
    <section className="page">
      <div className="pageHeader">
        <p className="eyebrow">Pattern library</p>
        <h1>Choose a pattern to learn</h1>
      </div>
      <div className="cardGrid">
        {patterns.map((pattern) => {
          const done = Boolean(progress.completedLessons[pattern.id]);
          return (
            <Link className="patternCard" key={pattern.id} to={`/learn/${pattern.id}`}>
              <div className="cardTop">
                <Badge tone={pattern.difficulty}>{pattern.difficulty}</Badge>
                {done ? <Badge tone="done">Complete</Badge> : null}
              </div>
              <h2>{pattern.name}</h2>
              <p>{pattern.summary}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
