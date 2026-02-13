import styles from './StatusBar.module.scss';
import FlagsCounter from './components/FlagsCounter';
import FaceButton from './components/FaceButton';
import GameTimer from './components/GameTimer';

function StatusBar({ flagsLeft, time, status, onRestart }) {
  return (
    <div className={styles.statusBar}>
      <FlagsCounter value={flagsLeft} />
      <FaceButton status={status} onRestart={onRestart} />
      <GameTimer value={time} />
    </div>
  );
}

export default StatusBar;
