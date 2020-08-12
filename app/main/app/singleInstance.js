const { app } = require("electron");
const quit = require("./quit");

module.exports = function singleInstance(onSecondInstance) {
  app.requestSingleInstanceLock()
    ? app.on("second-instance", onSecondInstance)
    : quit();
};
