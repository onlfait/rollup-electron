const { ipcMain } = require("electron");

ipcMain.handle("remote", (event, ...args) => {
  console.log(">>> remote", args);
});
