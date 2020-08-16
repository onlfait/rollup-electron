const { BrowserWindow } = require("electron");
const appStore = require("../../stores/app");

module.exports = {
  set(enable = true) {
    appStore.set("darkMode", enable);
    BrowserWindow.getAllWindows().forEach(win => {
      win.webContents.send("app.darkMode.set", enable);
    });
  },
  get() {
    return appStore.get("darkMode", true);
  }
};
