export function CodeBlock({ code, activeLine }: { code: string | string[]; activeLine?: number }) {
  const lines = Array.isArray(code) ? code : code.split("\n");
  return (
    <pre className="codeBlock">
      {lines.map((line, index) => (
        <code key={`${line}-${index}`} className={activeLine === index + 1 ? "activeLine" : ""}>
          <span className="lineNo">{index + 1}</span>
          {line || " "}
        </code>
      ))}
    </pre>
  );
}
