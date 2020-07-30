const Store = require("electron-store");

const defaults = {
  darkMode: true,
  gridItems: []
};

module.exports = new Store({ defaults });
