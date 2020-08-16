const { appName } = require("../config");

module.exports = {
  app: {
    name: appName,
    darkMode: require("./remote/darkMode")
  }
};
