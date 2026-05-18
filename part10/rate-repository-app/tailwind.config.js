const { platformSelect } = require("nativewind/theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        error: "rgb(var(--color-error) / <alpha-value>) /* #d73a4a */",
        primary: "rgb(var(--color-primary) / <alpha-value>) /* #0366d6 */",
        "text-primary":
          "rgb(var(--color-text-primary) / <alpha-value>) /* #24292e */",
        "text-secondary":
          "rgb(var(--color-text-secondary) / <alpha-value>) /* #586069 */",
      },
      fontFamily: {
        main: platformSelect({
          ios: "Arial",
          android: "Roboto",
          default: "System",
        }),
      },
    },
  },
}
