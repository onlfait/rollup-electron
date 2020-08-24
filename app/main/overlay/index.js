const { fork } = require("child_process");
const path = require("path");
const { userPath } = require("../config"); // TODO get from process

let server = null;

const publicPath = path.resolve(userPath, "public/media");

module.exports = {
  start() {
    if (server) return server;

    const argv = [...process.argv, "--public", publicPath];
    server = fork(path.resolve(__dirname, "server.js"), argv);

    server.on("error", err => {
      // eslint-disable-next-line
      console.error("Overlay error:", err.stack);
    });

    server.on("exit", code => {
      // eslint-disable-next-line
      console.info(`Overlay exited (code: ${code})`);
      server = null;
    });

    return server;
  },
  send(...args) {
    server && server.send(...args);
  },
  stop() {
    if (server) {
      server.kill();
      server = null;
    }
  }
};
