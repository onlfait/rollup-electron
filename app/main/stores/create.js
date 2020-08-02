const Store = require("electron-store");
const { app } = require("electron");
const path = require("path");

const stores = new Map();

module.exports = function create({ name, dir = "stores", ...options }) {
  if (stores.has(name)) {
    return stores.get(name);
  }

  const cwd = path.resolve(app.getPath("userData"), dir);
  const store = new Store({ ...options, name, cwd });

  stores.set(name, store);

  return store;
};
