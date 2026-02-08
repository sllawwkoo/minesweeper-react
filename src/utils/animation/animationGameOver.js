const gradientColors = ["#212121", "#424242", "#E53935"];

export const gameOverAnimation = {
  start: {
    color: gradientColors[0],
  },
  end: {
    color: [gradientColors[1], gradientColors[2]],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear',
    }
  }
}

export const gameMoveAnimation = {
  start: {
    opacity: 0,
    transform: 'translate(-150px, 0) scale(.3)',
  },
  end: {
    opacity: [0.25, 0.5, 0.75, 0.5],
    transform: ['translate(-100px, 0) scale(.5)', 'translate(-75px, 0) scale(.7)', 'translate(-50px, 0) scale(1.1)', 'translate(0) scale(1)'],
    transition: {
      duration: 0.7,
      delay: 0.1
    },
  },
};
export const overMoveAnimation = {
  start: {
    opacity: 0,
    transform: 'translate(150px, 0) scale(.3)',
  },
  end: {
    opacity: [0.25, 0.5, 0.75, 0.5],
    transform: ['translate(100px, 0) scale(.5)', 'translate(75px, 0) scale(.7)', 'translate(50px, 0) scale(1.1)', 'translate(0) scale(1)'],
    transition: {
      duration: 0.8,
      delay: 0.1
    },
  },
};