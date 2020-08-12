const { app } = require("electron");

const appSecurity = require("./app/security");
const registerAppProtocol = require("./app/protocol");
const singleInstance = require("./app/singleInstance");
const createMainWindow = require("./windows/main/create");

const config = require("./config");

if (config.isDev) {
  require("./app/livereload");
}

registerAppProtocol();
singleInstance(createMainWindow);
appSecurity.preventRemoteEvents();

app.whenReady().then(() => {
  appSecurity.setPermissions(config.permissions);
  appSecurity.setWebContentsSecurity(config.webContentsSecurity);
  appSecurity.setContentSecurityPolicy(config.contentSecurityPolicy);
  createMainWindow();
});
