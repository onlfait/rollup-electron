const { publicPath } = require("../config");
const store = require("../store");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  saveGridItems(event, items) {
    store.set("gridItems", items);
  },
  getGridItems() {
    return store.get("gridItems", []);
  },
  async addGridIcon(event, { name, path: source }) {
    name = name.replace(/[^a-z0-9_.]+/gi, "_");
    const target = path.resolve(publicPath, "grid-icons", name);
    await fs.copy(source, target);
    return name;
  }
};
