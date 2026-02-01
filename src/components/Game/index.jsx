import { useMinesweeper } from '../../hooks/useMinesweeper';
import Field from '../Field';
import StatusBar from '../StatusBar';
import styles from './Game.module.scss';

/**
 * Головний UI-контейнер гри. Використовує useMinesweeper і відображає StatusBar + Field.
 */
export default function Game() {
  const {
    rows,
    cols,
    time,
    flagsLeft,
    onCellClick,
    onCellContextMenu,
    onRestart,
    getCellView,
  } = useMinesweeper();

  return (
    <main className={styles.game}>
      <StatusBar
        flagsLeft={flagsLeft}
        time={time}
        onRestart={onRestart}
      />

      <Field
        rows={rows}
        cols={cols}
        getCellView={getCellView}
        onCellClick={onCellClick}
        onCellContextMenu={onCellContextMenu}
      />
    </main>
  );
}
