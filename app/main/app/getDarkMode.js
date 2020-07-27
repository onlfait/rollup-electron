const config = require("../config");

module.exports = function getDarkMode() {
  console.log("getDarkMode >>>", config.darkMode);
  return config.darkMode;
};
