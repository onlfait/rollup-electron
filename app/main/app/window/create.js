const { createSecureWindow } = require("../security");
const winStoreBounds = require("./storeBounds");
const winHideOnClose = require("./hideOnClose");
const config = require("../../config");
const path = require("path");

let win = null;

const devTools = config.isDev || config.isDebug;

module.exports = function createWindow({
  name,
  show = true,
  preload = false,
  storeBounds = false,
  hideOnClose = false,
  ...options
} = {}) {
  if (win) {
    show && win.show();
    return win;
  }

  if (preload) {
    preload = path.resolve(__dirname, `../../windows/${name}/preload.js`);
  }

  win = createSecureWindow({
    ...options,
    width: 800,
    height: 600,
    show: false,
    backgroundColor: "#fff",
    webPreferences: { devTools, preload }
  });

  win.name = name;

  win.loadURL(`app://renderer/windows/${name}/index.html`);

  storeBounds && winStoreBounds(win);
  hideOnClose && winHideOnClose(win);

  win.webContents.once("did-finish-load", () => {
    devTools && win.webContents.openDevTools();
    show && win.show();
  });
};
