const { BrowserWindow } = require("electron");
const quit = require("./quit");

function log(...args) {
  // eslint-disable-next-line
  console.log(...args);
}

log("Livereload enabled");

let firstBundle = true;

process.on("message", msg => {
  if (msg === "rollup.end") {
    if (firstBundle) {
      firstBundle = false;
      return;
    }
    const windows = BrowserWindow.getAllWindows();
    log(`Reloading ${windows.length} windows...`);
    windows.forEach(win => {
      log(`↻ Window #${win.id}`, win.getTitle());
      win.webContents.reloadIgnoringCache();
    });
  } else if (msg === "exit") {
    quit();
  }
});
