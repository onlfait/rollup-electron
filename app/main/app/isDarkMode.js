const store = require("../stores/app");

module.exports = function isDarkMode() {
  return store.get("darkMode", true);
};
