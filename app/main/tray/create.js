const { Tray, Menu } = require("electron");
const showMainWindow = require("../main-window/create");
const showChatWindow = require("../twitch/chat-window/create");
const { appIcon, appName, darkMode } = require("../app/config");
const toggleWindow = require("../app/toggleWindow");
const quit = require("../app/quit");

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
    tray = new Tray(appIcon);
    tray.setToolTip(appName);
    tray.setContextMenu(createMenu());
    tray.on("click", () => toggleWindow(mainWin));
    tray.setIgnoreDoubleClickEvents(true);
  }

  return tray;
};
