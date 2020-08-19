const { BrowserWindow } = require("electron");
const store = require("../../stores/app");

module.exports = {
  set(enable = true) {
    store.set("darkMode", enable);
    BrowserWindow.getAllWindows().forEach(win => {
      win.webContents.send("app.darkMode.set", enable);
    });
  },
  get() {
    return store.get("darkMode", true);
  }
};
