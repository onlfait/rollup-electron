const createBrowserWindow = require("../../app/security/createBrowserWindow");
const { hasDevTools } = require("../../app/config");
const createTitlebar = require("../../app/titlebar");
const { BrowserWindow } = require("electron");
const open = require("open");
const path = require("path");
const fs = require("fs");

const authBaseURL = "https://id.twitch.tv/oauth2/authorize?response_type=token";
const stylesCSS = fs.readFileSync(path.resolve(__dirname, "styles.css"));

function getThemeJS(darkMode) {
  const add = darkMode ? "dark" : "light";
  const remove = darkMode ? "light" : "dark";

  return `
      const html = document.querySelector('html');
      const body = document.querySelector('body');
      const root = document.querySelector('#root');
      const authorize = document.querySelector('.authorize')
      const titlebar = document.querySelector('.app-titlebar')
      html.classList.remove('theme--${remove}');
      html.classList.remove('tw-root--theme-${remove}');
      html.classList.add('theme--${add}');
      html.classList.add('tw-root--theme-${add}');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const btn = document.querySelector('.js-cancel');
      btn && btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.close();
      })
      document.querySelectorAll('.footer-links a').forEach(a => {
        a.setAttribute('target', '_blank');
      });
      if (root) {
        root.firstElementChild.classList.remove('tw-top-0');
        root.firstElementChild.style.top = "30px";
      }
      if (authorize) {
        body.style.paddingTop = "30px;";
        titlebar.style.position = "fixed";
        titlebar.style.right = "0px";
        titlebar.style.left = "0px";
      }
  `;
}

module.exports = function create({ uri, onError, darkMode = true }) {
  const [parent] = BrowserWindow.getAllWindows();
  const win = createBrowserWindow({
    parent,
    width: 540,
    height: 600,
    show: false,
    modal: true,
    frame: false,
    webPreferences: {
      devTools: hasDevTools
    }
  });

  win.loadURL(`${authBaseURL}&${uri}`);
  hasDevTools && win.webContents.openDevTools();
  createTitlebar({ win, darkMode, title: "Connexion - Twitch" });

  win.webContents.on("before-input-event", (_, input) => {
    ["Esc", "Escape"].includes(input.key) && win.close();
  });

  win.webContents.on("dom-ready", () => {
    win.webContents.insertCSS(stylesCSS.toString());
    win.webContents.executeJavaScript(getThemeJS(darkMode));
  });

  win.webContents.on("did-navigate", (event, url, httpResponseCode) => {
    if (httpResponseCode === 404) {
      onError("404 - Page not found");
    } else if (url.startsWith(authBaseURL) && httpResponseCode === 400) {
      win.webContents
        .executeJavaScript("document.body.innerText", true)
        .then(json => {
          let message = null;
          try {
            message = JSON.parse(json).message;
          } catch (error) {
            message = error.message;
          }
          onError(message);
        });
    } else if (httpResponseCode !== 200) {
      onError(`${httpResponseCode} - Undefined error`);
    }

    win.webContents
      .executeJavaScript("typeof redirectPage === 'function'", true)
      .then(error => {
        error && onError("Invalid auth URL");
      });
  });

  win.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    open(url);
  });

  win.webContents.on("did-finish-load", () => {
    win.show();
  });

  return win;
};
