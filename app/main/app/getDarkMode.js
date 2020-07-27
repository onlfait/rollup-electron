const store = require("../store");

module.exports = function getDarkMode() {
  return store.get("darkMode", true);
};
