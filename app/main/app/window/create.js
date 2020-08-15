const { createSecureWindow } = require("../security");
const winStoreBounds = require("./storeBounds");
const winHideOnClose = require("./hideOnClose");
const appStore = require("../../stores/app");
const winTitlebar = require("./titlebar");
const config = require("../../config");
const path = require("path");

let win = null;

const darkMode = appStore.get("darkMode", true);
const devTools = config.isDev || config.isDebug;
const icon = path.resolve(__dirname, `../../../${config.appIcon}`);

module.exports = function createWindow({
  name,
  show = true,
  titlebar = true,
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

  const title = options.title || name;

  win = createSecureWindow({
    icon,
    title,
    ...options,
    width: 800,
    height: 600,
    show: false,
    frame: false,
    backgroundColor: "#fff",
    webPreferences: { devTools, preload }
  });

  win.name = name;

  storeBounds && winStoreBounds(win);
  hideOnClose && winHideOnClose(win);
  titlebar && winTitlebar(win, { title, darkMode });

  win.loadURL(`app://renderer/windows/${name}/index.html`);

  win.webContents.once("did-finish-load", () => {
    devTools && win.webContents.openDevTools();
    show && win.show();
  });

  return win;
};
