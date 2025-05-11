import { h } from "preact";
import type { GameMode } from "../types/sudoku.ts";
import { GAME_MODE_DETAILS } from "../constants.ts";

export function TechniqueModal(
  { open, mode, onClose }: {
    open: boolean;
    mode: GameMode | null;
    onClose: () => void;
  },
) {
  if (!open || !mode) return null;
  const details = GAME_MODE_DETAILS[mode];
  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          type="button"
          class="absolute top-2 right-2 text-gray-400 hover:text-green-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 class="text-2xl font-bold text-green-700 mb-2">{details.name}</h2>
        <p class="text-gray-700 mb-4">{details.description}</p>
        {details.example && (
          <div class="bg-green-50 border-l-4 border-green-400 p-3 text-green-800">
            <span class="font-semibold">Example:</span> {details.example}
          </div>
        )}
      </div>
    </div>
  );
}
