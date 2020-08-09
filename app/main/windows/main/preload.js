const { contextBridge, ipcRenderer } = require("electron");
const {
  setDarkModeLocale,
  setDarkModeRemote
} = require("../../app/setDarkMode");

const events = require("events");
const obsEmitter = new events.EventEmitter();

ipcRenderer.on("setDarkMode", (event, darkMode) => {
  setDarkModeLocale(darkMode);
});

ipcRenderer.on("obs", (event, { type, data }) => {
  obsEmitter.emit(type, data);
});

contextBridge.exposeInMainWorld("remote", {
  obs: {
    on: (...args) => obsEmitter.on(...args),
    send: (...args) =>
      ipcRenderer
        .invoke("obs.send", ...args)
        .catch(e => console.log("caca>>>>")),
    store: {
      get: (...args) => ipcRenderer.invoke("obs.store.get", ...args),
      set: (...args) => ipcRenderer.invoke("obs.store.set", ...args)
    }
  },
  setDarkMode: setDarkModeRemote(ipcRenderer),
  isDarkMode: () => ipcRenderer.invoke("isDarkMode"),
  uncaughtError: error => ipcRenderer.invoke("uncaughtError", error),
  twitch: (api, args = []) => ipcRenderer.invoke("twitch", { api, args }),
  openTwitchChat: () => ipcRenderer.invoke("openTwitchChat"),
  setPanels: (...args) => ipcRenderer.invoke("setPanels", ...args),
  getPanels: (...args) => ipcRenderer.invoke("getPanels", ...args),
  addGridIcon: (...args) => ipcRenderer.invoke("addGridIcon", ...args)
});
