import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        burgundy: "#4a0e1e",
        "burgundy-dark": "#330714",
        "burgundy-light": "#6a1b2a",
        gold: "#c5a059",
        "gold-light": "#d4b88a",
        charcoal: "#1a1a1a",
        "charcoal-light": "#2a2a2a",
      },
    },
  },
  plugins: [],
};
export default config;
