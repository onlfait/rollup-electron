const { BrowserWindow } = require("electron");

module.exports = function getMainWindow() {
  const allWindows = BrowserWindow.getAllWindows();
  return allWindows.find(w => w.getTitle() === "MainWindow") || allWindows[0];
};
