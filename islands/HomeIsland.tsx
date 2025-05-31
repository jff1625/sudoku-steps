// import { BAND_EXAMPLE } from "../constants/exampleBoards/band.ts";
// import { SudokuExample } from "./SudokuExample.tsx";
import { GameModeSelector } from "../components/GameModeSelector.tsx";
import { useState } from "preact/hooks";
import type { GameMode } from "../types/sudoku.ts";
import { SudokuGame } from "./SudokuGame.tsx";

export const HomeIsland = () => {
  const [showExample, setShowExample] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("normal");
  const [gameKey, setGameKey] = useState(0);
  const [showGame, setShowGame] = useState(true);

  console.log(
    "HomeIsland render. showGame:",
    showGame,
    "gameMode:",
    gameMode,
    "showExample:",
    showExample,
  );

  return (
    <div class="w-full flex flex-col items-center justify-center">
      <div class="max-w-xl w-full flex flex-col items-center mb-2">
        <p class="text-center text-gray-700 text-sm sm:text-base  mt-4 mb-4">
          Sudoku Steps lets you practice and master specific Sudoku solving
          techniques —one at a time— so you can tackle any puzzle with
          confidence.
        </p>
        {/* Start/Restart selected game mode button above the board */}
        <div class="w-full max-w-xs flex flex-col items-center mb-6">
          <button
            type="button"
            class={`w-full text-base font-semibold text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-green-400 ${
              gameMode ? "ring-2 ring-green-400" : ""
            }`}
            onClick={() => {
              setShowGame(true);
              setShowExample(false);
              setGameKey((k) => k + 1);
            }}
          >
            {`Start ${
              gameMode.charAt(0).toUpperCase() + gameMode.slice(1)
            } Game`}
          </button>
        </div>
        {/* Main area: show example/description or live game */}
        <div class="w-full flex flex-col items-center justify-center min-h-[320px]">
          {showExample
            ? (
              <div class="w-full flex flex-col items-center justify-center min-h-[320px] mb-6">
                {/* <SudokuExample example={BAND_EXAMPLE} /> */}
                example goes here
              </div>
            )
            : (
              showGame && <SudokuGame key={gameKey} gameMode={gameMode} />
            )}
        </div>
        {/* Game mode grid below the board */}

        <GameModeSelector
          onSelect={(mode) => {
            setGameMode(mode as GameMode);
            setGameKey((k) => k + 1);
            setShowExample(true);
            setShowGame(false);
          }}
        />
      </div>
    </div>
  );
};

export default HomeIsland;
