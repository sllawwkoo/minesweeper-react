import { useState, useCallback, useRef, useEffect } from 'react';
import { getNeighbors, countMinesAround } from '../game/fieldUtils';
import { generateMineIndices } from '../game/fieldGenerator';

/**
 * -----------------------------------------------------------------------------
 * indexToRowCol
 * -----------------------------------------------------------------------------
 * Перетворює плоский index у координати (row, col).
 *
 * Архітектурне рішення:
 * Поле зберігається як плоска структура (1D),
 * але логіка сусідів працює з row/col.
 *
 * Формула:
 * index = row * cols + col
 */
function indexToRowCol(index, cols) {
  return { row: Math.floor(index / cols), col: index % cols };
}

/**
 * -----------------------------------------------------------------------------
 * computeFloodFillOpened
 * -----------------------------------------------------------------------------
 * Реалізація алгоритму "flood fill" (BFS).
 *
 * Використовується коли відкривається клітинка з 0 мін навколо.
 * Потрібно автоматично відкрити всі суміжні "порожні" клітинки.
 *
 * Особливості:
 * - НЕ змінює React state
 * - Чиста функція
 * - Повертає Set індексів, які потрібно відкрити
 *
 * Алгоритм:
 * 1. Починаємо з startIndex
 * 2. Якщо навколо 0 мін — додаємо сусідів у чергу
 * 3. Працюємо поки черга не пуста
 *
 * Важливо:
 * - Не відкриваємо міни
 * - Не відкриваємо прапорці
 * - Не відкриваємо вже відкриті клітинки
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
 * =============================================================================
 * useGameField
 * =============================================================================
 *
 * Відповідальність:
 * Управління станом поля:
 *   - розташування мін
 *   - відкриті клітинки
 *   - прапорці
 *
 * НЕ відповідає за:
 *   - статус гри (victory / defeat)
 *   - таймер
 *   - UI
 *
 * Архітектурна роль:
 * Це "data layer" гри.
 * useMinesweeper — оркестратор.
 */
export function useGameField(rows, cols, mineCount, initialMineSet = undefined) {

  /**
   * -----------------------------------------------------------------------------
   * STATE
   * -----------------------------------------------------------------------------
   */

  /**
   * mineSet:
   * Set індексів клітинок з мінами.
   * null означає: міни ще не згенеровані (перший клік ще не був).
   */
  const [mineSet, setMineSet] = useState(initialMineSet ?? null);

  /**
   * openedSet:
   * Set відкритих клітинок.
   */
  const [openedSet, setOpenedSet] = useState(new Set());

  /**
   * flaggedSet:
   * Set клітинок з прапорцями.
   */
  const [flaggedSet, setFlaggedSet] = useState(new Set());

  /**
   * -----------------------------------------------------------------------------
   * REFS
   * -----------------------------------------------------------------------------
   *
   * Навіщо?
   * Щоб уникнути проблем зі stale closures у callback'ах.
   */

  const mineSetRef = useRef(mineSet);
  const openedSetRef = useRef(openedSet);

  useEffect(() => {
    mineSetRef.current = mineSet;
  }, [mineSet]);

  useEffect(() => {
    openedSetRef.current = openedSet;
  }, [openedSet]);

  /**
   * -----------------------------------------------------------------------------
   * ensureMines
   * -----------------------------------------------------------------------------
   *
   * Генерує міни лише один раз.
   * Використовується при першому кліку.
   *
   * excludeIndex — гарантує безпечний перший клік.
   */
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

  /**
   * -----------------------------------------------------------------------------
   * revealCell
   * -----------------------------------------------------------------------------
   *
   * Основна логіка відкриття клітинки.
   *
   * Повертає:
   * {
   *   changed: boolean,
   *   hitMine?: boolean,
   *   opened?: Set
   * }
   *
   * НЕ змінює статус гри — лише повідомляє про результат.
   */
  const revealCell = useCallback(
    (index) => {

      // Не відкривати якщо вже відкрито або стоїть прапорець
      if (openedSet.has(index) || flaggedSet.has(index)) {
        return { changed: false };
      }

      const currentMines = mineSetRef.current ?? mineSet;

      // Якщо міни ще не згенеровані
      if (currentMines == null) {
        return { changed: false };
      }

      // Якщо це міна — сигналізуємо про поразку
      if (currentMines.has(index)) {
        return {
          changed: true,
          hitMine: true,
          opened: new Set(),
        };
      }

      const { row, col } = indexToRowCol(index, cols);

      const minesAround = countMinesAround(
        row,
        col,
        currentMines,
        rows,
        cols
      );

      const toOpen = new Set([index]);

      // Якщо навколо 0 мін — запускаємо flood fill
      if (minesAround === 0) {
        const flood = computeFloodFillOpened(
          index,
          openedSet,
          flaggedSet,
          currentMines,
          rows,
          cols
        );

        flood.forEach((i) => toOpen.add(i));
      }

      // Оновлюємо openedSet
      setOpenedSet((prev) => {
        const next = new Set(prev);
        toOpen.forEach((i) => next.add(i));
        return next;
      });

      return {
        changed: true,
        hitMine: false,
        opened: toOpen,
      };
    },
    [mineSet, openedSet, flaggedSet, rows, cols]
  );

  /**
   * -----------------------------------------------------------------------------
   * toggleFlag
   * -----------------------------------------------------------------------------
   *
   * Перемикає прапорець.
   *
   * Обмеження:
   * - Не можна ставити прапорець на відкриту клітинку
   * - Не можна перевищити кількість мін
   */
  const toggleFlag = useCallback(
    (index) => {
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
    },
    [mineCount]
  );

  /**
   * -----------------------------------------------------------------------------
   * revealAllMines
   * -----------------------------------------------------------------------------
   *
   * Використовується при поразці.
   * Відкриває всі клітинки з мінами.
   */
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

  /**
   * -----------------------------------------------------------------------------
   * reset
   * -----------------------------------------------------------------------------
   *
   * Скидає поле до початкового стану.
   */
  const reset = useCallback((optionalMineSet) => {
    mineSetRef.current = optionalMineSet ?? null;
    setMineSet(optionalMineSet ?? null);
    setOpenedSet(new Set());
    setFlaggedSet(new Set());
  }, []);

  /**
   * -----------------------------------------------------------------------------
   * getCellView
   * -----------------------------------------------------------------------------
   *
   * Готує "view-model" для UI.
   *
   * Компоненти НЕ повинні знати внутрішню структуру state.
   * Вони отримують готовий опис клітинки.
   */
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

      return {
        isOpen,
        isFlagged,
        minesAround,
        isMine,
      };
    },
    [openedSet, flaggedSet, mineSet, rows, cols]
  );

  /**
   * Похідні значення для UI
   */
  const flagsUsed = flaggedSet.size;
  const flagsLeft = Math.max(0, mineCount - flaggedSet.size);

  /**
   * Публічний API хука
   */
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