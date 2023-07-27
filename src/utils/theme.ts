type Theme = 'dark' | 'light';

function getTheme() {
	if (typeof localStorage !== 'undefined') {
		const theme = localStorage.getItem('theme');
		if (theme) {
			return theme as Theme;
		}
	}
}
export function isDarkMode() {
	return getTheme() == 'dark';
}
