const { BrowserWindow } = require("electron");

function log(...args) {
  // eslint-disable-next-line
  console.log(...args);
}

log("Livereload enabled");

process.on("message", msg => {
  if (msg === "rollup.end") {
    const windows = BrowserWindow.getAllWindows();
    log(`Reloading ${windows.length} windows...`);
    windows.forEach(win => {
      log(`↻ Window #${win.id}`, win.getTitle());
      win.webContents.reloadIgnoringCache();
    });
  }
});
