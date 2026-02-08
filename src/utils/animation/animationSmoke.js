export const firstImgAnimation = {
	hidden: {
		transform: 'translate3d(0, 0, 0)',
	},
	visible: {
		transform: 'translate3d(-200vw, 0, 0)',
		transition: {
			duration: 60,
			ease: 'linear',
			repeat: Infinity,
		},
	},
};

export const secondImgAnimation = {
	hidden: {
		transform: 'translate3d(0, 0, 0)',
	},
	visible: {
		transform: 'translate3d(-200vw, 0, 0)',
		transition: {
			duration: 40,
			ease: 'linear',
			repeat: Infinity,
		},
	},
};