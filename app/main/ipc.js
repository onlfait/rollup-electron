const { ipcMain } = require("electron");

const appStore = require("./stores/app");

ipcMain.handle("remote", (event, method, ...args) => {
  if (method === "app.setDarkMode") {
    appStore.set("darkMode", args[0]);
  }
});
