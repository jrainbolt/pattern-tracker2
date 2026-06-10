import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";
import { visualizerById } from "../data/visualizers";
import type { ProgressState } from "../types";

export default function VisualizerDetail({ completeVisualizer }: { progress: ProgressState; completeVisualizer: (id: string) => void }) {
  const { visualizerId } = useParams();
  const visualizer = visualizerId ? visualizerById[visualizerId] : undefined;
  const [stepIndex, setStepIndex] = useState(0);
  if (!visualizer) return <section className="page"><h1>Visualizer not found</h1><Link to="/visualizers">Back to visualizers</Link></section>;

  const step = visualizer.steps[stepIndex];
  const currentVisualizer = visualizer;
  const last = stepIndex === currentVisualizer.steps.length - 1;

  function next() {
    if (last) completeVisualizer(currentVisualizer.id);
    else setStepIndex((current) => current + 1);
  }

  return (
    <section className="page visualizerPage">
      <div className="pageHeader">
        <Link className="textLink" to="/visualizers">Back to visualizers</Link>
        <h1>{currentVisualizer.title}</h1>
        <p className="lead">{currentVisualizer.description}</p>
      </div>
      <div className="visualizerGrid">
        <CodeBlock code={currentVisualizer.code} activeLine={step.line} />
        <aside className="statePanel">
          <h2>Step {stepIndex + 1} of {visualizer.steps.length}</h2>
          <p>{step.explanation}</p>
          <h3>Variables</h3>
          <div className="kvGrid">
            {Object.entries(step.variables).map(([key, value]) => <span key={key}><b>{key}</b>{String(value)}</span>)}
          </div>
          <h3>Data structures</h3>
          {Object.entries(step.structures).map(([name, values]) => (
            <div className="structureBox" key={name}>
              <strong>{name}</strong>
              <div className="chipRow">{values.length ? values.map((value) => <span className="chip animatedChip" key={value}>{value}</span>) : <span className="muted">empty</span>}</div>
            </div>
          ))}
          <div className="stepControls">
            <button className="button" onClick={() => setStepIndex((current) => Math.max(0, current - 1))} disabled={stepIndex === 0}>Back</button>
            <button className="button primary" onClick={next}>{last ? "Mark Complete" : "Next"}</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
