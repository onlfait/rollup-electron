const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("remote", {
  get: (...args) => ipcRenderer.invoke("remote.get", ...args),
  call: (...args) => ipcRenderer.invoke("remote.call", ...args)
});
