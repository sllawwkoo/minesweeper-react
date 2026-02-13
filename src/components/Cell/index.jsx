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

  return (
    <div
      className={classNames}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isOpen}
      aria-label={isOpen ? (isMine ? 'Міна' : `Число ${minesAround ?? 0}`) : (isFlagged ? 'З прапорцем' : 'Закрита клітинка')}
    />
  );
}

export default Cell;
