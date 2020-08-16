const { ipcRenderer } = require("electron");

const api = {
  get: (...args) => ipcRenderer.invoke("remote.get", ...args),
  call: (...args) => ipcRenderer.invoke("remote.call", ...args)
};

module.exports = { api };
