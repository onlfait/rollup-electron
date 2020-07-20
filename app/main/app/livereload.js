const { BrowserWindow } = require("electron");
const WebSocket = require("ws");

let ws = null;

module.exports = function livereload({
  host = "localhost",
  port = 42042
} = {}) {
  if (ws) return;

  ws = new WebSocket(`ws://${host}:${port}`);

  ws.on("message", message => {
    if (message === "reload") {
      BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.reloadIgnoringCache();
      });
    }
  });
};
