const { app } = require("electron");

module.exports = function hideWinOnClose(win) {
  win.on("close", event => {
    if (!app.__isQuitting) {
      event.preventDefault();
      win.hide();
    }
  });
};
