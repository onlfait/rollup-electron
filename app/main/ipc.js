const { ipcMain } = require("electron");

const { twitchAPI, openTwitchChat } = require("./twitch/ipcHandler");
const uncaughtError = require("./app/uncaughtError/ipcHandler");
const { setDarkModeIPC } = require("./app/setDarkMode");
const isDarkMode = require("./app/isDarkMode");
const relaunchApp = require("./app/relaunch");
const exitApp = require("./app/exit");
const store = require("./store");

ipcMain.handle("uncaughtError", uncaughtError);

ipcMain.handle("setDarkMode", setDarkModeIPC);
ipcMain.handle("isDarkMode", () => isDarkMode());

ipcMain.handle("relaunchApp", () => relaunchApp(1));
ipcMain.handle("exitApp", () => exitApp(1));

ipcMain.handle("twitch", twitchAPI);
ipcMain.handle("openTwitchChat", openTwitchChat);

ipcMain.handle("saveGridItems", (event, items) => {
  store.set("gridItems", items);
});
ipcMain.handle("getGridItems", () => {
  return store.get("gridItems", []);
});
