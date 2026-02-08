export const letterAnimation = (index) => ({
	hidden: {
		opacity: 0,
		transform: 'translate(-150px, 0) scale(.3)',
	},
	visible: {
		opacity: 1,
		transform: ['translate(50px, 0) scale(.7)', 'translate(0, 0) scale(2)', 'translate(0, 0) scale(1)'],
		transition: {
			duration: 0.4,
			delay: index * 0.04
		},
	},
	defeat: {
		opacity: .8,
		transform: `translate(${Math.floor(Math.random() * 11) - 5}px, ${Math.floor(Math.random() * 21) - 10}px) scale(1) rotate(${Math.floor(Math.random() * 360)}deg)`,
		transition: {
			duration: .5, 
			ease: 'linear',
		},
	},
});


export const letterExplode = {
	hidden: {
		opacity: 1,
	},
	visible: {
		opacity: [.9, .85, .8, .75, 0.7, .65, .6, .55, .5, .45, .4, .35, .3, .25, .2, .15, .1],
		color: ['#424242', '#E53935', "#212121"],
		textShadow: [
			`0px 0px 10px #fff`,
			`0px 0px 10px #424242`,
			`0px 0px 25px #424242`,
			`0px 0px 25px #E53935`,
			`0px 0px 25px #E53935`,
			`0px 0px 25px #E53935`,
			`0px 0px 25px #E53935`,
			`0px 0px 25px #424242`,
			`0px 0px 50px #424242`,
			`0px 0px 50px #424242`,
			`0px 0px 50px #E53935`,
			`0px 0px 150px #E53935`,
			`0px 10px 100px #7B96B8`,
			`0px 10px 100px #7B96B8`,
			`0px 10px 100px #E53935`,
			`0px 10px 100px #E53935`,
			`0px -10px 100px #E53935`,
			`0px -10px 100px #E53935`
		],
		transition: {
			duration: 3,
			ease: 'easeOut',
			repeat: Infinity,
		},
	},
}

