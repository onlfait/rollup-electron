const { app } = require("electron");

const uncaughtError = require("./app/uncaughtError");
const registerAppProtocol = require("./app/protocol");
const createMainWindow = require("./main-window/create");
const createChatWindow = require("./twitch/chat-window/create");

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

twitchClient({ ...twitchConfig, darkMode });

registerAppProtocol();
preventRemoteEvents();

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
  createMainWindow();
  createChatWindow({ darkMode });
});
