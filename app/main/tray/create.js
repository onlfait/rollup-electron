const { Tray, Menu } = require("electron");
const showMainWindow = require("../windows/main/create");
const toggleWindow = require("../app/toggleWindow");
const { appIcon, appName } = require("../config");
const quit = require("../app/quit");
const path = require("path");

let tray = null;

function createMenu() {
  return Menu.buildFromTemplate([
    { label: appName, enabled: false },
    { type: "separator" },
    { label: "Main", click: () => showMainWindow() },
    { type: "separator" },
    { label: "Quit", click: () => quit() }
  ]);
}

module.exports = function create({ mainWin }) {
  if (!tray) {
    tray = new Tray(path.resolve(__dirname, `../../${appIcon}`));
    tray.setToolTip(appName);
    tray.setContextMenu(createMenu());
    tray.on("click", () => toggleWindow(mainWin));
    tray.setIgnoreDoubleClickEvents(true);
  }

  return tray;
};
