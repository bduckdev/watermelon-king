/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svelte}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        earth: {
          primary: "#c2073f",
          secondary: "#470216",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#058f65",
        },
      },
    ],
  },
};
