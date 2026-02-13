import { useMinesweeper } from '../../hooks/useMinesweeper';
import Field from '../Field';
import StatusBar from '../StatusBar';
import AnimatedTitle from '../AnimatedTitle';
import GameOver from '../GameOver';
import Smoke from '../Smoke';
import Fireworks from '../Fireworks';
import Win from '../Win';
import styles from './Game.module.scss';

/**
 * Головний UI-контейнер гри. Використовує useMinesweeper і відображає StatusBar + Field.
 */
function Game() {
  const {
    rows,
    cols,
    time,
    flagsLeft,
    status,
    gameId,
    onCellClick,
    onCellContextMenu,
    onRestart,
    getCellView,
  } = useMinesweeper();

  return (
    <div className={styles.gameContainer}>
      {status === 'defeat' && <Smoke />}
      {status === 'victory' && <Fireworks />}
      <div className={styles.gameWrapper} style={{ '--cols': cols }}>
        {status === 'victory' && <Win />}
        <AnimatedTitle key={gameId} status={status} />
        <div className={styles.panel}>
          <StatusBar
            flagsLeft={flagsLeft}
            time={time}
            status={status}
            onRestart={onRestart}
          />
          <Field
            rows={rows}
            cols={cols}
            getCellView={getCellView}
            onCellClick={onCellClick}
            onCellContextMenu={onCellContextMenu}
          />
        </div>
        {status === 'defeat' && <GameOver />}
      </div>
    </div>
  );
}

export default Game;
