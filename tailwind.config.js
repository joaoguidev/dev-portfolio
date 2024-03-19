/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette")

export default {
   content: ["./app/**/*.{js,jsx,ts,tsx,mdx}"],
   darkMode: "class",
   theme: {
      extend: {
        colors: {
          'background-dark': colors.black,
          'background-light': colors.white,
        },
      },
   },
   plugins: [addVariablesForColors, require('@tailwindcss/typography')],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}