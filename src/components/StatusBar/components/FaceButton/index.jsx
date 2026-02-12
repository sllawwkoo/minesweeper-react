import { motion } from 'framer-motion';
import { buttonAnimation } from '@/utils/animation';
import styles from './FaceButton.module.scss';

const ARIA_LABEL = {
  idle: 'Почати нову гру',
  playing: 'Почати нову гру',
  defeat: 'Гру програно. Почати знову',
  victory: 'Перемога! Почати знову',
};

const VARIANT = {
  idle: 'initial',
  playing: 'initial',
  victory: 'victory',
  defeat: 'defeat',
};

const BACKGROUND_CLASS = {
  idle: 'start',
  playing: 'start',
  victory: 'win',
  defeat: 'gameover',
};

export default function FaceButton({ status = 'idle', onRestart }) {
  const variant = VARIANT[status];
  const backgroundClass = BACKGROUND_CLASS[status];

  return (
    <motion.button
      type="button"
      className={`${styles.button} ${styles[backgroundClass]}`}
      aria-label={ARIA_LABEL[status]}
      onClick={onRestart}
      initial="initial"
      animate={variant}
      variants={buttonAnimation}
      whileTap={{ scale: 0.95 }}
    />
  );
}
