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
  isDarkMode() {
    return ipcRenderer.invoke("isDarkMode");
  },
  uncaughtError(error) {
    ipcRenderer.invoke("uncaughtError", error);
  },
  twitch(api, args = []) {
    return ipcRenderer.invoke("twitch", { api, args });
  },
  openTwitchChat() {
    ipcRenderer.invoke("openTwitchChat");
  },
  saveGridItems(items) {
    ipcRenderer.invoke("saveGridItems", items);
  },
  getGridItems() {
    return ipcRenderer.invoke("getGridItems");
  }
});
