const { publicPath } = require("../config");
const store = require("../stores/panels");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  set(event, key, value = null) {
    store.set(key, value);
  },
  get(event, key = null, defaultValue = null) {
    return key === null ? store.store : store.get(key, defaultValue);
  },
  async addGridIcon(event, { name, path: source }) {
    name = name.replace(/[^a-z0-9_.]+/gi, "_");
    const target = path.resolve(publicPath, "grid-icons", name);
    await fs.copy(source, target);
    return name;
  }
};
