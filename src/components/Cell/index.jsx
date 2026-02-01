import style from './Cell.module.scss';

/**
 * Одна клітинка сапера. Презентаційний компонент — без логіки гри.
 */
export default function Cell({
  isOpen,
  isFlagged,
  isMine,
  isTriggeredMine,
  minesAround,
  onClick,
  onContextMenu,
}) {
  let stateClass = 'closed';

  if (!isOpen && isFlagged) {
    stateClass = 'flaged';
  } else if (isOpen && isMine) {
    stateClass = isTriggeredMine ? 'bombed' : 'bomb';
  } else if (isOpen && !isMine) {
    if (minesAround === 0) {
      stateClass = 'zero';
    } else if (minesAround > 0) {
      stateClass = `num${minesAround}`;
    }
  }

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
