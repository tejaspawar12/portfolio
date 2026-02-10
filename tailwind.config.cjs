/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: {
          900: "#0b0f1a",
          800: "#0f1525",
          700: "#151c30",
          600: "#1b243d"
        },
        neon: {
          400: "#7cf7ff",
          500: "#62e0ff",
          600: "#43c6ff"
        }
      },
      boxShadow: {
        glass: "0 10px 40px -12px rgba(12, 18, 36, 0.6)",
        glow: "0 0 20px rgba(99, 102, 241, 0.35)"
      },
      backdropBlur: {
        xs: "2px"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(124,247,255,0.14) 1px, transparent 0)",
        noise: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\" viewBox=\"0 0 160 160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"160\" height=\"160\" filter=\"url(%23n)\" opacity=\"0.25\"/></svg>')"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.9" }
        },
        gradientBorder: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
        gradientBorder: "gradientBorder 10s ease infinite"
      },
      backgroundSize: {
        "border-gradient": "200% 200%"
      }
    }
  },
  plugins: []
};
