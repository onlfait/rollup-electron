const darkMode = require("tailwindcss-dark-mode");
const defaultConfig = require("tailwindcss/defaultConfig");

const purge = process.argv.includes("--prod");

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
  purge: {
    enabled: purge,
    content: [
      "app/renderer/**/*.html",
      "app/renderer/**/*.svelte",
      "app/main/app/window/titlebar.js"
    ],
    options: {
      whitelist: ["theme--dark"]
    }
  },
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
