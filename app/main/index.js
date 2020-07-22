const { app } = require("electron");
const { isDev, livereload } = require("./app/utils");
const registerAppProtocol = require("./app/protocol");
const createMainWindow = require("./main-window/create");

const preventRemoteEvents = require("./app/security/preventRemoteEvents");
const setPermissions = require("./app/security/setPermissions");

if (isDev) {
  require("./app/livereload")(livereload);
}

registerAppProtocol();
preventRemoteEvents();

app.whenReady().then(() => {
  setPermissions();
  createMainWindow();
});
