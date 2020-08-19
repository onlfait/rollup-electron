const { ipcRenderer } = require("electron");
const remote = require("./remote");

async function connect() {
  return await remote.api.call("obs.connect");
}

async function disconnect() {
  return await remote.api.call("obs.disconnect");
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

module.exports = { api: { connect, disconnect, on, autoConnectAtStartup } };
