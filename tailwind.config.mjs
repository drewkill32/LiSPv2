/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			aria: {
				current: 'current="page"',
			},
			colors: {
				primary: '#1c1c1c',
				secondary: '#999999',
			},
			fontFamily: {
				sans: ["dcc-ash", "Impact", "sans-serif"],
				header: ["white-on-black"]
			},
	
		},
	},
	plugins: [],
}
