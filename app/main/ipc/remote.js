const { appName } = require("../config");

module.exports = {
  app: {
    name: appName,
    darkMode: require("./remote/darkMode"),
    relaunchApp: require("./remote/relaunchApp"),
    uncaughtError: require("./remote/uncaughtError")
  }
};
