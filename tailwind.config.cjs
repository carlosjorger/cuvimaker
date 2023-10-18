/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,astro}'],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundImage: {
				anchorImage:
					'linear-gradient(var(--anchor-color),var(--anchor-color))',
				primaryImage:
					'linear-gradient(var(--primary-color),var(--primary-color))',
				zincImage: 'linear-gradient(rgb(244 244 245),rgb(244 244 245))',
			},
			colors: {
				anchor: 'var(--anchor-color)',
				['dark-primary-light']: '#51437a',
				['dark-primary-200']: '#261c46',
				['dark-primary-300']: '#120a25',
			},
			transitionProperty: {
				form: 'border-bottom, box-shadow',
			},
			translate: ['dark'],
			keyframes: {
				cardImageIn: {
					'0%': {
						transform: 'rotateX(15deg) rotateY(-15deg)',
						'box-shadow': '15px 15px 45px var(--tw-shadow-color)',
					},
					'25%': {
						transform: 'rotateX(-11deg) rotateY(-5deg)',
						'box-shadow': '5px -11px 38px var(--tw-shadow-color)',
					},
					'50%': {
						transform: 'rotateX(4deg) rotateY(7deg)',
						'box-shadow': '-7px 4px 35.5px var(--tw-shadow-color)',
					},
					'75%': {
						transform: 'rotateX(2deg) rotateY(-3deg)',
						'box-shadow': '3px 2px 33px var(--tw-shadow-color)',
					},
					'100%': {
						transform: 'rotateX(0deg) rotateY(0deg)',
						'box-shadow': '0px 0px 30px var(--tw-shadow-color)',
					},
				},
			},
			animation: {
				cardImageIn: 'cardImageIn 2s ease-in-out',
			},
		},
		fontFamily: {
			montserrat: ['Montserrat', 'ui-sans-serif'],
			figtree: ['Figtree', 'sans-serif'],
			blackOpsOne: ['"Black Ops One"'],
		},
	},
	daisyui: {
		themes: ['light', 'dark'],
	},
	plugins: [require('daisyui')],
};
