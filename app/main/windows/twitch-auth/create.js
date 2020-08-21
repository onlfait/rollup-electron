const createWindow = require("../../app/window/create");
const { getMainWindow } = require("../../app/windows");
const path = require("path");
const fs = require("fs-extra");

const open = require("open");

const authBaseURL = "https://id.twitch.tv/oauth2/authorize?response_type=token";

const stylesPath = path.resolve(__dirname, "styles.css");
const styles = fs.readFileSync(stylesPath).toString();

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

module.exports = function create({ uri, onError }) {
  const win = createWindow({
    name: "twitch-auth",
    show: true,
    width: 540,
    height: 480,
    preload: true,
    parent: getMainWindow(),
    loadURL: `${authBaseURL}&${uri}`
  });

  win.webContents.on("dom-ready", () => {
    win.webContents.insertCSS(styles);
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

  return win;
};
