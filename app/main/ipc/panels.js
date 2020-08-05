const store = require("../stores/panels");

module.exports = {
  set(event, key, value = null) {
    store.set(key, value);
  },
  get(event, key = null, defaultValue = null) {
    return key === null ? store.store : store.get(key, defaultValue);
  }
};
