const Store = require("electron-store");

const defaults = {
  darkMode: true
};

module.exports = new Store({ defaults });
