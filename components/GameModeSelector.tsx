import { h } from "preact";
import type { GameMode } from "../types/sudoku.ts";
import { GAME_MODE_DETAILS } from "../constants.ts";

const GAME_MODE_LIST = Object.entries(GAME_MODE_DETAILS) as [
  GameMode,
  { name: string; description: string; example?: string },
][];

export function GameModeSelector(
  { onSelect, onInfo }: {
    onSelect: (mode: GameMode) => void;
    onInfo: (mode: GameMode) => void;
  },
) {
  return (
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      {GAME_MODE_LIST.map(([key, mode]) => (
        <div
          key={key}
          class="bg-white rounded-lg shadow p-4 flex flex-col justify-between border border-green-200"
        >
          <div>
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-green-700">{mode.name}</h2>
              <button
                type="button"
                class="ml-2 text-green-500 hover:text-green-700"
                aria-label={`Learn more about ${mode.name}`}
                onClick={() => onInfo(key)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                  />
                </svg>
              </button>
            </div>
            <p class="text-gray-600 mt-1">{mode.description}</p>
          </div>
          <button
            type="button"
            class="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => onSelect(key)}
          >
            Start
          </button>
        </div>
      ))}
    </div>
  );
}
