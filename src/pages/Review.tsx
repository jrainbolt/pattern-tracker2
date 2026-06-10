import { useState } from "react";
import { Badge } from "../components/Badge";
import { patternById } from "../data/patterns";
import { quizCards } from "../data/quizCards";
import type { Confidence, ProgressState } from "../types";
import { formatDate, isDue } from "../utils/storage";

export default function Review({ progress, scheduleReview }: { progress: ProgressState; scheduleReview: (id: string, confidence: Confidence) => void }) {
  const dueCards = quizCards.filter((card) => isDue(progress.reviewSchedule[card.id]?.dueAt));
  const upcomingCards = quizCards.filter((card) => !isDue(progress.reviewSchedule[card.id]?.dueAt));
  const [openCardId, setOpenCardId] = useState<string | null>(dueCards[0]?.id ?? null);

  function rate(cardId: string, confidence: Confidence) {
    scheduleReview(cardId, confidence);
    const remaining = dueCards.filter((card) => card.id !== cardId);
    setOpenCardId(remaining[0]?.id ?? null);
  }

  return (
    <section className="page">
      <div className="pageHeader">
        <p className="eyebrow">Spaced review</p>
        <h1>Cards due today</h1>
        <p className="lead">Low confidence returns tomorrow, medium in 3 days, high in 7 days.</p>
      </div>
      {dueCards.length === 0 ? <div className="emptyState">No cards are due right now. Quiz a few cards to seed your review queue.</div> : null}
      <div className="reviewList">
        {dueCards.map((card) => {
          const open = openCardId === card.id;
          return (
            <article className="reviewCard" key={card.id}>
              <button className="reviewHeader" onClick={() => setOpenCardId(open ? null : card.id)}>
                <span>{card.title}</span>
                <Badge tone={card.difficulty}>{card.difficulty}</Badge>
              </button>
              {open ? (
                <div className="reviewBody">
                  <p>{card.summary}</p>
                  <p><b>Pattern:</b> {patternById[card.answerPatternId].name}</p>
                  <p><b>Why:</b> {card.explanation}</p>
                  <div className="segmented">
                    <button onClick={() => rate(card.id, "low")}>Low</button>
                    <button onClick={() => rate(card.id, "medium")}>Medium</button>
                    <button onClick={() => rate(card.id, "high")}>High</button>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
      {upcomingCards.length > 0 ? (
        <>
          <h2 className="sectionTitle">Upcoming</h2>
          <div className="miniGrid">
            {upcomingCards.slice(0, 6).map((card) => (
              <div className="miniCard" key={card.id}>
                <Badge tone={card.difficulty}>{card.difficulty}</Badge>
                <h3>{card.title}</h3>
                <p>Due {formatDate(progress.reviewSchedule[card.id].dueAt)}</p>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
