import { useMemo } from 'react';
import Launch from './components/Launch';
import { getRandomColor } from '@/utils/helpers';
import styles from './Fireworks.module.scss';

const STAR_COUNT = 100;

function Fireworks() {
  const stars = useMemo(
    () =>
      [...Array(STAR_COUNT)].map((_, index) => ({
        id: index,
        left: `${index}%`,
        bottom: `-${Math.floor(Math.random() * 65 + 5)}%`,
        background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${getRandomColor()})`,
        randomAnimate: Math.floor(Math.random() * 98 + 2),
      })),
    []
  );

  return (
    <div className={styles.container}>
      {stars.map(({ id, left, bottom, background, randomAnimate }) => (
        <Launch
          key={id}
          left={left}
          bottom={bottom}
          background={background}
          randomAnimate={randomAnimate}
        />
      ))}
    </div>
  );
}

export default Fireworks;
