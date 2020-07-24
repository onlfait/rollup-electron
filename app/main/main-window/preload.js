const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("remote", {
  uncaughtError(error) {
    ipcRenderer.invoke("uncaughtError", error);
  },
  twitch(api, args = []) {
    return ipcRenderer.invoke("twitch", { api, args });
  }
});
