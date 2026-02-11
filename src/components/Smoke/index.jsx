import { motion } from 'framer-motion';
import { firstImgAnimation, secondImgAnimation } from '@/utils/animation';
import styles from './Smoke.module.scss';

export default function Smoke() {
  return (
    <div className={styles.container}>
      <motion.div
        className={`${styles.image} ${styles.firstImg}`}
        variants={firstImgAnimation}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className={`${styles.image} ${styles.secondImg}`}
        variants={secondImgAnimation}
        initial="hidden"
        animate="visible"
      />
    </div>
  );
}
