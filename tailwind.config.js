/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
    },
  },
  plugins: [],
};
