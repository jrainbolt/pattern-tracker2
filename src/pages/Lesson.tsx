import { Link, useParams } from "react-router-dom";
import { Badge } from "../components/Badge";
import { CodeBlock } from "../components/CodeBlock";
import { patternById } from "../data/patterns";
import type { ProgressState } from "../types";

export default function Lesson({ progress, completeLesson }: { progress: ProgressState; completeLesson: (id: string) => void }) {
  const { patternId } = useParams();
  const pattern = patternId ? patternById[patternId] : undefined;
  if (!pattern) return <section className="page"><h1>Pattern not found</h1><Link to="/learn">Back to lessons</Link></section>;

  return (
    <section className="page lessonLayout">
      <div className="pageHeader">
        <Link className="textLink" to="/learn">Back to lessons</Link>
        <div className="cardTop">
          <Badge tone={pattern.difficulty}>{pattern.difficulty}</Badge>
          {progress.completedLessons[pattern.id] ? <Badge tone="done">Complete</Badge> : null}
        </div>
        <h1>{pattern.name}</h1>
        <p className="lead">{pattern.summary}</p>
      </div>
      <article className="contentPanel">
        <h2>What it is</h2>
        <p>{pattern.what}</p>
        <h2>When to use it</h2>
        <ul>{pattern.when.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>Common clues</h2>
        <div className="chipRow">{pattern.clues.map((clue) => <span className="chip" key={clue}>{clue}</span>)}</div>
        <h2>Java template</h2>
        <CodeBlock code={pattern.javaTemplate} />
        <h2>Common mistakes</h2>
        <ul>{pattern.mistakes.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>Complexity notes</h2>
        <p>{pattern.complexity}</p>
        <h2>Example practice</h2>
        <div className="miniGrid">
          {pattern.examples.map((example) => (
            <div className="miniCard" key={example.title}>
              <Badge tone={example.difficulty}>{example.difficulty}</Badge>
              <h3>{example.title}</h3>
              <p>{example.summary}</p>
              {example.links.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>)}
            </div>
          ))}
        </div>
        <button className="button primary fullWidth" onClick={() => completeLesson(pattern.id)}>Mark Lesson Complete</button>
      </article>
    </section>
  );
}
