import styles from './StatusBar.module.scss';

/**
 * Презентаційний компонент: лічильник прапорців, таймер, кнопка Restart.
 * Всі дані отримує через props.
 */
export default function StatusBar({ flagsLeft, time, onRestart }) {
  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <span className={styles.counter} aria-label={`Прапорців залишилось: ${flagsLeft}`}>
          🚩 {flagsLeft}
        </span>
        <span className={styles.timer} aria-label={`Час гри: ${time} секунд`}>
          ⏱ {time}
        </span>
      </div>

      <button
        type="button"
        className={styles.restart}
        onClick={onRestart}
        aria-label="Почати нову гру"
      >
        Restart
      </button>
    </header>
  );
}
