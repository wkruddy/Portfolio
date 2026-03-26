/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
      extend: {
        colors: {
          background: "#020617",
          foreground: "#e2e8f0",
          muted: "#94a3b8"
        },
        boxShadow: {
          panel: "0 30px 70px rgba(2, 6, 23, 0.38)",
          glow: "0 18px 45px rgba(124, 58, 237, 0.24)"
        },
        backgroundImage: {
          hero: "radial-gradient(circle at top, rgba(125, 211, 252, 0.08), transparent 28%), linear-gradient(180deg, #020617 0%, #0f172a 52%, #111827 100%)"
        }
      }
    },
    plugins: []
  };
