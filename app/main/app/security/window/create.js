const { BrowserWindow } = require("electron");
const webPreferences = require("./webPreferences");

module.exports = function createSecureWindow(settings = {}) {
  const userWebPreferences = settings.webPreferences || {};
  return new BrowserWindow({
    ...settings,
    webPreferences: {
      ...userWebPreferences,
      ...webPreferences
    }
  });
};
