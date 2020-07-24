const createBrowserWindow = require("../app/security/createBrowserWindow");
const { hasDevTools } = require("../app/utils");
const { BrowserWindow } = require("electron");

const authBaseURL = "https://id.twitch.tv/oauth2/authorize?response_type=token";

function getThemeCSS(darkMode) {
  if (darkMode) {
    return `
      #kraken_auth {
        background-color: #0e0e10 !important;
      }
      #kraken_auth .authorize .wrap {
        background-color: #18181B !important;
      }
    `;
  }
  return "";
}

function getThemeJS(darkMode) {
  return `
    const html = document.querySelector('html');
    ${darkMode && "html.classList.add(\"theme--dark\");"}
    ${darkMode && "html.classList.add(\"tw-root--theme-dark\");"}
    ${!darkMode && "html.classList.remove(\"tw-root--theme-dark\");"}
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const btn = document.querySelector('.js-cancel');
    btn && btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.close();
    })
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

  win.webContents.on("before-input-event", (_, input) => {
    ["Esc", "Escape"].includes(input.key) && win.close();
  });

  win.webContents.on("dom-ready", () => {
    win.webContents.insertCSS(getThemeCSS(darkMode));
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

  win.webContents.on("did-finish-load", () => {
    win.show();
  });

  return win;
};
