const pkg = require("../package");
const { app } = require("electron");
const path = require("path");

const appName = pkg.appConfig.name;
const appIcon = pkg.appConfig.icon;

const twitchConfig = {
  clientId: "imjraqfj76pwp3za7hagehonex3xph",
  redirectURI: "http://localhost",
  forceVerify: true
};

const isDev = process.argv.includes("--dev");
const isDebug = process.argv.includes("--debug");

const appPath = app.getAppPath();
const userPath = app.getPath("userData");
const publicPath = path.resolve(userPath, "public");
const staticPath = path.resolve(__dirname, "../static");

const permissions = [];

const webContentsSecurity = {
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
};

const contentSecurityPolicy = {};

module.exports = {
  isDev,
  isDebug,
  appName,
  appIcon,
  appPath,
  userPath,
  publicPath,
  staticPath,
  permissions,
  twitchConfig,
  webContentsSecurity,
  contentSecurityPolicy
};
