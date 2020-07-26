const { app, protocol } = require("electron");
const { isDev } = require("./config");
const path = require("path");
const fs = require("fs");

const config = {
  scheme: "app",
  privileges: {
    secure: true,
    standard: true
  }
};

const rendererPath = path.resolve(
  __dirname,
  "../..",
  isDev && "../dist/dev/",
  "renderer"
);
const staticPath = path.resolve(__dirname, "../../static");

const mimeTypes = {
  ".js": { mimeType: "text/javascript", charset: "utf-8" },
  ".html": { mimeType: "text/html", charset: "utf-8" },
  ".css": { mimeType: "text/css", charset: "utf-8" },
  ".ico": { mimeType: "image/x-icon", charset: "utf-8" }
};

function error(message) {
  if (!(message instanceof Error)) {
    message = new Error(message);
    message.name = "AppProtocolError";
  }
  // eslint-disable-next-line
  console.error(">", message);
}

function getMimeType(filename) {
  return mimeTypes[path.extname(filename).toLowerCase()] || null;
}

function requestHandler(req, next) {
  const url = new URL(req.url);

  if (url.hostname !== "renderer") {
    return error(`Invalid hostname "${url.hostname}", expected "renderer".`);
  }

  const pathname = url.pathname;
  const mimetype = getMimeType(pathname);

  if (!mimetype) {
    return error(`Unsupported mimetype for "${pathname}".`);
  }

  let readPath = path.join(rendererPath, pathname);

  const pathParts = pathname.replace(/^\/|\/$/, "").split("/");
  const pathChunk = pathParts.shift();

  if (pathChunk === "static") {
    readPath = path.join(staticPath, ...pathParts);
  }

  fs.readFile(readPath, (err, data) => {
    err ? error(err) : next({ data, ...mimetype });
  });
}

module.exports = function registerBufferProtocol() {
  protocol.registerSchemesAsPrivileged([config]);

  app.whenReady().then(() => {
    protocol.registerBufferProtocol(config.scheme, requestHandler);
  });
};
