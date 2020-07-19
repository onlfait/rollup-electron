const { BrowserWindow } = require("electron");

module.exports = function create() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadURL(`${__APP_HOST__}/main-window/index.html`);

  return win;
};
