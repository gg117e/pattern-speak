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
        "mint-deep": "#256f66",
        coral: "#d66a55",
        amber: "#e4aa3f"
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "var(--font-inter)", "system-ui", "sans-serif"],
        latin: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(23, 32, 38, 0.06)",
        lift: "0 18px 44px rgba(23, 32, 38, 0.12)"
      },
      keyframes: {
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "reveal-up": "reveal-up 0.22s ease-out"
      }
    }
  },
  plugins: []
};

export default config;
