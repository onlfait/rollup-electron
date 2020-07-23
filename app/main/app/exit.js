const { app } = require("electron");

module.exports = function exit(code = 0) {
  app.exit(code);
};
