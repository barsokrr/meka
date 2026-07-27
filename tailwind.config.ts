import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        stone: {
          DEFAULT: "#F2EFE8",
          light: "#F7F5F0",
        },
        cream: {
          DEFAULT: "#F2EFE8",
          light: "#F7F5F0",
        },
        charcoal: "#141414",
        muted: "#5E5A54",
        earth: "#6B6E4E",
        olive: "#5C6B4F",
        accent: "#8A6A3E",
        terracotta: "#8A6A3E",
        surface: "#EBE7DF",
        border: "#D5CFC4",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.18em",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hero-reveal": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "soft-rise": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.45s ease-out",
        "hero-reveal": "hero-reveal 0.8s ease-out both",
        "soft-rise": "soft-rise 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
