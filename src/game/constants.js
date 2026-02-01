/**
 * Єдине джерело правди для розмірів поля та кількості мін.
 * Індекс комірки: index = row * cols + col
 */

export const DEFAULT_ROWS = 8;
export const DEFAULT_COLS = 8;
export const DEFAULT_MINES = 10;

export const PRESETS = {
  beginner: { rows: 8, cols: 8, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 },
};
