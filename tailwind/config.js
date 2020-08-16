const darkMode = require("tailwindcss-dark-mode");
const defaultConfig = require("tailwindcss/defaultConfig");

const { variants } = defaultConfig;

const darkVariants = [
  "hover",
  "focus",
  "active",
  "disabled",
  "group-hover",
  "focus-within",
  "even",
  "odd",
  "placeholder"
];

function mergeDarkVariantes(key) {
  const input = variants[key];
  const output = [...input, "dark"];
  input.forEach(variant => {
    if (darkVariants.includes(variant)) {
      output.push(`dark-${variant}`);
    }
  });
  return output;
}

module.exports = {
  purge: [],
  theme: {
    darkSelector: ".theme--dark",
    extend: {}
  },
  variants: {
    textColor: mergeDarkVariantes("textColor"),
    borderColor: mergeDarkVariantes("borderColor"),
    backgroundColor: mergeDarkVariantes("backgroundColor")
  },
  plugins: [darkMode()]
};
