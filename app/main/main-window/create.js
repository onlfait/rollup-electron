const createBrowserWindow = require("../app/security/createBrowserWindow");
const path = require("path");

const { hasDevTools } = require("../app/config");

module.exports = function create() {
  const win = createBrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      devTools: hasDevTools,
      preload: path.resolve(__dirname, "preload.js")
    }
  });

  win.loadURL("app://renderer/main-window/index.html");
  hasDevTools && win.webContents.openDevTools();

  win.webContents.on("did-finish-load", () => {
    win.show();
  });

  return win;
};
