const gradientColors = ["#757575", "#616161", "#424242", "#689F38", "#FFEB3B", "#0097A7", "#EF5350"];

export const youWinAnimation = {
	start: {
		color: gradientColors[0],
	},
	end: {
		color: [gradientColors[1], gradientColors[2], gradientColors[3], gradientColors[4], gradientColors[5], gradientColors[6]],
		transition: {
			duration: 1,
			repeat: Infinity,
			repeatType: 'reverse',
			ease: 'linear',
		}
	}
}

export const youMoveAnimation = {
	start: {
		opacity: 0,
		transform: 'translate(-200px, 0) scale(.2)',
	},
	end: {
		opacity: [0.25, 0.5, 0.75, 1],
		transform: ['translate(-150px, 0) scale(.4)', 'translate(-100px, 0) scale(1.2)', 'translate(-50px, 0) scale(1.6)', 'translate(0) scale(1)'],
		transition: {
			duration: 0.7,
			delay: 0.1
		},
	},
};
export const winMoveAnimation = {
	start: {
		opacity: 0,
		transform: 'translate(200px, 0) scale(.2)',
	},
	end: {
		opacity: [0.25, 0.5, 0.75, 1],
		transform: ['translate(150px, 0) scale(.4)', 'translate(100px, 0) scale(1.2)', 'translate(50px, 0) scale(1.6)', 'translate(0) scale(1)'],
		transition: {
			duration: .8,
			delay: 0.1
		},
	},
};