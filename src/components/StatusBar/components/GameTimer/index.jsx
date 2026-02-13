import { formatThreeDigits } from '@/utils/helpers';
import styles from './GameTimer.module.scss';

function GameTimer({ value = 0 }) {
  const display = formatThreeDigits(value);
  return (
    <div className={styles.panel} role="status" aria-label="Час гри">
      <span className={styles.display}>{display}</span>
    </div>
  );
}

export default GameTimer;
