const { contextBridge, ipcRenderer } = require("electron");
const {
  setDarkModeLocale,
  setDarkModeRemote
} = require("../../app/setDarkMode");

ipcRenderer.on("setDarkMode", (event, darkMode) => {
  setDarkModeLocale(darkMode);
});

contextBridge.exposeInMainWorld("remote", {
  uncaughtError(error) {
    ipcRenderer.invoke("uncaughtError", error);
  },
  twitch(api, args = []) {
    return ipcRenderer.invoke("twitch", { api, args });
  },
  openTwitchChat() {
    ipcRenderer.invoke("openTwitchChat");
  },
  setDarkMode: setDarkModeRemote(ipcRenderer)
});
