const createBrowserWindow = require("../../app/security/createBrowserWindow");
const { hasDevTools, appIcon } = require("../../config");
const hideWinOnClose = require("../../app/hideWinOnClose");
const createTitlebar = require("../../app/titlebar");
const storeWindow = require("../../app/storeWindow");
const path = require("path");
const fs = require("fs");

const stylesCSS = fs.readFileSync(path.resolve(__dirname, "styles.css"));

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
    webPreferences: {
      devTools: hasDevTools,
      preload: path.resolve(__dirname, "preload.js")
    }
  });

  hideWinOnClose(win);
  storeWindow({ win, name: "twitch-chat" });
  createTitlebar({ win, title: "Chat - Twitch", icon: appIcon });

  win.loadURL("https://www.twitch.tv/embed/skarab42/chat?parent=localhost");
  hasDevTools && win.webContents.openDevTools();

  win.webContents.on("dom-ready", () => {
    win.webContents.insertCSS(stylesCSS.toString());
  });

  win.webContents.on("did-finish-load", () => {
    show && win.show();
  });
};
