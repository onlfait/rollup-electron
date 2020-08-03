const { contextBridge, ipcRenderer } = require("electron");
const {
  setDarkModeLocale,
  setDarkModeRemote
} = require("../../app/setDarkMode");

ipcRenderer.on("setDarkMode", (event, darkMode) => {
  setDarkModeLocale(darkMode);
});

contextBridge.exposeInMainWorld("remote", {
  setDarkMode: setDarkModeRemote(ipcRenderer),
  isDarkMode: () => ipcRenderer.invoke("isDarkMode"),
  uncaughtError: error => ipcRenderer.invoke("uncaughtError", error),
  twitch: (api, args = []) => ipcRenderer.invoke("twitch", { api, args }),
  openTwitchChat: () => ipcRenderer.invoke("openTwitchChat"),
  savePanels: items => ipcRenderer.invoke("savePanels", items),
  getPanels: () => ipcRenderer.invoke("getPanels"),
  getCurrentPanelId: () => ipcRenderer.invoke("getCurrentPanelId"),
  setCurrentPanelId: id => ipcRenderer.invoke("setCurrentPanelId", id),
  getAllGrids: () => ipcRenderer.invoke("getAllGrids"),
  saveGrid: grid => ipcRenderer.invoke("saveGrid", grid),
  removeGrid: id => ipcRenderer.invoke("removeGrid", id)
});
