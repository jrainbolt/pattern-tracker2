import { Link } from "react-router-dom";
import { Badge } from "../components/Badge";
import { patternById } from "../data/patterns";
import { visualizers } from "../data/visualizers";
import type { ProgressState } from "../types";

export default function Visualizers({ progress }: { progress: ProgressState }) {
  return (
    <section className="page">
      <div className="pageHeader">
        <p className="eyebrow">Algorithm visualizers</p>
        <h1>Step through Java state</h1>
      </div>
      <div className="cardGrid">
        {visualizers.map((visualizer) => (
          <Link className="patternCard" to={`/visualizers/${visualizer.id}`} key={visualizer.id}>
            <div className="cardTop">
              <Badge tone="pattern">{patternById[visualizer.patternId].shortName}</Badge>
              {progress.visualizerCompletion[visualizer.id] ? <Badge tone="done">Complete</Badge> : null}
            </div>
            <h2>{visualizer.title}</h2>
            <p>{visualizer.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
