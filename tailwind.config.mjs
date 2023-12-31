/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      aria: {
        current: 'current="page"',
      },
      colors: {
        primary: "#1c1c1c",
        secondary: "#999999",
      },
      fontFamily: {
        "sub-header": ["dcc-ash", "Impact", "sans-serif"],
        header: ["white-on-black"],
      },
      backgroundImage: {
        "main-logo-mark": "url('/imgs/bg-image.svg')",
      },
      backgroundPosition: {
        "position-logo-mark-sm": "center calc(50%  + 10dvh)",
        "position-logo-mark": "center calc(50%  + 250px)",
      },
      backgroundSize: {
        50: "max(50vw, 600px)",
      },
    },
  },
  plugins: [],
};
