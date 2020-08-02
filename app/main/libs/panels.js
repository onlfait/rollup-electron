const store = require("../stores/panels");

module.exports = {
  save(event, items) {
    store.set("items", items);
  },
  getAll() {
    return store.get("items", []);
  },
  setCurrentId(event, id) {
    return store.set("currentId", id);
  },
  getCurrentId() {
    return store.get("currentId", null);
  }
};
