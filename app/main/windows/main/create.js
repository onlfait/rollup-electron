const createWindow = require("../../app/window/create");

module.exports = function createMainWindow(options = {}) {
  return createWindow({
    ...options,
    unique: true,
    name: "main",
    preload: true,
    storeBounds: true,
    hideOnClose: true
  });
};
