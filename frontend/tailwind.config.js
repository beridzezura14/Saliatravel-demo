/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22afb9", // $primary-color
        white: "#ffff", // $white
        black: "#3b3b3b", // $black
        grey: "#f5f5f5", // $grey
      },
      fontFamily: {
        caps: ["caps", "sans-serif"], // 'caps' რომლითაც მიმართავ
        normal: ["normali", "sans-serif"], // 'normal' რომლითაც მიმართავ
        colasta: ["colasta", "sans-serif"],
        colastaLight: ["colastaLight", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xl2: "1580px"

        // თუ custom გაქვს შეცვლილი, დაამატე აქ
      },
    },
  },
  plugins: [],
};
