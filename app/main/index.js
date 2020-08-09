const { app } = require("electron");

const registerAppProtocol = require("./app/protocol");
const singleInstance = require("./app/singleInstance");

const setWebContentsSecurity = require("./security/setWebContentsSecurity");
const preventRemoteEvents = require("./security/preventRemoteEvents");
const setPermissions = require("./security/setPermissions");
const setContentSecurityPolicy = require("./security/setContentSecurityPolicy");

const createMainWindow = require("./windows/main/create");
const createTray = require("./tray/create");

const {
  isDev,
  livereload,
  permissions,
  webContentsSecurity,
  contentSecurityPolicy
} = require("./config");

singleInstance(() => createMainWindow());

if (isDev) {
  require("./livereload")(livereload);
}

registerAppProtocol();
preventRemoteEvents();

app.whenReady().then(() => {
  setPermissions(permissions);
  setWebContentsSecurity(webContentsSecurity);
  setContentSecurityPolicy(contentSecurityPolicy);
  const mainWin = createMainWindow();
  createTray({ mainWin });
});
