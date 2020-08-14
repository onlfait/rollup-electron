const appStore = require("./stores/app");
const { ipcMain } = require("electron");
const dotProp = require("dot-prop");

const remote = {
  app: {
    setDarkMode(enable = true) {
      appStore.set("darkMode", enable);
    }
  }
};

ipcMain.handle("remote", (event, endpoint, ...args) => {
  if (typeof endpoint !== "string") {
    throw new Error("Remote endpoint must be string");
  }

  const func = dotProp.get(remote, endpoint, null);

  if (!func) {
    throw new Error(`Undefined remote endpoint: ${endpoint}`);
  }

  if (typeof func !== "function") {
    throw new Error(`Remote endpoint must be callable: ${endpoint}`);
  }

  return func(...args);
});
