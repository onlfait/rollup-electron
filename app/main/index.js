const { app } = require("electron");

const registerAppProtocol = require("./app/protocol");
const singleInstance = require("./app/singleInstance");
const createMainWindow = require("./windows/main/create");
const createTray = require("./tray/create");

const preventRemoteEvents = require("./app/security/preventRemoteEvents");
const webContentsSecurity = require("./app/security/webContentsSecurity");
const setPermissions = require("./app/security/setPermissions");
const setCSP = require("./app/security/setCSP");

const { isDev, livereload } = require("./config");

if (isDev) {
  require("./app/livereload")(livereload);
}

registerAppProtocol();
preventRemoteEvents();

singleInstance(() => createMainWindow());

app.whenReady().then(() => {
  setCSP({});
  setPermissions([]);
  webContentsSecurity({
    redirectOrigins: [],
    navigateOrigins: [],
    newWindowOrigins: []
  });
  const mainWin = createMainWindow();
  createTray({ mainWin });
});
