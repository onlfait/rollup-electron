const store = require("../../stores/obs");
const { connect, disconnect, getStatus, send } = require("../../obs");

module.exports = {
  send,
  getStatus,
  connect,
  disconnect,
  autoConnectAtStartup: {
    set(enable) {
      store.set("autoConnectAtStartup", enable);
    },
    get() {
      return store.get("autoConnectAtStartup");
    }
  }
};
