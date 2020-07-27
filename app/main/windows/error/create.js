const createBrowserWindow = require("../../app/security/createBrowserWindow");
const { hasDevTools, appName, appIcon } = require("../../config");
const getMainWindow = require("../../app/getMainWindow");
const createTitlebar = require("../../app/titlebar");
const exitApp = require("../../app/exit");
const path = require("path");

let win = null;

function showErrorWindow(win, error) {
  win.webContents.send("error", error);
  win.show();
  return win;
}

module.exports = function createErrorWindow(error) {
  if (win) {
    return showErrorWindow(win, error);
  }

  win = createBrowserWindow({
    width: 540,
    height: 340,
    show: false,
    modal: true,
    frame: false,
    parent: getMainWindow(),
    webPreferences: {
      devTools: hasDevTools,
      preload: path.resolve(__dirname, "preload.js")
    }
  });

  createTitlebar({ win, title: `Error - ${appName}`, icon: appIcon });

  win.loadURL("app://renderer/error-window/index.html");
  hasDevTools && win.webContents.openDevTools();

  win.webContents.on("did-finish-load", () => {
    showErrorWindow(win, error);
  });

  win.webContents.on("close", () => {
    exitApp(1);
  });
};
