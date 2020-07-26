function css({ darkColor = "#121212", lightColor = "#f1f1f1" } = {}) {
  return `
  .app-titlebar {
    height: 30px;
    display: flex;
    font-size: 14px;
    line-height: 1em;
    color: ${lightColor};
    background-color: ${darkColor};
  }
  .app-titlebar span {
    height: 30px;
    padding: 8px;
    flex: 1 1 auto;
    vertical-align: middle;
    -webkit-app-region: drag;
  }
  .app-titlebar button {
    border: 0;
    width: 30px;
    height: 30px;
    font-size: 16px;
    padding: 6px 8px;
    color: rgba(255,255,255,0.8);
    background-color: transparent;
  }
  .app-titlebar button:hover {
    color: rgba(255,255,255,0.8);
    background-color: rgba(255,0,0,0.8);
  }
  .theme--light .app-titlebar {
    color: ${darkColor};
    background-color: ${lightColor};
  }
  .theme--light .app-titlebar button {
    color: ${darkColor};
  }
  `;
}

function js({ darkMode = true } = {}) {
  return `(function () {
    const html = document.querySelector('html');
    const titlebar = document.createElement("nav");
    const title = document.createElement("span");
    const close = document.createElement("button");

    html.classList.add('theme--${darkMode ? "dark" : "light"}');

    close.addEventListener('click', () => window.close());

    titlebar.classList.add("app-titlebar");

    title.innerText = document.title;
    close.innerText = "⨉"

    titlebar.append(title);
    titlebar.append(close);

    document.body.prepend(titlebar);
  }());
  `;
}

module.exports = function createTitlebar({ win, ...options }) {
  win.webContents.on("dom-ready", () => {
    win.webContents.insertCSS(css(options));
    win.webContents.executeJavaScript(js(options));
  });
};
