/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne Variable", "sans-serif"],
        "work-sans": ["Work Sans Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
