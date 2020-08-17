const createWindow = require("../../app/window/create");
const { getMainWindow } = require("../../app/windows");

module.exports = function create({ error, ...options } = {}) {
  const win = createWindow({
    ...options,
    unique: true,
    name: "error",
    modal: true,
    preload: true,
    storeBounds: false,
    hideOnClose: false,
    parent: getMainWindow()
  });

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("app.uncaughtError", error);
  });

  return win;
};
