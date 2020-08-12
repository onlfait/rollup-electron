const { app } = require("electron");

// Prevent loading any module via remote;
// you shouldn't be using remote at all, though
// https://electronjs.org/docs/tutorial/security#16-filter-the-remote-module
// https://github.com/reZach/secure-electron-template/blob/master/app/electron/main.js#L232
module.exports = function preventRemoteEvents() {
  app.on("remote-require", event => event.preventDefault());
  app.on("remote-get-global", event => event.preventDefault());
  app.on("remote-get-builtin", event => event.preventDefault());
  app.on("remote-get-current-window", event => event.preventDefault());
  app.on("remote-get-current-web-contents", event => event.preventDefault());
};
