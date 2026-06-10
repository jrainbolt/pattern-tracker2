import { Badge } from "../components/Badge";
import { patternById } from "../data/patterns";
import { roadmapItems } from "../data/roadmapItems";
import type { ProgressState } from "../types";

export default function Roadmap({ progress, toggleRoadmap }: { progress: ProgressState; toggleRoadmap: (id: string) => void }) {
  return (
    <section className="page">
      <div className="pageHeader">
        <p className="eyebrow">Practice roadmap</p>
        <h1>Build pattern fluency</h1>
      </div>
      <div className="roadmapList">
        {roadmapItems.map((item) => {
          const done = Boolean(progress.roadmapProgress[item.id]);
          return (
            <article className={`roadmapItem ${done ? "done" : ""}`} key={item.id}>
              <input type="checkbox" checked={done} onChange={() => toggleRoadmap(item.id)} aria-label={`Mark ${item.title} complete`} />
              <div>
                <div className="cardTop">
                  <Badge tone="pattern">{patternById[item.patternId].shortName}</Badge>
                  <Badge tone={item.difficulty}>{item.difficulty}</Badge>
                </div>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                {item.externalLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>)}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
