import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { letterAnimation, letterExplode } from '@/utils/animation';

export default function Letter({ letter, index, status }) {
  const variants = useMemo(
    () => ({
      ...letterAnimation(index),
      explode: letterExplode.visible,
    }),
    [index]
  );

  const animate = status === 'defeat' ? ['defeat', 'explode'] : 'visible';

  return (
    <motion.span variants={variants} initial="hidden" animate={animate}>
      {letter}
    </motion.span>
  );
}
