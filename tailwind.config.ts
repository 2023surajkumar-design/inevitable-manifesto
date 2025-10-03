import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "cosmic-dawn": "hsl(var(--cosmic-dawn))",
        "cosmic-dusk": "hsl(var(--cosmic-dusk))",
        "phoenix-red": "hsl(var(--phoenix-red))",
        "renaissance-gold": "hsl(var(--renaissance-gold))",
        "quantum-violet": "hsl(var(--quantum-violet))",
        "nebula-pink": "hsl(var(--nebula-pink))",
        "enlightenment-blue": "hsl(var(--enlightenment-blue))",
        "revolution-crimson": "hsl(var(--revolution-crimson))",
        disruption: {
          primary: "hsl(var(--disruption-primary))",
        },
        evolution: {
          secondary: "hsl(var(--evolution-secondary))",
        },
        transcendence: {
          accent: "hsl(var(--transcendence-accent))",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        heading: ["Orbitron", "sans-serif"],
        philosophical: ["Playfair Display", "serif"],
        elegant: ["Crimson Pro", "serif"],
        classical: ["Cinzel", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "cosmic-xs": ["0.75rem", { lineHeight: "1.6", letterSpacing: "0.08em" }],
        "cosmic-sm": ["0.875rem", { lineHeight: "1.7", letterSpacing: "0.06em" }],
        "cosmic-base": ["1rem", { lineHeight: "1.8", letterSpacing: "0.04em" }],
        "cosmic-lg": ["1.25rem", { lineHeight: "1.85", letterSpacing: "0.03em" }],
        "cosmic-xl": ["1.5rem", { lineHeight: "1.9", letterSpacing: "0.02em" }],
        "cosmic-2xl": ["1.75rem", { lineHeight: "1.95", letterSpacing: "0.015em" }],
        "cosmic-3xl": ["2.25rem", { lineHeight: "2.05", letterSpacing: "0.01em" }],
        "cosmic-4xl": ["2.75rem", { lineHeight: "1.1", letterSpacing: "0.005em" }],
        "cosmic-5xl": ["3.25rem", { lineHeight: "1.05", letterSpacing: "0.002em" }],
        "cosmic-6xl": ["3.75rem", { lineHeight: "1.05" }],
        "cosmic-7xl": ["4.5rem", { lineHeight: "1.02" }],
        "cosmic-8xl": ["5.25rem", { lineHeight: "1" }],
        "cosmic-9xl": ["6rem", { lineHeight: "0.98" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "phi-1": "0.382rem",
        "phi-2": "0.618rem",
        "phi-3": "1rem",
        "phi-4": "1.618rem",
        "phi-5": "2.618rem",
        "phi-6": "4.236rem",
        "phi-7": "6.854rem",
        "phi-8": "11.09rem",
      },
      width: {
        "organic-sm": "18.5rem",
        "organic-md": "26.25rem",
        "organic-lg": "34.8rem",
      },
      height: {
        "organic-md": "26.25rem",
        "organic-lg": "38.2rem",
      },
      transitionTimingFunction: {
        cosmic: "var(--ease-cosmic)",
        organic: "var(--ease-organic)",
        transcendent: "var(--ease-transcendent)",
      },
      transitionDelay: {
        "cosmic-1": "120ms",
        "cosmic-2": "240ms",
        "cosmic-3": "360ms",
        "cosmic-4": "480ms",
        "cosmic-5": "600ms",
        "cosmic-6": "720ms",
        "cosmic-7": "840ms",
        "cosmic-8": "960ms",
        "cosmic-9": "1080ms",
        "cosmic-10": "1200ms",
      },
      transitionDuration: {
        transcendent: "1400ms",
        celestial: "2000ms",
      },
      backgroundImage: {
        "phoenix-gradient": "var(--gradient-phoenix)",
        "cosmos-gradient": "var(--gradient-cosmos)",
        "renaissance-gradient": "var(--gradient-renaissance)",
      },
      backdropBlur: {
        cosmic: "28px",
      },
      boxShadow: {
        phoenix: "0 20px 60px -20px hsla(12, 85%, 55%, 0.4), 0 40px 90px -30px hsla(39, 92%, 58%, 0.35)",
        quantum: "0 20px 80px -24px hsla(274, 86%, 60%, 0.45)",
        ethereal: "inset 0 0 30px hsla(262, 71%, 38%, 0.35)",
      },
      dropShadow: {
        phoenix: ["0 0 20px hsla(12, 85%, 55%, 0.45)", "0 0 40px hsla(39, 92%, 58%, 0.35)"],
        cosmic: ["0 0 24px hsla(205, 84%, 64%, 0.25)", "0 0 60px hsla(274, 86%, 60%, 0.25)"],
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
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--primary) / 0.6)" },
        },
        morphing: {
          "0%, 100%": { borderRadius: "42% 58% 62% 38% / 42% 42% 58% 58%" },
          "33%": { borderRadius: "58% 42% 38% 62% / 48% 32% 68% 52%" },
          "66%": { borderRadius: "48% 52% 32% 68% / 58% 58% 42% 42%" },
        },
        "liquid-flow": {
          "0%": { transform: "translate3d(0,0,0) scale(1)", filter: "hue-rotate(0deg)" },
          "50%": { transform: "translate3d(-2%,1%,0) scale(1.02)", filter: "hue-rotate(25deg)" },
          "100%": { transform: "translate3d(0,0,0) scale(1)", filter: "hue-rotate(0deg)" },
        },
        "particle-drift": {
          "0%": { transform: "translate3d(0,0,0)", opacity: "0.6" },
          "50%": { transform: "translate3d(8px,-12px,0)", opacity: "0.85" },
          "100%": { transform: "translate3d(0,0,0)", opacity: "0.6" },
        },
        "text-reveal": {
          "0%": { transform: "translateY(20px)", opacity: "0", letterSpacing: "0.12em" },
          "60%": { opacity: "1" },
          "100%": { transform: "translateY(0)", opacity: "1", letterSpacing: "0.02em" },
        },
        "holographic-shimmer": {
          "0%": { opacity: "0.6", filter: "saturate(1)" },
          "50%": { opacity: "1", filter: "saturate(1.4) hue-rotate(20deg)" },
          "100%": { opacity: "0.6", filter: "saturate(1)" },
        },
        "fractal-pulse": {
          "0%, 100%": { transform: "scale(1)", filter: "drop-shadow(0 0 20px hsla(274, 86%, 60%, 0.3))" },
          "50%": { transform: "scale(1.05)", filter: "drop-shadow(0 0 40px hsla(274, 86%, 60%, 0.5))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        morph: "morphing 12s var(--ease-organic) infinite",
        "liquid-flow": "liquid-flow 10s var(--ease-cosmic) infinite",
        "particle-drift": "particle-drift 18s linear infinite",
        "text-reveal": "text-reveal 1.2s var(--ease-transcendent) forwards",
        "holographic-shimmer": "holographic-shimmer 6s ease-in-out infinite",
        "fractal-pulse": "fractal-pulse 8s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
