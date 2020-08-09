const { BrowserWindow } = require("electron");
const webPreferences = require("./webPreferences");

module.exports = function createBrowserWindow(settings = {}) {
  const userWebPreferences = settings.webPreferences || {};
  return new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#fff",
    ...settings,
    webPreferences: {
      ...userWebPreferences,
      ...webPreferences
    }
  });
};
