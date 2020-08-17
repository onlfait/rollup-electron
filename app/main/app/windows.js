const { BrowserWindow } = require("electron");

function getAllWindows() {
  return BrowserWindow.getAllWindows();
}

function getWindowByName(name) {
  return getAllWindows().find(win => win.name === name);
}

function getMainWindow() {
  return getWindowByName("main");
}

module.exports = {
  getAllWindows,
  getWindowByName,
  getMainWindow
};
