/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBackgroundColor: "#0D1117",
        columnBackgroundColor: "#161C22",
        customBlue: "#0D3A5C",
        colorLightBlue: "#A2E6FA",
        blueColor: "#0D3A5C",
      },

      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
