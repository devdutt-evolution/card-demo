import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif']
    },
    colors: {
      green: "#00875F",
      hgreen: "#00B37E",
      black: "#121214",
      card: "#202024",
      divider: "#323238",
      place: "#7C7C8A",
      txt: "#C4C4CC",
      tlt: "#E1E1E6",
      red: "#F75A68",
    },
  },
  plugins: [],
};
export default config;
