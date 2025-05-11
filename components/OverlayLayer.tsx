/**
 * OverlayLayer renders a blue border around the Sudoku grid.
 */
export const OverlayLayer = () => {
  return (
    <div class="flex items-center justify-center w-full max-w-xs aspect-square relative">
      <svg
        class="absolute left-0 top-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 9 9"
        style={{
          aspectRatio: "1/1",
          inset: 0,
          height: "100%",
          width: "100%",
          display: "block",
        }}
      >
        <rect
          x={0}
          y={0}
          width={9}
          height={9}
          fill="none"
          stroke="#2563eb"
          strokeWidth={0.08}
        />
      </svg>
      {/* ...render the grid/table here if needed... */}
    </div>
  );
};
