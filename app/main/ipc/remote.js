const appStore = require("../stores/app");

module.exports = {
  app: {
    version: "0.0.1",
    setDarkMode(enable = true) {
      appStore.set("darkMode", enable);
    }
  }
};
