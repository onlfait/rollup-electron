const createBrowserWindow = require("../../app/security/createBrowserWindow");
const { hasDevTools } = require("../../app/utils");

module.exports = function create({ darkMode = true } = {}) {
  const win = createBrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      devTools: hasDevTools
    }
  });

  win.loadURL("https://www.twitch.tv/embed/skarab42/chat?parent=localhost");
  hasDevTools && win.webContents.openDevTools();

  win.webContents.on("dom-ready", () => {
    const add = darkMode ? "dark" : "light";
    const remove = darkMode ? "light" : "dark";

    win.webContents.executeJavaScript(`
      const html = document.querySelector('html');
      html.classList.add('tw-root--theme-${add}');
      html.classList.remove('tw-root--theme-${remove}');
    `);
  });

  win.webContents.on("did-finish-load", () => {
    win.show();
  });
};
