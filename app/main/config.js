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
  staticPath
};
