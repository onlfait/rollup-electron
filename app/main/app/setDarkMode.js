const { BrowserWindow } = require("electron");

module.exports = function setDarkMode(darkMode) {
  BrowserWindow.getAllWindows().forEach(win => {
    win.webContents.executeJavaScript(
      `setDarkMode(${darkMode ? "true" : "false"})`
    );
  });
};
