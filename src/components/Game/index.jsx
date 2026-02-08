import { useMinesweeper } from '../../hooks/useMinesweeper';
import Field from '../Field';
import StatusBar from '../StatusBar';
import AnimatedTitle from '../AnimatedTitle';
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
    status,
    onCellClick,
    onCellContextMenu,
    onRestart,
    getCellView,
  } = useMinesweeper();

  return (
    <main className={styles.game}>
      <AnimatedTitle status={status} />
      <StatusBar
        flagsLeft={flagsLeft}
        time={time}
        status={status}
        onRestart={onRestart}
        cols={cols}
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
