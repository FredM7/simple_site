const colors = require("./colors.config");
const { nextui } = require("@nextui-org/react");

module.exports = {
  important: true, //"#root",
  mode: "jit",
  content: ["./app/**/*.{html,js,jsx,ts,tsx}", "./node_modules/@nextui-org/theme/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: colors,
      textColor: colors,
      borderColor: colors,
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
