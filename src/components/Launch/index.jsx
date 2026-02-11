import { motion } from 'framer-motion';
import styles from './Launch.module.scss';

export default function Launch({ left, bottom, background, randomAnimate }) {
  return (
    <motion.div
      className={styles.container}
      style={{ left, bottom }}
      initial={{ transform: 'translateY(0vh)' }}
      animate={{
        transform: ['translateY(-5vh)', 'translateY(-110vh)'],
        transition: {
          delay: `0.${randomAnimate}`,
          duration: `1.5${randomAnimate}`,
          ease: 'linear',
          repeat: Infinity,
        },
      }}
    >
      <motion.div
        className={styles.stem}
        style={{ background }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: `0.${randomAnimate}`,
            duration: `5.5${randomAnimate}`,
            ease: 'linear',
            repeat: Infinity,
          },
        }}
      />
    </motion.div>
  );
}
