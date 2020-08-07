const { contextBridge, ipcRenderer } = require("electron");
const {
  setDarkModeLocale,
  setDarkModeRemote
} = require("../../app/setDarkMode");

ipcRenderer.on("setDarkMode", (event, darkMode) => {
  setDarkModeLocale(darkMode);
});

ipcRenderer.on("obs", (event, { type, args }) => {
  console.log("obs:", { type, args });
});

contextBridge.exposeInMainWorld("remote", {
  setDarkMode: setDarkModeRemote(ipcRenderer),
  isDarkMode: () => ipcRenderer.invoke("isDarkMode"),
  uncaughtError: error => ipcRenderer.invoke("uncaughtError", error),
  twitch: (api, args = []) => ipcRenderer.invoke("twitch", { api, args }),
  openTwitchChat: () => ipcRenderer.invoke("openTwitchChat"),
  setPanels: (...args) => ipcRenderer.invoke("setPanels", ...args),
  getPanels: (...args) => ipcRenderer.invoke("getPanels", ...args),
  addGridIcon: (...args) => ipcRenderer.invoke("addGridIcon", ...args)
});
