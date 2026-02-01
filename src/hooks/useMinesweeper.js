import { useState, useCallback, useEffect } from 'react';
import { useGameField } from './useGameField';
import { useGameTimer } from './useGameTimer';
import { DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_MINES } from '../game/constants';

/**
 * Головний хук гри — єдина точка оркестрації.
 * Поєднує useGameField та useGameTimer, керує статусом гри.
 * UI взаємодіє лише через API цього хука.
 */
export function useMinesweeper(
  rows = DEFAULT_ROWS,
  cols = DEFAULT_COLS,
  mineCount = DEFAULT_MINES
) {
  const [status, setStatus] = useState('idle');
  const [triggeredMineIndex, setTriggeredMineIndex] = useState(null);
  const field = useGameField(rows, cols, mineCount);
  const timer = useGameTimer();

  const totalCells = rows * cols;

  const startFirstClick = useCallback(
    (index, isLeftClick) => {
      setStatus('playing');
      timer.start();
      field.ensureMines(index);
      if (isLeftClick) {
        field.revealCell(index);
      } else {
        field.toggleFlag(index);
      }
    },
    [field, timer]
  );

  const onCellClick = useCallback(
    (index) => {
      if (status === 'victory' || status === 'defeat') return;

      if (status === 'idle') {
        startFirstClick(index, true);
        return;
      }

      if (status === 'playing') {
        const result = field.revealCell(index);
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

  useEffect(() => {
    if (status !== 'playing') return;
    const openedCount = field.openedSet.size;
    if (openedCount + mineCount === totalCells) {
      setStatus('victory');
      timer.stop();
    }
  }, [status, field.openedSet.size, mineCount, totalCells, timer]);

  const onRestart = useCallback(() => {
    timer.reset();
    field.reset();
    setStatus('idle');
    setTriggeredMineIndex(null);
  }, [timer, field]);

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

  return {
    rows,
    cols,
    status,
    time: timer.seconds,
    flagsLeft: field.flagsLeft,
    onCellClick,
    onCellContextMenu,
    onRestart,
    getCellView,
  };
}
