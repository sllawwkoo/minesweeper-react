import { motion } from 'framer-motion';
import { gameOverAnimation, gameMoveAnimation, overMoveAnimation } from '@/utils/animation';
import styles from './GameOver.module.scss';

function GameOver() {
  return (
    <motion.div
      className={styles.container}
      variants={gameOverAnimation}
      initial="start"
      animate="end"
    >
      <motion.span variants={gameMoveAnimation} initial="start" animate="end">
        GAME
      </motion.span>
      <motion.span variants={overMoveAnimation} initial="start" animate="end">
        OVER
      </motion.span>
    </motion.div>
  );
}

export default GameOver;
