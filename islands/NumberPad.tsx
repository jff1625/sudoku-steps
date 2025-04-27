import { useEffect, useRef } from "preact/hooks";

type NumberPadProps = {
  onSelect: (num: string | null) => void;
  selected: string | null;
  gridRef?: preact.RefObject<HTMLElement>;
};

export default function NumberPad(
  { onSelect, selected, gridRef }: NumberPadProps,
) {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      // If click is inside NumberPad, ignore
      if (containerRef.current && containerRef.current.contains(target)) return;
      // If click is inside grid, ignore
      if (gridRef && gridRef.current && gridRef.current.contains(target)) {
        return;
      }
      // Otherwise, deselect
      if (selected !== null) {
        onSelect(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selected, onSelect, gridRef]);

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", gap: 8, margin: "16px 0" }}
    >
      {numbers.map((num) => (
        <button
          key={num}
          type="button"
          style={{
            width: 32,
            height: 32,
            fontSize: 18,
            fontWeight: "bold",
            borderRadius: 4,
            border: selected === num ? "2px solid #22c55e" : "1px solid #ccc",
            background: selected === num ? "#bbf7d0" : "#fff",
            color: "#222",
            cursor: "pointer",
          }}
          onClick={() => onSelect(selected === num ? null : num)}
        >
          {num}
        </button>
      ))}
      <button
        type="button"
        style={{
          width: 32,
          height: 32,
          fontSize: 18,
          fontWeight: "bold",
          borderRadius: 4,
          border: selected === null ? "2px solid #22c55e" : "1px solid #ccc",
          background: selected === null ? "#bbf7d0" : "#fff",
          color: "#222",
          cursor: "pointer",
        }}
        title="Eraser"
        onClick={() => onSelect("eraser")}
      >
        🧹
      </button>
    </div>
  );
}
