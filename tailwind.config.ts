import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
        // Sampled from the actual JOJA Capital logo file (public/joja-logo.jpeg)
        // via pixel analysis — see scripts/sample-logo-color.js. Base/600 (#103c64)
        // is the logo's true navy blue; other shades are derived tints/shades of it.
        accent: {
          300: "#93a7b9",
          400: "#708aa2",
          500: "#406383",
          600: "#103c64",
          700: "#0d3152",
          800: "#0c2b48",
          900: "#0a243c",
        },
        // Tertiary neutral, sampled from the "JOJA" lettering in the logo file
        // via pixel analysis — see scripts/sample-logo-grey.js. Base/500 (#8d8d8d)
        // is the logo's true emblem grey; other shades are derived tints/shades of it.
        graphite: {
          100: "#f0f0f0",
          200: "#dcdcdc",
          300: "#c2c2c2",
          400: "#a8a8a8",
          500: "#8d8d8d",
          600: "#6f6f6f",
          700: "#565656",
          800: "#3d3d3d",
          900: "#262626",
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
  plugins: [
    // Gates transform/shadow hover effects to devices that support real
    // hovering (mouse/trackpad) so they can never get "stuck" after a tap
    // on touch devices. Plain color-transition hovers are left on the
    // normal `hover:` variant since a lingering color tint is harmless.
    plugin(({ addVariant }) => {
      addVariant("hoverable", "@media (hover: hover) and (pointer: fine) { &:hover }");
    }),
  ],
};
export default config;
