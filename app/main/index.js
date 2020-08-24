const { app } = require("electron");
const appSecurity = require("./app/security");
const registerAppProtocol = require("./app/protocol");
const singleInstance = require("./app/singleInstance");
const createMainWindow = require("./windows/main/create");
const uncaughtError = require("./app/uncaughtError");
const ipcRegister = require("./ipc/register");
const createTray = require("./tray/create");
const config = require("./config");

const twitchClient = require("./twitch/client");
const { start: startOverlayServer } = require("./overlay");

if (config.isDev) {
  require("./app/livereload");
  require("electron-context-menu")();
}

registerAppProtocol();
singleInstance(createMainWindow);
appSecurity.preventRemoteEvents();

app.whenReady().then(() => {
  appSecurity.setPermissions(config.permissions);
  appSecurity.setWebContentsSecurity(config.webContentsSecurity);
  appSecurity.setContentSecurityPolicy(config.contentSecurityPolicy);
  twitchClient(config.twitchConfig);
  ipcRegister();
  uncaughtError();
  startOverlayServer();
  createTray(createMainWindow());
});
