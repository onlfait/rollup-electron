const createBrowserWindow = require("../../app/security/createBrowserWindow");
const { hasDevTools, appIcon } = require("../../app/config");
const getMainWindow = require("../../app/getMainWindow");
const createTitlebar = require("../../app/titlebar");
const getTheme = require("../getTheme");
const open = require("open");
const path = require("path");
const fs = require("fs");

const authBaseURL = "https://id.twitch.tv/oauth2/authorize?response_type=token";
const stylesCSS = fs.readFileSync(path.resolve(__dirname, "styles.css"));

function cancelButtonHook() {
  return `
    const btn = document.querySelector('.js-cancel');
    btn && btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.close();
    })
  `;
}

function externalLinkHook() {
  return `
    document.querySelectorAll('.footer-links a').forEach(a => {
      a.setAttribute('target', '_blank');
    });
  `;
}

module.exports = function create({ uri, onError, darkMode = true }) {
  const win = createBrowserWindow({
    width: 540,
    height: 480,
    show: false,
    modal: true,
    frame: false,
    parent: getMainWindow(),
    webPreferences: {
      devTools: hasDevTools
    }
  });

  win.loadURL(`${authBaseURL}&${uri}`);
  hasDevTools && win.webContents.openDevTools();
  createTitlebar({ win, darkMode, title: "Connexion - Twitch", icon: appIcon });

  win.webContents.on("before-input-event", (_, input) => {
    ["Esc", "Escape"].includes(input.key) && win.close();
  });

  win.webContents.on("dom-ready", () => {
    win.webContents.insertCSS(stylesCSS.toString());
    win.webContents.executeJavaScript(getTheme(darkMode));
    win.webContents.executeJavaScript(cancelButtonHook());
    win.webContents.executeJavaScript(externalLinkHook());
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
