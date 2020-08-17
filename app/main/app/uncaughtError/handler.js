const { app } = require("electron");
const { dirname } = require("path");

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
    error: {
      origin,
      name: error.name,
      message: error.message,
      stack: error.stack,
      cleanStack: cleanStack(error.stack)
    }
  });
};
