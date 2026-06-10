import { useMemo, useState } from "react";
import { Badge } from "../components/Badge";
import { patternById, patterns } from "../data/patterns";
import { quizCards } from "../data/quizCards";
import type { ProgressState } from "../types";

export default function Quiz({ recordQuiz }: { progress: ProgressState; recordQuiz: (id: string, correct: boolean) => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [dataStructure, setDataStructure] = useState("");
  const [complexity, setComplexity] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const card = quizCards[index];
  const correct = selected === card.answerPatternId && dataStructure === card.dataStructure && complexity === card.timeComplexity;

  const patternOptions = useMemo(
    () => patterns.map((pattern) => ({ id: pattern.id, name: pattern.name })).sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );
  const dataStructureOptions = useMemo(
    () => Array.from(new Set(quizCards.map((quizCard) => quizCard.dataStructure))).sort(),
    [],
  );
  const complexityOptions = useMemo(
    () => Array.from(new Set(quizCards.map((quizCard) => quizCard.timeComplexity))).sort(),
    [],
  );

  function submit() {
    setRevealed(true);
    recordQuiz(card.id, correct);
  }

  function next() {
    if (index === quizCards.length - 1) {
      setCompleted(true);
      return;
    }
    setIndex((current) => current + 1);
    setSelected("");
    setDataStructure("");
    setComplexity("");
    setRevealed(false);
  }

  function restart() {
    setIndex(0);
    setSelected("");
    setDataStructure("");
    setComplexity("");
    setRevealed(false);
    setCompleted(false);
  }

  if (completed) {
    return (
      <section className="page narrow">
        <div className="pageHeader">
          <p className="eyebrow">Flashcard quiz</p>
          <h1>Quiz complete</h1>
          <p className="lead">You finished this pass through all {quizCards.length} cards. Reviews are now scheduled from your answers.</p>
        </div>
        <article className="quizCard">
          <button className="button primary fullWidth" onClick={restart}>Start Another Pass</button>
        </article>
      </section>
    );
  }

  return (
    <section className="page narrow">
      <div className="pageHeader">
        <p className="eyebrow">Flashcard quiz</p>
        <h1>Recognize the pattern</h1>
      </div>
      <article className="quizCard">
        <div className="cardTop">
          <Badge tone={card.difficulty}>{card.difficulty}</Badge>
          <span className="muted">Card {index + 1} of {quizCards.length}</span>
        </div>
        <h2>{card.title}</h2>
        <p>{card.summary}</p>
        <label>
          What pattern is this?
          <select value={selected} onChange={(event) => setSelected(event.target.value)} disabled={revealed}>
            <option value="">Choose a pattern</option>
            {patternOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
          </select>
        </label>
        <label>
          Useful data structure
          <select value={dataStructure} onChange={(event) => setDataStructure(event.target.value)} disabled={revealed}>
            <option value="">Choose a data structure</option>
            {dataStructureOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label>
          Likely time complexity
          <select value={complexity} onChange={(event) => setComplexity(event.target.value)} disabled={revealed}>
            <option value="">Choose a time complexity</option>
            {complexityOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        {!revealed ? (
          <button className="button primary fullWidth" onClick={submit} disabled={!selected || !dataStructure || !complexity}>Reveal Explanation</button>
        ) : (
          <div className={`answerPanel ${correct ? "correct" : "incorrect"}`}>
            <strong>{correct ? "All three choices are right." : "Review the pattern signals."}</strong>
            <p><b>Pattern:</b> {patternById[card.answerPatternId].name}</p>
            <p><b>Data structure:</b> {card.dataStructure}</p>
            <p><b>Time:</b> {card.timeComplexity}</p>
            <p>{card.explanation}</p>
            <button className="button primary fullWidth" onClick={next}>Next Card</button>
          </div>
        )}
      </article>
    </section>
  );
}
