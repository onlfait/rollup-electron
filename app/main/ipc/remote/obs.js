const appStore = require("../../stores/obs");
const { connect, disconnect } = require("../../obs");

module.exports = {
  connect,
  disconnect,
  autoConnectAtStartup: {
    set(enable) {
      appStore.set("autoConnectAtStartup", enable);
    },
    get() {
      return appStore.get("autoConnectAtStartup");
    }
  }
};
