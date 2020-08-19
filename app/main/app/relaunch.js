const { app } = require("electron");
const exit = require("./exit");
const { isDev } = require("../config");

module.exports = function relaunch(exitCode = 42) {
  if (!isDev) {
    app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) });
  }
  exit(exitCode);
};
