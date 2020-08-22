const store = require("../../stores/deck");

module.exports = {
  panels: {
    set(items) {
      store.set("panels", items);
    },
    get() {
      return store.get("panels", []);
    }
  },
  currentPanelId: {
    set(id) {
      store.set("currentPanelId", id);
    },
    get() {
      return store.get("currentPanelId", null);
    }
  }
};
