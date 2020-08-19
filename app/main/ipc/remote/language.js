const store = require("../../stores/app");

module.exports = {
  set(language) {
    store.set("language", language);
  },
  get() {
    return store.get("language", "en");
  }
};
