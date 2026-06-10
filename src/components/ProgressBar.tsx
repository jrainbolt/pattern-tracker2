export function ProgressBar({ value, label }: { value: number; label: string }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div className="progressWrap" aria-label={`${label}: ${safeValue}%`}>
      <div className="progressMeta">
        <span>{label}</span>
        <strong>{safeValue}%</strong>
      </div>
      <div className="progressTrack">
        <div className="progressFill" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
