const createBrowserWindow = require("../app/security/createBrowserWindow");
const { hasDevTools, appName, appIcon } = require("../app/config");
const hideWinOnClose = require("../app/hideWinOnClose");
const createTitlebar = require("../app/titlebar");
const getTheme = require("../twitch/getTheme");
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
    title: "MainWindow",
    webPreferences: {
      devTools: hasDevTools,
      preload: path.resolve(__dirname, "preload.js")
    }
  });

  hideWinOnClose(win);
  createTitlebar({ win, darkMode, title: appName, icon: appIcon });

  win.webContents.on("dom-ready", () => {
    win.webContents.executeJavaScript(getTheme(darkMode));
  });

  win.loadURL("app://renderer/main-window/index.html");
  hasDevTools && win.webContents.openDevTools();

  win.webContents.on("did-finish-load", () => {
    show && win.show();
  });

  return win;
};
