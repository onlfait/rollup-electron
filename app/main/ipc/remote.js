const { appName } = require("../config");

module.exports = {
  app: {
    name: appName,
    darkMode: require("./remote/darkMode"),
    uncaughtError: require("./remote/uncaughtError")
  }
};
