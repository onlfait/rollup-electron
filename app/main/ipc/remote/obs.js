const store = require("../../stores/obs");
const { connect, disconnect } = require("../../obs");

module.exports = {
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
