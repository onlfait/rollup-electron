const createBrowserWindow = require("../../app/security/createBrowserWindow");
const { hasDevTools, appName, appIcon, obsConfig } = require("../../config");
const hideWinOnClose = require("../../app/hideWinOnClose");
const createTitlebar = require("../../app/titlebar");
const storeWindow = require("../../app/storeWindow");
const { connect: obsConnect } = require("../../obs");
const path = require("path");

let win = null;

module.exports = function create({ show = true } = {}) {
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
  storeWindow({ win, name: "main" });
  createTitlebar({ win, title: appName, icon: appIcon });

  win.loadURL("app://renderer/main-window/index.html");
  hasDevTools && win.webContents.openDevTools();

  win.webContents.on("did-finish-load", () => {
    obsConnect({ ...obsConfig, win });
    show && win.show();
  });

  return win;
};
