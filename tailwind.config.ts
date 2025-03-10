
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1EAEDB", // Bright turquoise from logo
          light: "#33C3F0",
          dark: "#0E9CC9",
        },
        secondary: {
          DEFAULT: "#ea384c", // Red accent from logo
          light: "#ff4d61",
          dark: "#d62438",
        },
        neutral: {
          DEFAULT: "#8E9196",
          light: "#F7F8FA",
          dark: "#1A1F2C",
        },
        accent: {
          DEFAULT: "#7E69AB", // Royal purple for futuristic look
          light: "#9b87f5",
          dark: "#6E59A5",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "0.4" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        glow: "glow 2s ease-in-out infinite",
        pulse: "pulse 3s infinite ease-in-out",
        "shimmer": "shimmer 2s infinite linear",
        float: "float 4s ease-in-out infinite",
        "scale-in": "scale-in 0.5s ease-out",
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary.light), 0 0 20px theme(colors.primary.light)',
        'neon-accent': '0 0 5px theme(colors.accent.light), 0 0 20px theme(colors.accent.light)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
