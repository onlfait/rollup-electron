const uncaughtError = require("./handler");

module.exports = (event, payload) => uncaughtError(payload);
