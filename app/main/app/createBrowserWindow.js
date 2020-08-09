const createSecureBrowserWindow = require("../security/createBrowserWindow");
const storeWindowBounds = require("./storeWindowBounds");
const hideWinOnClose = require("./hideWinOnClose");
const createTitlebar = require("./titlebar");

const { appName, appIcon } = require("../config");

module.exports = function createBrowserWindow({
  hideOnClose = false,
  storeBounds = false,
  titlebar = false,
  ...settings
} = {}) {
  const win = createSecureBrowserWindow(settings);

  if (hideOnClose) {
    hideWinOnClose(win);
  }

  if (storeBounds) {
    const name = settings.title || "default";
    storeWindowBounds({ win, name });
  }

  if (titlebar) {
    createTitlebar({ win, title: appName, icon: appIcon });
  }

  return win;
};
