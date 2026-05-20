const { hairlineWidth } = require("nativewind/theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./App/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border)) /* hsl(0 0% 89.8%) */",
        input: "hsl(var(--input)) /* hsl(0 0% 89.8%) */",
        ring: "hsl(var(--ring)) /* hsl(0 0% 63%) */",
        background: "hsl(var(--background)) /* hsl(0 0% 100%) */",
        foreground: "hsl(var(--foreground)) /* hsl(0 0% 3.9%) */",
        primary: {
          DEFAULT: "hsl(var(--primary)) /* hsl(0 0% 9%) */",
          foreground: "hsl(var(--primary-foreground)) /* hsl(0 0% 98%) */",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary)) /* hsl(0 0% 96.1%) */",
          foreground: "hsl(var(--secondary-foreground)) /* hsl(0 0% 9%) */",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive)) /* hsl(0 84.2% 60.2%) */",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted)) /* hsl(0 0% 96.1%) */",
          foreground: "hsl(var(--muted-foreground)) /* hsl(0 0% 45.1%) */",
        },
        accent: {
          DEFAULT: "hsl(var(--accent)) /* hsl(0 0% 96.1%) */",
          foreground: "hsl(var(--accent-foreground)) /* hsl(0 0% 9%) */",
        },
        popover: {
          DEFAULT: "hsl(var(--popover)) /* hsl(0 0% 100%) */",
          foreground: "hsl(var(--popover-foreground)) /* hsl(0 0% 3.9%) */",
        },
        card: {
          DEFAULT: "hsl(var(--card)) /* hsl(0 0% 100%) */",
          foreground: "hsl(var(--card-foreground)) /* hsl(0 0% 3.9%) */",
        },
        brand: {
          DEFAULT: "hsl(var(--brand)) /* hsl(212 97% 43%) */",
        },
        appBackground: {
          DEFAULT: "hsl(var(--app-background)) /* hsl(214 13% 90%) */",
        },
        textPrimary: {
          DEFAULT: "hsl(var(--text-primary)) /* hsl(210 13% 16%) */",
        },
        textSecondary: {
          DEFAULT: "hsl(var(--text-secondary)) /* hsl(210 8% 38%) */",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        hairline: hairlineWidth(),
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("tailwindcss-animate")],
}
