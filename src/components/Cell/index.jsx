import { useRef } from 'react';
import { getCellStateClass } from '@/utils/helpers';
import style from './Cell.module.scss';

/**
 * Одна клітинка сапера. Презентаційний компонент — без логіки гри.
 */

function Cell({
  isOpen,
  isFlagged,
  isMine,
  isTriggeredMine,
  minesAround,
  onClick,
  onContextMenu,
}) {
  const longPressTimer = useRef(null);
  const longPressTriggered = useRef(false);
  const suppressClick = useRef(false);

  const stateClass = getCellStateClass({
    isOpen,
    isFlagged,
    isMine,
    isTriggeredMine,
    minesAround,
  });

  const classNames = `${style.cell} ${style[stateClass]}`;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  // 📱 Long press for iOS
  const handleTouchStart = () => {
    longPressTriggered.current = false;

    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      suppressClick.current = true;

      onContextMenu?.({ preventDefault: () => { } });
    }, 400);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    // Якщо це НЕ був long press — тоді звичайний клік
    if (!longPressTriggered.current) {
      onClick();
    }
  };

  const handleClick = (e) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return; // блокуємо паразитний click після long press
    }
    onClick();
  };

  return (
    <div
      className={classNames}
      onClick={handleClick}
      onContextMenu={onContextMenu}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      aria-pressed={isOpen}
      aria-label={
        isOpen
          ? isMine
            ? 'Міна'
            : `Число ${minesAround ?? 0}`
          : isFlagged
            ? 'З прапорцем'
            : 'Закрита клітинка'
      }
    />
  );
}

export default Cell;
