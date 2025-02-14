import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBG: "#202C36",
        color1: "#2B3844",
        text:   "#FFFFFF"
      },
    },
  },
  plugins: [],
} satisfies Config;
