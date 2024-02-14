const colors = require("./colors.config");

module.exports = {
  important: true, //"#root",
  mode: "jit",
  content: ["./app/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: colors,
      textColor: colors,
      borderColor: colors,
    },
  },
  plugins: [],
};
