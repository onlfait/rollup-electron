const createWindow = require("../../app/window/create");

module.exports = function createMainWindow(options = {}) {
  return createWindow({ name: "main", options });
};
