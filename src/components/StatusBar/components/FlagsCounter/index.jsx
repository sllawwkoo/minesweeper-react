import styles from './FlagsCounter.module.scss';

function formatThreeDigits(value) {
  if (value < 0) return '000';
  const n = Math.min(999, Math.floor(value));
  return String(n).padStart(3, '0');
}

export default function FlagsCounter({ value = 0 }) {
  const display = formatThreeDigits(value);
  return (
    <div className={styles.panel} role="status" aria-label={`Прапорців залишилось: ${display}`}>
      <span className={styles.display}>{display}</span>
    </div>
  );
}
