const { ipcMain } = require("electron");
const uncaughtError = require("./app/uncaughtError/ipcHandler");
const twitchHandler = require("./twitch/ipcHandler");
const relaunchApp = require("./app/relaunch");
const exitApp = require("./app/exit");

ipcMain.handle("uncaughtError", uncaughtError);
ipcMain.handle("relaunchApp", () => relaunchApp(1));
ipcMain.handle("exitApp", () => exitApp(1));
ipcMain.handle("twitch", twitchHandler);
