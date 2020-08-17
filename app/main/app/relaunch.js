const { app } = require("electron");
const exit = require("./exit");

module.exports = function relaunch(exitCode = 0) {
  app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) });
  exit(exitCode);
};
