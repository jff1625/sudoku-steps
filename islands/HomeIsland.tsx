import { useState } from "preact/hooks";
import { GameModeSelector } from "../components/GameModeSelector.tsx";
import { TechniqueModal } from "../components/TechniqueModal.tsx";
import { SudokuGame } from "./SudokuGame.tsx";
import type { GameMode } from "../types/sudoku.ts";

export default function HomeIsland() {
  const [selectedMode, setSelectedMode] = useState<GameMode>(
    "normal",
  );
  const [resetKey, setResetKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<GameMode | null>(null);

  const handleSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    setResetKey((k) => k + 1);
  };
  const handleInfo = (mode: GameMode) => {
    setModalMode(mode);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalMode(null);
  };

  return (
    <div class="w-full flex flex-col items-center justify-center">
      <GameModeSelector onSelect={handleSelect} onInfo={handleInfo} />
      <SudokuGame key={resetKey} gameMode={selectedMode} />
      <TechniqueModal
        open={modalOpen}
        mode={modalMode}
        onClose={handleCloseModal}
      />
    </div>
  );
}
