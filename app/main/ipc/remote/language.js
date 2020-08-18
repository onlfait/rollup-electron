const appStore = require("../../stores/app");

module.exports = {
  set(language) {
    appStore.set("language", language);
  },
  get() {
    return appStore.get("language", "en");
  }
};
