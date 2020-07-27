const { shell, contextBridge, ipcRenderer } = require("electron");
const { onError } = require("./errorHandler");
const createIssue = require("./createIssue");
const {
  setDarkModeLocale,
  setDarkModeRemote
} = require("../../app/setDarkMode");

ipcRenderer.on("error", onError);

ipcRenderer.on("setDarkMode", (event, darkMode) => {
  setDarkModeLocale(darkMode);
});

contextBridge.exposeInMainWorld("remote", {
  openIssue() {
    shell.openExternal(createIssue());
  },
  relaunchApp() {
    ipcRenderer.invoke("relaunchApp");
  },
  exitApp() {
    ipcRenderer.invoke("exitApp");
  },
  setDarkMode: setDarkModeRemote(ipcRenderer)
});
