const store = require("../../stores/deck");

module.exports = {
  panels: {
    set(enable) {
      store.set("panels", enable);
    },
    get() {
      return store.get("panels");
    }
  },
  currentId: {
    set(id) {
      store.set("currentId", id);
    },
    get() {
      return store.get("currentId");
    }
  }
};
