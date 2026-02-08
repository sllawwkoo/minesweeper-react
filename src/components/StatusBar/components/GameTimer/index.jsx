import styles from './GameTimer.module.scss';

function formatThreeDigits(value) {
  if (value < 0) return '000';
  const n = Math.min(999, Math.floor(value));
  return String(n).padStart(3, '0');
}

export default function GameTimer({ value = 0 }) {
  const display = formatThreeDigits(value);
  return (
    <div
      className={styles.display}
      role="status"
      aria-label="Час гри"
    >
      {display}
    </div>
  );
}
