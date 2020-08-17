const createWindow = require("../../app/window/create");
const { getMainWindow } = require("../../app/windows");
const quit = require("../../app/quit");

module.exports = function create({ error, ...options } = {}) {
  const win = createWindow({
    ...options,
    modal: true,
    unique: true,
    name: "error",
    preload: true,
    storeBounds: false,
    hideOnClose: false,
    parent: getMainWindow()
  });

  win.webContents.on("close", quit);
  win.webContents.on("did-finish-load", () => {
    win.webContents.send("app.uncaughtError", error);
  });

  return win;
};
