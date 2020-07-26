const createBrowserWindow = require("../app/security/createBrowserWindow");
const { hasDevTools } = require("../app/config");
const { BrowserWindow } = require("electron");
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

  const [parent] = BrowserWindow.getAllWindows();

  win = createBrowserWindow({
    parent,
    width: 540,
    height: 340,
    show: false,
    modal: true,
    frame: false,
    webPreferences: {
      devTools: hasDevTools,
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadURL("app://renderer/error-window/index.html");
  hasDevTools && win.webContents.openDevTools();

  win.webContents.on("did-finish-load", () => {
    showErrorWindow(win, error);
  });
};
