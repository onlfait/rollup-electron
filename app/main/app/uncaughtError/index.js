const onUncaughtError = require("./handler");

module.exports = function uncaughtError() {
  process.on("uncaughtException", (error, origin) => {
    onUncaughtError({ error, origin });
  });
  process.on("unhandledRejection", reason => {
    const error = typeof reason === "string" ? new Error(reason) : reason;
    onUncaughtError({ error, origin: "unhandledRejection" });
  });
};
