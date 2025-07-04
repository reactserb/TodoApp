export default function getInitialTheme() {
	const savedTheme = localStorage.getItem('theme')
	const prefersTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

	if (savedTheme) {
		return savedTheme
	} else if (prefersTheme) {
		return 'dark'
	} else {
		const hour = new Date().getHours()
		return hour < 6 || hour >= 21 ? 'dark' : 'light'
	}
}
