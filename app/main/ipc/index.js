const { ipcMain } = require("electron");

ipcMain.handle("remote.get", require("./get"));
ipcMain.handle("remote.call", require("./call"));
