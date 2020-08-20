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
  currentId: {
    set(id) {
      store.set("currentId", id);
    },
    get() {
      return store.get("currentId", null);
    }
  }
};
