const onUncaughtError = require("../../app/uncaughtError/handler");

module.exports = function(payload) {
  onUncaughtError(payload);
};
