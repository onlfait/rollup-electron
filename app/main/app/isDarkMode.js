const store = require("../store");

module.exports = function isDarkMode() {
  return store.get("darkMode", true);
};
