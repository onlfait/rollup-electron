const { appName } = require("../../package");
const path = require("path");

const isDev = process.argv.includes("--dev");
const isDebug = process.argv.includes("--debug");

module.exports = {
  isDev,
  isDebug,
  appName,
  darkMode: true,
  appIcon: path.resolve(__dirname, "../../static/icon.ico"),
  hasDevTools: isDev || isDebug,
  livereload: { host: "localhost", port: 42042 },
  twitchConfig: {
    clientId: "imjraqfj76pwp3za7hagehonex3xph",
    forceVerify: false
  }
};
