import type { Difficulty } from "../types";

export function Badge({ children, tone }: { children: string; tone?: Difficulty | "pattern" | "done" }) {
  return <span className={`badge ${tone ? `badge-${tone.toLowerCase()}` : ""}`}>{children}</span>;
}
