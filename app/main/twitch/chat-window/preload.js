const { contextBridge, ipcRenderer } = require("electron");
const {
  setDarkModeLocale,
  setDarkModeRemote
} = require("../../app/setDarkMode");

contextBridge.exposeInMainWorld("remote", {
  setDarkMode: setDarkModeRemote(ipcRenderer)
});

contextBridge.exposeInMainWorld("locale", {
  setDarkMode: setDarkModeLocale
});
