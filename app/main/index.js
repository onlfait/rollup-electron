const { app } = require("electron");

const { isDev, livereload } = require("./app/utils");
const registerAppProtocol = require("./app/protocol");
const createMainWindow = require("./main-window/create");

const preventRemoteEvents = require("./app/security/preventRemoteEvents");
const webContentsSecurity = require("./app/security/webContentsSecurity");
const setPermissions = require("./app/security/setPermissions");
const setCSP = require("./app/security/setCSP");

const uncaughtError = require("./app/uncaughtError");

if (isDev) {
  require("./app/livereload")(livereload);
}

require("./ipc");

registerAppProtocol();
preventRemoteEvents();

app.whenReady().then(() => {
  setCSP({});
  setPermissions(["notifications"]);
  webContentsSecurity({
    newWindowOrigins: [],
    redirectOrigins: [],
    navigateOrigins: []
  });
  !isDev && uncaughtError();
  createMainWindow();
});
