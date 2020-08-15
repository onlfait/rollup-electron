const { appIcon, appName } = require("../config");
const { Tray, Menu } = require("electron");
const quit = require("../app/quit");
const path = require("path");

let tray = null;
let mainWin = null;

const icon = path.resolve(__dirname, `../../${appIcon}`);

function showMainWindow() {
  mainWin.show();
}

function toggleMainWindow() {
  mainWin.isVisible() ? mainWin.hide() : mainWin.show();
}

function createMenu() {
  return Menu.buildFromTemplate([
    { label: appName, enabled: false },
    { type: "separator" },
    { label: "Main", click: () => showMainWindow() },
    { type: "separator" },
    { label: "Quit", click: () => quit() }
  ]);
}

module.exports = function create(win) {
  if (!tray) {
    mainWin = win;
    tray = new Tray(icon);
    tray.setToolTip(appName);
    tray.setContextMenu(createMenu());
    tray.on("click", toggleMainWindow);
    tray.setIgnoreDoubleClickEvents(true);
  }

  return tray;
};
