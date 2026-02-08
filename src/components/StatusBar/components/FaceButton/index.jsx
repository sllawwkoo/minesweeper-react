import { motion } from 'framer-motion';
import styles from './FaceButton.module.scss';

const EMOJI = {
  idle: new URL('../../../../assets/image/emojis/start.png', import.meta.url).href,
  playing: new URL('../../../../assets/image/emojis/start.png', import.meta.url).href,
  victory: new URL('../../../../assets/image/emojis/win.png', import.meta.url).href,
  defeat: new URL('../../../../assets/image/emojis/gameover.png', import.meta.url).href,
};

const ARIA_LABEL = {
  idle: 'Почати нову гру',
  playing: 'Почати нову гру',
  defeat: 'Гру програно. Почати знову',
  victory: 'Перемога! Почати знову',
};

const shakeTransition = { type: 'tween', duration: 0.4 };
const bounceTransition = { type: 'spring', stiffness: 400, damping: 12 };

export default function FaceButton({ status = 'idle', onRestart }) {
  const isDefeat = status === 'defeat';
  const isVictory = status === 'victory';

  const animate = isDefeat
    ? { x: [0, -6, 6, -6, 6, 0], transition: shakeTransition }
    : isVictory
      ? { scale: [1, 1.12, 1], transition: bounceTransition }
      : { scale: 1, x: 0 };

  return (
    <motion.button
      type="button"
      className={styles.button}
      aria-label={ARIA_LABEL[status]}
      onClick={onRestart}
      initial={false}
      animate={animate}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={EMOJI[status]} alt="" className={styles.face} />
    </motion.button>
  );
}
