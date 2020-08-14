const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("remote", {
  call: (...args) => ipcRenderer.invoke("remote", ...args)
});
