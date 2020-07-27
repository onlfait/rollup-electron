const { Tray, Menu } = require("electron");
const showMainWindow = require("../windows/main/create");
const showChatWindow = require("../windows/twitch-chat/create");
const { appIcon, appName, darkMode } = require("../config");
const toggleWindow = require("../app/toggleWindow");
const quit = require("../app/quit");
const path = require("path");

let tray = null;

function show(args) {
  console.log("SHOW", args);
}

function createMenu() {
  return Menu.buildFromTemplate([
    { label: appName, enabled: false },
    { type: "separator" },
    { label: "Main", click: () => showMainWindow({ darkMode }) },
    { label: "Chat", click: () => showChatWindow({ darkMode }) },
    { type: "separator" },
    { label: "Help", click: () => show({ path: "/help" }) },
    { label: "About", click: () => show({ path: "/about" }) },
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
