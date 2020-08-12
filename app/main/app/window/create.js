const { createSecureWindow } = require("../security");
const hideWinOnClose = require("./hideOnClose");
const config = require("../../config");
const path = require("path");

let win = null;

const devTools = config.isDev || config.isDebug;

module.exports = function createWindow({
  name,
  show = true,
  preload = false,
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

  hideOnClose && hideWinOnClose(win);

  win.webContents.once("did-finish-load", () => {
    devTools && win.webContents.openDevTools();
    show && win.show();
  });
};
