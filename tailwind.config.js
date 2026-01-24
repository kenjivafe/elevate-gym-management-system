/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "'Segoe UI'", "sans-serif"],
        sans: ["'Space Grotesk'", "'Segoe UI'", "sans-serif"],
      },
      colors: {
        canvas: {
          DEFAULT: "#05060a",
          subtle: "#0c111d",
        },
        primary: {
          DEFAULT: "#4c8dff",
          muted: "#d5e4ff",
        },
        accent: {
          DEFAULT: "#f97316",
          soft: "#ffe6d7",
        },
        border: {
          subtle: "rgba(255,255,255,0.08)",
        },
      },
      boxShadow: {
        card: "0 20px 45px -30px rgba(12,17,29,0.45)",
      },
      backgroundImage: {
        'mesh-glow':
          "radial-gradient(circle at 20% 20%, rgba(76, 141, 255, 0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(249, 115, 22, 0.2), transparent 40%)",
      },
    },
  },
  plugins: [],
}

