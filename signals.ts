import { signal } from "@preact/signals";
import type { CellValue } from "./types/sudoku.ts";

export const selectedNumber = signal<CellValue>("");
export const pencilEnabled = signal(false);
export const eraserEnabled = signal(false);
