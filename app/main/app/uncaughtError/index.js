const onUncaughtError = require("./handler");

module.exports = function uncaughtError(settings = {}) {
  process.on("uncaughtException", (error, origin) => {
    onUncaughtError({ ...settings, error, origin });
  });
  process.on("unhandledRejection", reason => {
    const error = typeof reason === "string" ? new Error(reason) : reason;
    onUncaughtError({ ...settings, error, origin: "unhandledRejection" });
  });
};
