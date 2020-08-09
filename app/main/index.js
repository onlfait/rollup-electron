const { app } = require("electron");

const registerAppProtocol = require("./app/protocol");
const singleInstance = require("./app/singleInstance");

const preventRemoteEvents = require("./security/preventRemoteEvents");
const webContentsSecurity = require("./security/webContentsSecurity");
const setPermissions = require("./security/setPermissions");
const setCSP = require("./security/setCSP");

const createMainWindow = require("./windows/main/create");
const createTray = require("./tray/create");

const { isDev, livereload } = require("./config");

if (isDev) {
  require("./livereload")(livereload);
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
