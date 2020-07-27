const { dirname } = require("path");
const { app } = require("electron");

const createErrorWindow = require("../../windows/error/create");

function cleanPath(path) {
  return path.trim().replace(dirname(app.getAppPath()), "");
}

function cleanStack(stack) {
  return stack
    .split("\n")
    .slice(1)
    .map(cleanPath)
    .join("\n");
}

module.exports = function handler({ error, origin } = {}) {
  createErrorWindow({
    origin,
    name: error.name,
    message: error.message,
    stack: cleanStack(error.stack)
  });
};
