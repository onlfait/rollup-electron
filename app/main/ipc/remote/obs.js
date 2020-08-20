const store = require("../../stores/obs");
const { connect, disconnect, getStatus } = require("../../obs");

module.exports = {
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
