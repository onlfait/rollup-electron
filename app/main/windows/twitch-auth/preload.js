const { contextBridge, ipcRenderer } = require("electron");
const {
  setDarkModeLocale,
  setDarkModeRemote
} = require("../../app/setDarkMode");

ipcRenderer.on("setDarkMode", (event, darkMode) => {
  setDarkModeLocale(darkMode);
});

contextBridge.exposeInMainWorld("remote", {
  setDarkMode: setDarkModeRemote(ipcRenderer)
});
