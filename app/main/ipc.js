const { ipcMain } = require("electron");

const { twitchAPI, openTwitchChat } = require("./twitch/ipcHandler");
const uncaughtError = require("./app/uncaughtError/ipcHandler");
const setDarkMode = require("./app/setDarkMode");
const relaunchApp = require("./app/relaunch");
const exitApp = require("./app/exit");

ipcMain.handle("uncaughtError", uncaughtError);

ipcMain.handle("setDarkMode", (e, darkMode) => setDarkMode(darkMode));
ipcMain.handle("relaunchApp", () => relaunchApp(1));
ipcMain.handle("exitApp", () => exitApp(1));

ipcMain.handle("twitch", twitchAPI);
ipcMain.handle("openTwitchChat", openTwitchChat);
