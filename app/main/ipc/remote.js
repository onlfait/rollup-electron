const { appName } = require("../config");

module.exports = {
  app: {
    name: appName,
    darkMode: require("./remote/darkMode"),
    language: require("./remote/language"),
    relaunchApp: require("./remote/relaunchApp"),
    uncaughtError: require("./remote/uncaughtError")
  }
};
