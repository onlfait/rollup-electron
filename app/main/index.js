const { app } = require("electron");

const { isDev, livereload } = require("./app/utils");
const registerAppProtocol = require("./app/protocol");
const createMainWindow = require("./main-window/create");

const preventRemoteEvents = require("./app/security/preventRemoteEvents");
const webContentsSecurity = require("./app/security/webContentsSecurity");
const setPermissions = require("./app/security/setPermissions");
const setCSP = require("./app/security/setCSP");

const uncaughtError = require("./app/uncaughtError");
const twitchClient = require("./twitch/client");

if (isDev) {
  require("./app/livereload")(livereload);
}

require("./ipc");

twitchClient({
  clientId: "imjraqfj76pwp3za7hagehonex3xph",
  forceVerify: true
});

registerAppProtocol();
preventRemoteEvents();

app.whenReady().then(() => {
  setCSP({});
  setPermissions(["notifications"]);
  webContentsSecurity({
    newWindowOrigins: [],
    redirectOrigins: ["http://localhost"],
    navigateOrigins: ["http://localhost"]
  });
  !isDev && uncaughtError();
  createMainWindow();
});
