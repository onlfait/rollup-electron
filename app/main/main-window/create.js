const createBrowserWindow = require("../app/security/createBrowserWindow");
const { hasDevTools, appName } = require("../app/config");
const hideWinOnClose = require("../app/hideWinOnClose");
const createTitlebar = require("../app/titlebar");
const path = require("path");

let win = null;

module.exports = function create({ show = true, darkMode = true } = {}) {
  if (win) {
    show && win.show();
    return win;
  }

  win = createBrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    webPreferences: {
      devTools: hasDevTools,
      preload: path.resolve(__dirname, "preload.js")
    }
  });

  hideWinOnClose(win);
  createTitlebar({ win, darkMode, title: appName });

  win.loadURL("app://renderer/main-window/index.html");
  hasDevTools && win.webContents.openDevTools();

  win.webContents.on("did-finish-load", () => {
    show && win.show();
  });

  return win;
};
