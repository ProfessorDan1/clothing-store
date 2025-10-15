// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf2ff",
          100: "#fde8ff",
          500: "#7c3aed",
        },
      },
    },
  },
  plugins: [],
};
export default config;
