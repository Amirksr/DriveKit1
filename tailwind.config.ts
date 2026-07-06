import type { Config } from "tailwindcss";

/**
 * Tailwind configuration for DriveKit.
 *
 * The color palette mirrors the original brand identity of the storefront
 * (a warm amber/orange accent on a neutral surface), and the `vazirmatn`
 * font family is registered so Persian (Farsi) text renders with a proper
 * RTL-friendly typeface across the whole app.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        surmeh: "#1f2937",
      },
      fontFamily: {
        vazir: ["var(--font-vazirmatn)", "Tahoma", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 18px rgba(15, 23, 42, 0.08)",
        "card-hover": "0 10px 25px rgba(15, 23, 42, 0.15)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
