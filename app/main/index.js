const { app } = require("electron");
const { isDev, livereload } = require("./app/utils");
const registerAppProtocol = require("./app/protocol");
const createMainWindow = require("./main-window/create");

const preventRemoteEvents = require("./app/security/preventRemoteEvents");
const webContentsSecurity = require("./app/security/webContentsSecurity");
const setPermissions = require("./app/security/setPermissions");
const setCSP = require("./app/security/setCSP");

if (isDev) {
  require("./app/livereload")(livereload);
}

registerAppProtocol();
preventRemoteEvents();

app.whenReady().then(() => {
  setCSP({});
  setPermissions([]); // <- broken !?
  webContentsSecurity({
    newWindowOrigins: [],
    redirectOrigins: [],
    navigateOrigins: []
  });
  createMainWindow();
});
