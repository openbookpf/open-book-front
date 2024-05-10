/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    fontFamily: {
      poppins: ["Poppins"],
    },
    extend: {
      colors: {
        orange: {
          0: "#D34720",
          1: "#D48620",
        },
        cyan: {
          0: "#81B29A",
          1: "#628876",
        },
        white: {
          0: "#F4F1DE",
          1: "#fef3ed",
          2: "#DBD1CC",
        },
        blue: {
          0: "#3D405B",
          1: "#262738",
        },
      },
    },
    screens: {
      mv: "100px",
      sm: "670px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
