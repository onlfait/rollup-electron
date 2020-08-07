const { appConfig } = require("../package");
const { app } = require("electron");
const path = require("path");

const isDev = process.argv.includes("--dev");
const isDebug = process.argv.includes("--debug");

const appPath = app.getAppPath();
const userPath = app.getPath("userData");
const publicPath = path.resolve(userPath, "public");
const staticPath = path.resolve(__dirname, "../static");

module.exports = {
  isDev,
  isDebug,
  appPath,
  userPath,
  publicPath,
  staticPath,
  appName: appConfig.name,
  appIcon: appConfig.icon,
  hasDevTools: isDev || isDebug,
  livereload: { host: "localhost", port: 42042 },
  twitchConfig: {
    clientId: "imjraqfj76pwp3za7hagehonex3xph",
    forceVerify: false
  },
  obsConfig: {
    password: "$up3rSecretP@ssw0rd",
    host: "localhost",
    port: 4444
  }
};
