const polka = require("polka");
const sirv = require("./mw/sirv");
const media = require("./mw/media");
const socket = require("socket.io");

const port = 4242;

let io = null;

const server = polka()
  .use(sirv)
  .use(media)
  .listen(port, err => {
    if (err) throw err;
    io = socket(server.server);
    // eslint-disable-next-line
    console.log(`> Running on localhost:${port}`);
  });

process.on("message", message => {
  io.emit(message.type, message.data);
});
