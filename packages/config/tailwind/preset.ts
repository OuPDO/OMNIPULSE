import type { Config } from "tailwindcss";

/**
 * OMNIPULSE Tailwind CSS v4 Preset
 *
 * ObladenMedia Brand-Tokens als Basis.
 * Wird von allen Apps (web, mobile via NativeWind) geteilt.
 *
 * IMPORTANT: Semantic colors (primary, secondary, etc.) are handled by the
 * @theme inline block in each app's globals.css (via TweakCN theme).
 * This preset ONLY provides brand utility colors and font families.
 */
const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // ObladenMedia Brand — Direkte Utility-Klassen (bg-om-graphite, text-om-saffron etc.)
        "om-graphite": "#40454D",
        "om-saffron": "#F5C754",
        "om-coral": "#F55F52",
        "om-meadow": "#64BD79",
        "om-aqua": "#6DB2CC",
      },
      fontFamily: {
        heading: ["Montserrat", "Arial", "Helvetica", "sans-serif"],
        sans: ["Merriweather Sans", "Open Sans", "Arial", "sans-serif"],
        accent: ["Caveat", "Indie Flower", "cursive"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
};

export default preset;
