const createBrowserWindow = require("../../app/security/createBrowserWindow");
const createTitlebar = require("../../app/titlebar");

const { hasDevTools } = require("../../app/config");

module.exports = function create({ darkMode = true } = {}) {
  const win = createBrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    webPreferences: {
      devTools: hasDevTools
    }
  });

  createTitlebar({ win, darkMode, title: "Chat - Twitch" });

  win.loadURL("https://www.twitch.tv/embed/skarab42/chat?parent=localhost");
  hasDevTools && win.webContents.openDevTools();

  win.webContents.on("dom-ready", () => {
    const add = darkMode ? "dark" : "light";
    const remove = darkMode ? "light" : "dark";

    win.webContents.executeJavaScript(`
      const html = document.querySelector('html');
      const root = document.querySelector('#root');
      html.classList.add('tw-root--theme-${add}');
      html.classList.remove('tw-root--theme-${remove}');
      root.firstElementChild.classList.remove('tw-top-0');
      root.firstElementChild.style.top = "30px";
    `);
  });

  win.webContents.on("did-finish-load", () => {
    win.show();
  });
};
