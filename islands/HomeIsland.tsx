import { useState } from "preact/hooks";
import { GAME_MODE_DETAILS, GAME_MODES } from "../constants.ts";
import { SudokuGame } from "./SudokuGame.tsx";
import type { GameMode } from "../types/sudoku.ts";

export const HomeIsland = () => {
  const [selectedMode, setSelectedMode] = useState<GameMode>("normal");
  const [resetKey, setResetKey] = useState(0);
  const [showLiveGame, setShowLiveGame] = useState(true); // true on initial load

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    setShowLiveGame(false);
  };
  const handleStart = () => {
    setShowLiveGame(true);
    setResetKey((k) => k + 1);
  };

  return (
    <div class="w-full flex flex-col items-center justify-center">
      <p class="text-center text-gray-700 text-sm sm:text-base max-w-md mt-4 mb-4">
        Sudoku Steps lets you practice and master specific Sudoku solving
        techniques—one at a time—so you can tackle any puzzle with confidence.
      </p>
      {/* Start/Restart selected game mode button above the board */}
      <div class="w-full max-w-xs flex flex-col items-center mb-6">
        <button
          type="button"
          class={`w-full text-base font-semibold text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-green-400 ${
            selectedMode ? "ring-2 ring-green-400" : ""
          }`}
          onClick={handleStart}
        >
          {`Start ${GAME_MODE_DETAILS[selectedMode].name} Game`}
        </button>
      </div>
      {/* Main area: show example/description or live game */}
      <div class="w-full flex flex-col items-center justify-center min-h-[320px]">
        {showLiveGame
          ? (
            <>
              <SudokuGame key={resetKey} gameMode={selectedMode} />
            </>
          )
          : (
            <div class="w-full flex flex-col items-center justify-center bg-gray-50 border border-green-200 rounded p-4 mb-2">
              <div class="font-bold text-green-700 mb-2">
                {GAME_MODE_DETAILS[selectedMode].name} Example
              </div>
              {/* Placeholder for static example board with arrows/visuals */}
              <div class="w-full h-40 flex items-center justify-center bg-white border border-dashed border-green-300 rounded mb-2 text-gray-400">
                [Static example board for {GAME_MODE_DETAILS[selectedMode].name}
                {" "}
                goes here]
              </div>
              <div class="text-gray-700 text-sm text-center mb-1">
                {GAME_MODE_DETAILS[selectedMode].description}
              </div>
              {GAME_MODE_DETAILS[selectedMode].example && (
                <div class="text-green-700 text-xs text-center">
                  Example: {GAME_MODE_DETAILS[selectedMode].example}
                </div>
              )}
            </div>
          )}
      </div>
      {/* Game mode grid below the board */}
      <div class="w-full max-w-md grid grid-cols-3 gap-2 sm:gap-3 my-4">
        {GAME_MODES.map((mode) => (
          <div
            key={mode}
            class={`relative flex flex-col items-center bg-white rounded shadow border border-green-200 p-2 sm:p-3 ${
              selectedMode === mode ? "ring-2 ring-green-400" : ""
            }`}
          >
            <button
              type="button"
              class={`w-full text-xs sm:text-sm font-semibold text-green-700 py-2 px-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400`}
              onClick={() => handleModeSelect(mode)}
              aria-label={`Select ${GAME_MODE_DETAILS[mode].name}`}
            >
              {GAME_MODE_DETAILS[mode].name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeIsland;
