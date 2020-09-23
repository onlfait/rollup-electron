const { isDev, appPath, publicPath, staticPath } = require("../config");
const { app, protocol } = require("electron");
const path = require("path");
// const fs = require("fs");

const config = {
  scheme: "app",
  privileges: {
    secure: true,
    standard: true,
  },
};

const rendererPath = isDev
  ? path.resolve(__dirname, "../../../dist/rollup/dev/renderer")
  : path.resolve(appPath, "renderer");

const mimeTypes = {
  ".txt": { mimeType: "text/plain", charset: "utf-8" },
  ".js": { mimeType: "text/javascript", charset: "utf-8" },
  ".html": { mimeType: "text/html", charset: "utf-8" },
  ".css": { mimeType: "text/css", charset: "utf-8" },
  ".ico": { mimeType: "image/x-icon", charset: "utf-8" },
  ".gif": { mimeType: "image/gif", charset: "utf-8" },
  ".png": { mimeType: "image/png", charset: "utf-8" },
  ".jpg": { mimeType: "image/jpeg", charset: "utf-8" },
  ".jpeg": { mimeType: "image/jpeg", charset: "utf-8" },
  ".mp3": { mimeType: "audio/mpeg", charset: "utf-8" },
  ".ogg": { mimeType: "audio/ogg", charset: "utf-8" },
  ".mp4": { mimeType: "video/mpeg", charset: "utf-8" },
  ".ogv": { mimeType: "video/ogv", charset: "utf-8" },
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
  } else if (pathChunk === "public") {
    readPath = path.join(publicPath, ...pathParts);
  }

  next(readPath);
  // fs.readFile(readPath, (err, data) => {
  //   console.log(data);
  //   err ? error(err) : next({ data, ...mimetype });
  // });
}

module.exports = function registerBufferProtocol() {
  protocol.registerSchemesAsPrivileged([config]);

  app.whenReady().then(() => {
    protocol.registerFileProtocol(config.scheme, requestHandler);
  });
};
