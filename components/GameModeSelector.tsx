import type { GameMode } from "../types/sudoku.ts";

import { GAME_MODES } from "../constants/constants.ts";

type GameModeSelectorProps = {
  onSelect: (mode: GameMode) => void;
};

export const GameModeSelector = (
  { onSelect }: GameModeSelectorProps,
) => {
  return (
    <div class="w-full max-w-md grid grid-cols-3 gap-2 sm:gap-3 my-4">
      {GAME_MODES.map((mode) => (
        <button
          key={mode}
          type="button"
          class="w-full text-xs sm:text-sm font-semibold text-green-700 py-2 px-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400 bg-white border border-green-200"
          onClick={() => onSelect(mode)}
          aria-label={`Select ${
            mode.charAt(0).toUpperCase() + mode.slice(1)
          } mode`}
        >
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>
  );
};
