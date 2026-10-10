const flags = ["#c4162a", "#157a3a", "#e7a322", "#fffdf8", "#0c6e96", "#a12658"];

export function Bunting() {
  return (
    <div className="flex h-4 overflow-hidden" aria-hidden>
      {Array.from({ length: 48 }).map((_, index) => (
        <span
          key={index}
          className="h-4 w-6 shrink-0"
          style={{
            background: flags[index % flags.length],
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          }}
        />
      ))}
    </div>
  );
}
