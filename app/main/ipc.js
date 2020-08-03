const { ipcMain } = require("electron");

const { twitchAPI, openTwitchChat } = require("./twitch/ipcHandler");
const uncaughtError = require("./app/uncaughtError/ipcHandler");
const { setDarkModeIPC } = require("./app/setDarkMode");
const isDarkMode = require("./app/isDarkMode");
const relaunchApp = require("./app/relaunch");
const exitApp = require("./app/exit");

const panels = require("./libs/panels");
const grids = require("./libs/grids");

ipcMain.handle("uncaughtError", uncaughtError);

ipcMain.handle("setDarkMode", setDarkModeIPC);
ipcMain.handle("isDarkMode", () => isDarkMode());

ipcMain.handle("relaunchApp", () => relaunchApp(1));
ipcMain.handle("exitApp", () => exitApp(1));

ipcMain.handle("twitch", twitchAPI);
ipcMain.handle("openTwitchChat", openTwitchChat);

ipcMain.handle("savePanels", panels.save);
ipcMain.handle("getPanels", panels.getAll);
ipcMain.handle("setCurrentPanelId", panels.setCurrentId);
ipcMain.handle("getCurrentPanelId", panels.getCurrentId);

ipcMain.handle("getAllGrids", grids.getAll);
ipcMain.handle("saveGrid", grids.saveGrid);
ipcMain.handle("removeGrid", grids.removeGrid);
