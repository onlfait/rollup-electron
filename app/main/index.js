const { app } = require("electron");
const { isDev, livereload } = require("./app/utils");
const registerAppProtocol = require("./app/protocol");
const createMainWindow = require("./main-window/create");

if (isDev) {
  require("./app/livereload")(livereload);
}

registerAppProtocol();

app.whenReady().then(createMainWindow);
