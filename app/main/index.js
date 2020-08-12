const { app } = require("electron");

const registerAppProtocol = require("./app/protocol");

const createMainWindow = require("./windows/main/create");

const { isDev } = require("./config");

if (isDev) {
  require("./app/livereload");
}

registerAppProtocol();

app.whenReady().then(() => {
  createMainWindow();
});
