const { app, BrowserWindow } = require("electron");
const { isDev } = require("./config");

if (isDev) {
  require("./livereload");
}

let win = null;

function createMainWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#fff"
  });

  const path = isDev ? "../../dist/rollup/dev" : "..";

  win.loadFile(`${path}/renderer/windows/main/index.html`);
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createMainWindow();
});
