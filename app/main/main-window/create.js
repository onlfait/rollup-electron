const createBrowserWindow = require("../app/security/createBrowserWindow");
const path = require("path");

const { hasDevTools, appURL } = require("../app/utils");

module.exports = function create() {
  const win = createBrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: hasDevTools,
      preload: path.resolve(__dirname, "preload.js")
    }
  });

  win.loadURL(`${appURL}/main-window/index.html`);
  hasDevTools && win.webContents.openDevTools();

  return win;
};
