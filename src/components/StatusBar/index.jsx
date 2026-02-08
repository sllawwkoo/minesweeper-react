import styles from './StatusBar.module.scss';
import FlagsCounter from './components/FlagsCounter';
import FaceButton from './components/FaceButton';
import GameTimer from './components/GameTimer';

export default function StatusBar({ flagsLeft, time, status, onRestart, cols }) {
  return (
    <div
      className={styles.statusBar}
      style={cols != null ? { '--cols': cols } : undefined}
    >
      <FlagsCounter value={flagsLeft} />
      <FaceButton status={status} onRestart={onRestart} />
      <GameTimer value={time} />
    </div>
  );
}
