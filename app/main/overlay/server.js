const path = require("path");
const sirv = require("sirv");
const fs = require("fs-extra");
const polka = require("polka");
const socket = require("socket.io");

const publicPath = path.normalize(process.argv.pop());
const overlayPath = path.resolve(__dirname, "public");

const port = 4242;

let io = null;
let sockets = [];

function getSocketById(id) {
  return sockets.find(socket => socket.id === id);
}

function removeSocketById(id) {
  sockets = sockets.filter(socket => socket.id !== id);
}

function addSocket(socket) {
  if (!getSocketById(socket.id)) {
    sockets.push(socket);
  }
}

function socketEmitPromise(message, socket) {
  return new Promise(resolve => {
    socket.emit(message.type, message[message.type], resolve);
  });
}

function sendMessage(message) {
  const promise = socketEmitPromise.bind(null, message);
  const promises = sockets.map(promise);
  return Promise.all(promises);
}

fs.ensureDirSync(publicPath);

const server = polka()
  .use(sirv(overlayPath), { dev: true }) // no cache
  .use(sirv(publicPath), { dev: true }) // no cache
  .listen(port, err => {
    if (err) throw err;
    io = socket(server.server);
    // eslint-disable-next-line
    console.log(`Running on localhost:${port}`);

    io.sockets.on("connection", socket => {
      console.log(`New client connection (id: ${socket.id})`);
      addSocket(socket);
      socket.on("disconnect", () => {
        console.log(`Client disconnected (id: ${socket.id})`);
        removeSocketById(socket.id);
      });
    });

  });

process.on("message", message => {
  sendMessage(message).then(results => {
    console.log("results:", results);
    process.send(message);
  });
});
