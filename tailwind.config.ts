import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172026",
        paper: "#fbfaf7",
        line: "#e8e1d8",
        mint: "#2f8f83",
        coral: "#d66a55",
        amber: "#e4aa3f"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(23, 32, 38, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
