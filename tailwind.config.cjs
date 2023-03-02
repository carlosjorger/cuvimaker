/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,astro}'],
    darkMode: 'class',
    theme: {
        extend: {
            backgroundImage: {
                anchor: 'linear-gradient(var(--anchor-color),var(--anchor-color))',
            },
            translate: ['dark'],
        },
    },
    plugins: [],
};
