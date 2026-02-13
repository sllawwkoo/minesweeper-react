import { motion } from 'framer-motion';
import { youWinAnimation, youMoveAnimation, winMoveAnimation } from '@/utils/animation';
import styles from './Win.module.scss';

function Win() {
  return (
    <motion.div
      className={styles.container}
      variants={youWinAnimation}
      initial="start"
      animate="end"
    >
      <motion.span variants={youMoveAnimation} initial="start" animate="end">
        YOU
      </motion.span>
      <motion.span variants={winMoveAnimation} initial="start" animate="end">
        WIN
      </motion.span>
    </motion.div>
  );
}

export default Win;
