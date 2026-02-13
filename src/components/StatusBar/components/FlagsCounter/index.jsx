import { formatThreeDigits } from '@/utils/helpers';
import styles from './FlagsCounter.module.scss';

function FlagsCounter({ value = 0 }) {
  const display = formatThreeDigits(value);
  return (
    <div className={styles.panel} role="status" aria-label={`Прапорців залишилось: ${display}`}>
      <span className={styles.display}>{display}</span>
    </div>
  );
}

export default FlagsCounter;
