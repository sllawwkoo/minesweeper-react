export const buttonAnimation = {
  initial: {
    x: 0,
    scale: 1,
  },
  victory: {
    x: [0, -10, 10, -10, 10, 0],
    scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
    rotate: [0, -45, 45, -45, 45, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
  defeat: {
    x: 0,
    scale: [1, 1.1, 1.3, 1.5, 1.3, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};