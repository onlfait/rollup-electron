const createBrowserWindow = require("../app/security/createBrowserWindow");
const path = require("path");

const hasDevTools = process.env.ROLLUP_WATCH;

module.exports = function create() {
  const win = createBrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: hasDevTools,
      preload: path.resolve(__dirname, "../main/main-window/preload.js")
    }
  });

  win.loadURL(`${__APP_HOST__}/main-window/index.html`);
  hasDevTools && win.webContents.openDevTools();

  return win;
};
