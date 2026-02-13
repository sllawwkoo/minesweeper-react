import Letter from './components/Letter';
import styles from './AnimatedTitle.module.scss';

const TITLE = 'MINESWEEPER';

function AnimatedTitle({ status = 'defeat' }) {
  const letters = TITLE.split('');

  return (
    <div className={styles.title} aria-hidden>
      {letters.map((letter, i) => (
        <Letter key={i} letter={letter} index={i} status={status} />
      ))}
    </div>
  );
}

export default AnimatedTitle;