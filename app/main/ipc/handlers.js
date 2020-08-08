const { ipcMain } = require("electron");

const { twitchAPI, openTwitchChat } = require("../twitch/ipcHandler");
const uncaughtError = require("../app/uncaughtError/ipcHandler");
const { setDarkModeIPC } = require("../app/setDarkMode");
const isDarkMode = require("../app/isDarkMode");
const relaunchApp = require("../app/relaunch");
const exitApp = require("../app/exit");

const panels = require("./panels");
const { send: obsSend, store: obsStore } = require("../obs");

ipcMain.handle("uncaughtError", uncaughtError);

ipcMain.handle("setDarkMode", setDarkModeIPC);
ipcMain.handle("isDarkMode", () => isDarkMode());

ipcMain.handle("relaunchApp", () => relaunchApp(1));
ipcMain.handle("exitApp", () => exitApp(1));

ipcMain.handle("twitch", twitchAPI);
ipcMain.handle("openTwitchChat", openTwitchChat);

ipcMain.handle("setPanels", panels.set);
ipcMain.handle("getPanels", panels.get);
ipcMain.handle("addGridIcon", panels.addGridIcon);

ipcMain.handle("obs.send", (event, ...args) => obsSend(...args));
ipcMain.handle("obs.store.get", (event, ...args) => obsStore.get(...args));
ipcMain.handle("obs.store.set", (event, ...args) => obsStore.set(...args));
