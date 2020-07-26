const { Tray, Menu } = require("electron");
const showChatWindow = require("../twitch/chat-window/create");
const { appIcon, appName, darkMode } = require("../app/config");

let tray = null;

function show(args) {
  console.log("SHOW", args);
}

function toggleMainWindow() {
  console.log("toggleMainWindow");
}

function quit() {
  console.log("QUIT");
}

function createMenu() {
  return Menu.buildFromTemplate([
    { label: appName, enabled: false },
    { type: "separator" },
    { label: "Chat", click: () => showChatWindow({ darkMode }) },
    { type: "separator" },
    { label: "Help", click: () => show({ path: "/help" }) },
    { label: "About", click: () => show({ path: "/about" }) },
    { type: "separator" },
    { label: "Quit", click: () => quit() }
  ]);
}

module.exports = function create() {
  if (!tray) {
    tray = new Tray(appIcon);
    tray.setToolTip(appName);
    tray.setContextMenu(createMenu());
    tray.on("click", toggleMainWindow);
    tray.setIgnoreDoubleClickEvents(true);
  }

  return tray;
};
