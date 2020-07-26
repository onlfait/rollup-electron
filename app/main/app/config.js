const { appConfig } = require("../../package");

const isDev = process.argv.includes("--dev");
const isDebug = process.argv.includes("--debug");

module.exports = {
  isDev,
  isDebug,
  darkMode: true,
  appName: appConfig.name,
  appIcon: appConfig.icon,
  hasDevTools: isDev || isDebug,
  livereload: { host: "localhost", port: 42042 },
  twitchConfig: {
    clientId: "imjraqfj76pwp3za7hagehonex3xph",
    forceVerify: false
  }
};
