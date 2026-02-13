import Cell from '../Cell';
import style from './Field.module.scss';

/**
 * Контейнер ігрового поля. Рендерить сітку клітинок, не містить логіки гри.
 */
function Field({
  rows,
  cols,
  getCellView,
  onCellClick,
  onCellContextMenu,
}) {
  const cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      const view = getCellView(index);
      cells.push(
        <Cell
          key={index}
          isOpen={view.isOpen}
          isFlagged={view.isFlagged}
          isMine={view.isMine}
          isTriggeredMine={view.isTriggeredMine}
          minesAround={view.minesAround}
          onClick={() => onCellClick(index)}
          onContextMenu={(e) => onCellContextMenu(e, index)}
        />
      );
    }
  }

  return (
    <div
      className={style.grid}
      style={{ '--cols': cols }}
      role="grid"
      aria-label="Ігрове поле сапера"
    >
      {cells}
    </div>
  );
}

export default Field;
