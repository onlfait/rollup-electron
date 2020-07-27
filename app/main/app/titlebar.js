const isDarkMode = require("./isDarkMode");
const { setWinDarkMode } = require("./setDarkMode");

function css({ darkColor = "#121212", lightColor = "#f1f1f1" } = {}) {
  return `
    .app-titlebar {
      height: 30px;
      display: grid;
      line-height: 1;
      font-size: 14px;
      place-items: stretch;
      color: ${lightColor};
      background-color: ${darkColor};
      grid-template-columns: 30px auto 30px;
    }
    .app-titlebar--icon,
    .app-titlebar--title,
    .app-titlebar--close {
      display: grid;
      place-items: center;
    }
    .app-titlebar--icon img {
      height: 20px;
    }
    .app-titlebar--title {
      -webkit-app-region: drag;
      place-items: center start;
    }
    .app-titlebar--close {
      font-size: 16px;
      cursor: default;
    }
    .app-titlebar--close:hover {
      color: rgba(255,255,255,0.8);
      background-color: rgba(255,0,0,0.8);
    }
    .theme--light .app-titlebar {
      color: ${darkColor};
      background-color: ${lightColor};
    }
    .theme--light .app-titlebar--close {
      color: ${darkColor};
    }
  `;
}

function js({ title = null, icon = "static/icon.ico" } = {}) {
  return `(function () {
    const $html = document.querySelector('html');
    const $nav = document.createElement("nav");
    const $icon = document.createElement("div");
    const $img = document.createElement("img");
    const $title = document.createElement("div");
    const $close = document.createElement("div");

    $nav.classList.add("app-titlebar");
    $icon.classList.add("app-titlebar--icon");
    $title.classList.add("app-titlebar--title");
    $close.classList.add("app-titlebar--close");

    $title.innerText = ${title ? `"${title}"` : "document.title"};

    $close.addEventListener('click', () => window.close());
    $close.innerText = "⨉"

    $img.setAttribute('src', 'app://renderer/${icon}');
    $icon.append($img);

    $nav.append($icon);
    $nav.append($title);
    $nav.append($close);

    document.body.prepend($nav);
  }());
  `;
}

module.exports = function createTitlebar({ win, ...options }) {
  win.webContents.on("did-finish-load", () => {
    win.webContents.insertCSS(css(options));
    win.webContents.executeJavaScript(js(options));
    setWinDarkMode(win, isDarkMode());
  });
};
