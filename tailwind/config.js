const darkMode = require("tailwindcss-dark-mode");

module.exports = {
  purge: [],
  theme: {
    darkSelector: ".theme--dark",
    extend: {}
  },
  variants: {
    textColor: ["hover", "dark", "dark-hover"],
    borderColor: ["hover", "dark", "dark-hover"],
    backgroundColor: ["hover", "dark", "dark-hover"]
  },
  plugins: [darkMode()]
};
