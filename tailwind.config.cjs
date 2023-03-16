/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,astro}'],
    darkMode: 'class',
    theme: {
        extend: {
            backgroundImage: {
                anchorImage:
                    'linear-gradient(var(--anchor-color),var(--anchor-color))',
            },
            colors: {
                primary: 'var(--primary-color)',
                anchor: 'var(--anchor-color)',
                ['dark-primary-light']: '#2c1c5a',
                ['dark-primary']: '#190f35',
                ['dark-primary-200']: '#130624',
                ['dark-primary-300']: '#0c071a',
            },
            translate: ['dark'],
        },
    },
    plugins: [],
};
