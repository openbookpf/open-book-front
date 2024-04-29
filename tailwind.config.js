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
        },
        cyan: {
          0: "#81B29A",
        },
        white: {
          0: "#F4F1DE",
        },
        blue: {
          0: "#3D405B",
        },
      },
      darkMode: 'class',
    },
  },
  plugins: [],
};
