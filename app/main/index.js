const { app, BrowserWindow } = require("electron");

const registerAppProtocol = require("./app/protocol");

const { isDev } = require("./config");

if (isDev) {
  require("./app/livereload");
}

let win = null;

function createMainWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#fff"
  });

  win.loadURL("app://renderer/windows/main/index.html");
  win.webContents.openDevTools();
}

registerAppProtocol();

app.whenReady().then(() => {
  createMainWindow();
});
