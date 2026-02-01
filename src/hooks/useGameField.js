import { useState, useCallback, useRef, useEffect } from 'react';
import { getNeighbors, countMinesAround } from '../game/fieldUtils';
import { generateMineIndices } from '../game/fieldGenerator';

/**
 * Індекс → row, col. index = row * cols + col
 */
function indexToRowCol(index, cols) {
  return { row: Math.floor(index / cols), col: index % cols };
}

/**
 * Flood fill: відкрити комірку та всі досяжні сусідні з 0 мін навколо.
 * Повертає Set індексів, які потрібно додати до openedSet.
 * Чиста логіка — приймає поточні openedSet, flaggedSet, mineSet, rows, cols.
 */
function computeFloodFillOpened(startIndex, openedSet, flaggedSet, mineSet, rows, cols) {
  if (!mineSet || mineSet.has(startIndex)) return new Set();
  const result = new Set();
  const queue = [startIndex];
  const visited = new Set([startIndex]);

  while (queue.length > 0) {
    const index = queue.shift();
    const { row, col } = indexToRowCol(index, cols);
    if (openedSet.has(index) || flaggedSet.has(index) || mineSet.has(index)) continue;

    result.add(index);
    const count = countMinesAround(row, col, mineSet, rows, cols);

    if (count === 0) {
      const neighbors = getNeighbors(row, col, rows, cols);
      for (const { row: r, col: c } of neighbors) {
        const ni = r * cols + c;
        if (!visited.has(ni)) {
          visited.add(ni);
          queue.push(ni);
        }
      }
    }
  }
  return result;
}

/**
 * Хук стану поля: міни, відкриті комірки, прапорці.
 * Не знає про статус гри (victory/defeat) та таймер.
 */
export function useGameField(rows, cols, mineCount, initialMineSet = undefined) {
  const [mineSet, setMineSet] = useState(initialMineSet ?? null);
  const [openedSet, setOpenedSet] = useState(new Set());
  const [flaggedSet, setFlaggedSet] = useState(new Set());

  const mineSetRef = useRef(mineSet);
  const openedSetRef = useRef(openedSet);
  useEffect(() => {
    mineSetRef.current = mineSet;
  }, [mineSet]);
  useEffect(() => {
    openedSetRef.current = openedSet;
  }, [openedSet]);

  const ensureMines = useCallback(
    (excludeIndex) => {
      if (mineSetRef.current != null) return mineSetRef.current;
      const next = generateMineIndices(rows, cols, mineCount, excludeIndex);
      mineSetRef.current = next;
      setMineSet(next);
      return next;
    },
    [rows, cols, mineCount]
  );

  const revealCell = useCallback(
    (index) => {
      if (openedSet.has(index) || flaggedSet.has(index)) return { changed: false };

      const currentMines = mineSetRef.current ?? mineSet;
      if (currentMines == null) return { changed: false };

      if (currentMines.has(index)) {
        return { changed: true, hitMine: true, opened: new Set() };
      }

      const { row, col } = indexToRowCol(index, cols);
      const minesAround = countMinesAround(row, col, currentMines, rows, cols);

      const toOpen = new Set([index]);
      if (minesAround === 0) {
        const flood = computeFloodFillOpened(index, openedSet, flaggedSet, currentMines, rows, cols);
        flood.forEach((i) => toOpen.add(i));
      }

      setOpenedSet((prev) => {
        const next = new Set(prev);
        toOpen.forEach((i) => next.add(i));
        return next;
      });

      return { changed: true, hitMine: false, opened: toOpen };
    },
    [mineSet, openedSet, flaggedSet, rows, cols]
  );

  const toggleFlag = useCallback((index) => {
    setFlaggedSet((prev) => {
      if (openedSetRef.current.has(index)) return prev;
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (prev.size >= mineCount) return prev;
        next.add(index);
      }
      return next;
    });
  }, [mineCount]);

  const revealAllMines = useCallback(() => {
    const mines = mineSetRef.current;
    if (mines == null) return new Set();
    setOpenedSet((prev) => {
      const next = new Set(prev);
      mines.forEach((i) => next.add(i));
      return next;
    });
    return new Set(mines);
  }, []);

  const reset = useCallback((optionalMineSet) => {
    mineSetRef.current = optionalMineSet ?? null;
    setMineSet(optionalMineSet ?? null);
    setOpenedSet(new Set());
    setFlaggedSet(new Set());
  }, []);

  const getCellView = useCallback(
    (index) => {
      const isOpen = openedSet.has(index);
      const isFlagged = flaggedSet.has(index);
      const mines = mineSetRef.current ?? mineSet;
      const isMine = mines != null && mines.has(index);
      let minesAround = null;
      if (isOpen && !isMine && mines) {
        const { row, col } = indexToRowCol(index, cols);
        minesAround = countMinesAround(row, col, mines, rows, cols);
      }
      return { isOpen, isFlagged, minesAround, isMine };
    },
    [openedSet, flaggedSet, mineSet, rows, cols]
  );

  const flagsUsed = flaggedSet.size;
  const flagsLeft = Math.max(0, mineCount - flaggedSet.size);

  return {
    mineSet,
    openedSet,
    flaggedSet,
    ensureMines,
    revealCell,
    toggleFlag,
    revealAllMines,
    reset,
    getCellView,
    flagsUsed,
    flagsLeft,
  };
}
