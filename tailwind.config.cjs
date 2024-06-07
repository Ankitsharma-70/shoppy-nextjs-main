/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#d0cfd0",
          200: "#a09fa2",
          300: "#716e73",
          400: "#413e45",
          500: "#120e16",
          600: "#0e0b12",
          700: "#0b080d",
          800: "#070609",
          900: "#040304",
        },
        gray: {
          100: "#f0f0f0",
          200: "#e1e1e1",
          300: "#d3d3d3",
          400: "#c4c4c4",
          500: "#b5b5b5",
          600: "#919191",
          700: "#6d6d6d",
          800: "#484848",
          900: "#242424",
        },
        light: {
          100: "#fcfdff",
          200: "#fafbfe",
          300: "#f7f8fe",
          400: "#f5f6fd",
          500: "#f2f4fd",
          600: "#c2c3ca",
          700: "#919298",
          800: "#616265",
          900: "#303133",
        },
        brand: {
          100: "#e4dbfa",
          200: "#cab7f5",
          300: "#af94f0",
          400: "#9570eb",
          500: "#7a4ce6",
          600: "#623db8",
          700: "#492e8a",
          800: "#311e5c",
          900: "#180f2e",
        },
      },
    },
    backgroundImage: {
      brandGradient:
        "linear-gradient(90deg, rgba(160,140,239,1) 0%, rgba(97,63,229,1) 100%)",
      textGradient: "linear-gradient(to bottom, #404040 0%, black 100%);",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

module.exports = config;
