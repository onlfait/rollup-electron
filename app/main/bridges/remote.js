const { ipcRenderer } = require("electron");

module.exports = {
  get: (...args) => ipcRenderer.invoke("remote.get", ...args),
  call: (...args) => ipcRenderer.invoke("remote.call", ...args)
};
