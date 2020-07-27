const { app } = require("electron");

const uncaughtError = require("./app/uncaughtError");
const registerAppProtocol = require("./app/protocol");
const singleInstance = require("./app/singleInstance");
const createMainWindow = require("./windows/main/create");
const createTray = require("./tray/create");

const preventRemoteEvents = require("./app/security/preventRemoteEvents");
const webContentsSecurity = require("./app/security/webContentsSecurity");
const setPermissions = require("./app/security/setPermissions");
const setCSP = require("./app/security/setCSP");

const twitchClient = require("./twitch/client");

const { isDev, livereload, darkMode, twitchConfig } = require("./app/config");

if (isDev) {
  require("./app/livereload")(livereload);
}

require("./ipc");

registerAppProtocol();
preventRemoteEvents();

singleInstance(() => createMainWindow({ darkMode }));

twitchClient({ ...twitchConfig, darkMode });

app.whenReady().then(() => {
  setCSP({});
  setPermissions(["notifications"]);
  webContentsSecurity({
    redirectOrigins: [
      "http://localhost",
      "https://twitch.tv",
      "https://id.twitch.tv",
      "https://www.twitch.tv"
    ],
    navigateOrigins: [
      "http://localhost",
      "https://www.twitch.tv",
      "https://id.twitch.tv"
    ],
    newWindowOrigins: ["https://www.twitch.tv", "https://help.twitch.tv"]
  });
  !isDev && uncaughtError();
  const mainWin = createMainWindow({ darkMode });
  createTray({ mainWin });
});
