const { ipcMain } = require("electron");

module.exports = function register() {
  ipcMain.handle("remote.get", require("./get"));
  ipcMain.handle("remote.call", require("./call"));
};
