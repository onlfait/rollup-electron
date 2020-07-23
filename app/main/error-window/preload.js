const { shell, contextBridge, ipcRenderer } = require("electron");
const { onError } = require("./errorHandler");
const createIssue = require("./createIssue");

ipcRenderer.on("error", onError);

contextBridge.exposeInMainWorld("remote", {
  openIssue() {
    shell.openExternal(createIssue());
  },
  relaunchApp() {
    ipcRenderer.invoke("relaunchApp");
  },
  exitApp() {
    ipcRenderer.invoke("exitApp");
  }
});
