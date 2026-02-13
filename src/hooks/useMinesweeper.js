import { useState, useCallback, useEffect } from 'react';
import { useGameField } from './useGameField';
import { useGameTimer } from './useGameTimer';
import { DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_MINES } from '../game/constants';

/**
 * =============================================================================
 * useMinesweeper
 * =============================================================================
 *
 * Головний хук гри.
 *
 * Архітектурна роль:
 * ─────────────────────────────────────────────────────────────
 * Це єдина точка оркестрації всієї гри.
 *
 * Він:
 *   • координує useGameField (дані поля)
 *   • координує useGameTimer (час)
 *   • керує статусом гри
 *   • вирішує коли перемога / поразка
 *
 * UI взаємодіє ЛИШЕ через API цього хука.
 *
 * Ніякий компонент не має напряму викликати:
 *   - useGameField
 *   - useGameTimer
 *
 * Це гарантує чисту архітектуру.
 */
export function useMinesweeper(
  rows = DEFAULT_ROWS,
  cols = DEFAULT_COLS,
  mineCount = DEFAULT_MINES
) {

  /**
   * -----------------------------------------------------------------------------
   * GAME STATE
   * -----------------------------------------------------------------------------
   */

  /**
   * status:
   *  - 'idle'     → гра ще не почалась
   *  - 'playing'  → активна гра
   *  - 'victory'  → перемога
   *  - 'defeat'   → поразка
   */
  const [status, setStatus] = useState('idle');

  /**
   * gameId:
   * Використовується для примусового перемонтування компонентів
   * (наприклад AnimatedTitle) через key={gameId}.
   *
   * При кожному рестарті інкрементується.
   */
  const [gameId, setGameId] = useState(0);

  /**
   * triggeredMineIndex:
   * Індекс міни, на яку натиснули.
   * Використовується для:
   *   - показу bombed.png
   *   - розділення bombed та bomb
   */
  const [triggeredMineIndex, setTriggeredMineIndex] = useState(null);

  /**
   * Підключення підсистем
   */
  const field = useGameField(rows, cols, mineCount);
  const timer = useGameTimer();

  /**
   * Загальна кількість клітинок
   */
  const totalCells = rows * cols;

  /**
   * -----------------------------------------------------------------------------
   * startFirstClick
   * -----------------------------------------------------------------------------
   *
   * Викликається при першій взаємодії.
   *
   * Робить:
   *   - змінює статус → playing
   *   - запускає таймер
   *   - генерує міни (з безпечним index)
   *   - виконує першу дію (reveal або flag)
   */
  const startFirstClick = useCallback(
    (index, isLeftClick) => {
      setStatus('playing');
      timer.start();

      // Генерація мін тільки тут
      field.ensureMines(index);

      if (isLeftClick) {
        field.revealCell(index);
      } else {
        field.toggleFlag(index);
      }
    },
    [field, timer]
  );

  /**
   * -----------------------------------------------------------------------------
   * onCellClick (лівий клік)
   * -----------------------------------------------------------------------------
   */
  const onCellClick = useCallback(
    (index) => {

      // Блокуємо взаємодію якщо гра завершена
      if (status === 'victory' || status === 'defeat') return;

      // Якщо це перший клік
      if (status === 'idle') {
        startFirstClick(index, true);
        return;
      }

      if (status === 'playing') {
        const result = field.revealCell(index);

        // Якщо натрапили на міну
        if (result.changed && result.hitMine) {

          setTriggeredMineIndex(index);

          setStatus('defeat');

          timer.stop();

          field.revealAllMines();
        }
      }
    },
    [status, field, timer, startFirstClick]
  );

  /**
   * -----------------------------------------------------------------------------
   * onCellContextMenu (правий клік)
   * -----------------------------------------------------------------------------
   */
  const onCellContextMenu = useCallback(
    (event, index) => {
      event.preventDefault();

      if (status === 'victory' || status === 'defeat') return;

      if (status === 'idle') {
        startFirstClick(index, false);
        return;
      }

      if (status === 'playing') {
        field.toggleFlag(index);
      }
    },
    [status, field, startFirstClick]
  );

  /**
   * -----------------------------------------------------------------------------
   * Перевірка перемоги
   * -----------------------------------------------------------------------------
   *
   * Умова:
   * Всі НЕ-міни відкриті.
   *
   * Формула:
   * openedCells + mineCount === totalCells
   */
  useEffect(() => {
    if (status !== 'playing') return;

    const openedCount = field.openedSet.size;

    if (openedCount + mineCount === totalCells) {
      setStatus('victory');
      timer.stop();
    }
  }, [status, field.openedSet.size, mineCount, totalCells, timer]);

  /**
   * -----------------------------------------------------------------------------
   * onRestart
   * -----------------------------------------------------------------------------
   *
   * Повний ресет гри:
   *   - зупинка таймера
   *   - очищення поля
   *   - скидання статусу
   *   - інкремент gameId
   *   - очищення triggeredMineIndex
   */
  const onRestart = useCallback(() => {
    timer.reset();
    field.reset();
    setStatus('idle');
    setGameId((id) => id + 1);
    setTriggeredMineIndex(null);
  }, [timer, field]);

  /**
   * -----------------------------------------------------------------------------
   * getCellView
   * -----------------------------------------------------------------------------
   *
   * Проксі над field.getCellView.
   *
   * Додає додаткове поле:
   *   isTriggeredMine
   *
   * UI отримує повністю готовий view-model.
   */
  const getCellView = useCallback(
    (index) => {
      const cellData = field.getCellView(index);

      return {
        ...cellData,
        isTriggeredMine: triggeredMineIndex === index,
      };
    },
    [field, triggeredMineIndex]
  );

  /**
   * -----------------------------------------------------------------------------
   * Публічний API гри
   * -----------------------------------------------------------------------------
   */
  return {
    rows,
    cols,
    status,
    gameId,
    time: timer.seconds,
    flagsLeft: field.flagsLeft,
    onCellClick,
    onCellContextMenu,
    onRestart,
    getCellView,
  };
}