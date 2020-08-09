const { appConfig } = require("../package");
const { app } = require("electron");
const path = require("path");

const isDev = process.argv.includes("--dev");
const isDebug = process.argv.includes("--debug");

const appPath = app.getAppPath();
const userPath = app.getPath("userData");
const publicPath = path.resolve(userPath, "public");
const staticPath = path.resolve(__dirname, "../static");

const permissions = [];

const webContentsSecurity = {
  redirectOrigins: [],
  navigateOrigins: [],
  newWindowOrigins: []
};

const contentSecurityPolicy = {};

module.exports = {
  isDev,
  isDebug,
  appPath,
  userPath,
  publicPath,
  staticPath,
  permissions,
  webContentsSecurity,
  contentSecurityPolicy,
  appName: appConfig.name,
  appIcon: appConfig.icon,
  hasDevTools: isDev || isDebug,
  livereload: { host: "localhost", port: 42042 }
};
