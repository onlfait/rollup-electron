const { ipcRenderer } = require("electron");
const remote = require("./remote");

async function connect() {
  return await remote.api.call("obs.connect");
}

async function disconnect() {
  return await remote.api.call("obs.disconnect");
}

async function getStatus() {
  return await remote.api.call("obs.getStatus");
}

function on(type, callback) {
  ipcRenderer.on(`obs.${type}`, callback);
}

const autoConnectAtStartup = {
  async set(enable) {
    await remote.api.call("obs.autoConnectAtStartup.set", enable);
  },
  async get() {
    return await remote.api.call("obs.autoConnectAtStartup.get");
  }
};

function send(...args) {
  return remote.api.call("obs.send", ...args);
}

module.exports = {
  api: {
    on,
    send,
    connect,
    disconnect,
    getStatus,
    autoConnectAtStartup
  }
};
