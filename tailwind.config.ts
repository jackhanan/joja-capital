import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a0e17",
          950: "#05070d",
          900: "#0a0e17",
          800: "#10151f",
          700: "#161c29",
          600: "#232b3d",
        },
        slate: {
          50: "#f4f6f8",
          100: "#e3e8ee",
          200: "#c7d1dc",
          300: "#9fadbd",
          400: "#7c94ab",
          500: "#5c7893",
          600: "#455e75",
          700: "#354a5e",
          800: "#263646",
          900: "#1a2530",
        },
        gold: {
          400: "#c9a86a",
          500: "#b3924f",
        },
      },
      fontFamily: {
        serif: ["var(--font-headline)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
