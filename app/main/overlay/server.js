const path = require("path");
const sirv = require("sirv");
const fs = require("fs-extra");
const polka = require("polka");
const socket = require("socket.io");

const publicPath = path.normalize(process.argv.pop());
const overlayPath = path.resolve(__dirname, "public");

const port = 4242;

let io = null;

fs.ensureDirSync(publicPath);

const server = polka()
  .use(sirv(overlayPath), { dev: true }) // no cache
  .use(sirv(publicPath), { dev: true }) // no cache
  .listen(port, err => {
    if (err) throw err;
    io = socket(server.server);
    // eslint-disable-next-line
    console.log(`> Running on localhost:${port}`);
  });

process.on("message", message => {
  io.emit(message.type, message[message.type]);
});
