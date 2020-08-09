const createBrowserWindow = require("../../app/createBrowserWindow");
const { hasDevTools } = require("../../config");
const path = require("path");

let win = null;

module.exports = function create({ show = true } = {}) {
  if (win) {
    show && win.show();
    return win;
  }

  win = createBrowserWindow({
    title: "main",
    width: 800,
    height: 600,
    show: false,
    frame: false,
    titlebar: true,
    hideOnClose: true,
    storeBounds: true,
    webPreferences: {
      devTools: hasDevTools,
      preload: path.resolve(__dirname, "preload.js")
    }
  });

  win.loadURL("app://renderer/main-window/index.html");
  hasDevTools && win.webContents.openDevTools();

  win.webContents.on("did-finish-load", () => {
    show && win.show();
  });

  return win;
};
