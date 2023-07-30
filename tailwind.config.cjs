/** @type {import('tailwindcss').Config} */

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
				primary: 'var(--primary-color)',
				anchor: 'var(--anchor-color)',
				['dark-primary-light']: '#51437a',
				['dark-primary']: '#3f3268',
				['dark-primary-200']: '#261c46',
				['dark-primary-300']: '#120a25',
			},
			transitionProperty: {
				form: 'border-bottom, box-shadow',
			},
			translate: ['dark'],
		},
	},
	plugins: [],
};
