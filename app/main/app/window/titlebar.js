function insertStyle(wc, url) {
  wc.executeJavaScript(`
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', '${url}');
    document.head.append(style);
    style = undefined;
  `);
}

function prependHTML(wc, html, js = "") {
  wc.executeJavaScript(`
    let $titlebar = document.createElement('div');
    $titlebar.innerHTML = \`${html}\`;
    document.body.prepend($titlebar.firstElementChild);
    $titlebar = undefined;
    ${js}
  `);
}

function insertTailwind(wc) {
  insertStyle(wc, "app://renderer/static/styles/tailwind.css");
}

function createTitlebar(wc, { title, darkMode }) {
  prependHTML(
    wc,
    `<div id="app-titlebar" class="flex items-center bg-white text-black dark:bg-black dark:text-white">
      <div class="icon p-1"><img class="h-4" src="app://renderer/static/icon.ico" alt="icon" /></div>
      <div class="title p-1 flex-auto" style="-webkit-app-region: drag;">title</div>
      <div class="close p-1 w-8 hover:bg-red-600 text-center cursor-default">⨉</div>
    </div>`,
    `
    const titlebar = {
      $html: document.querySelector("html"),
      $element: document.querySelector('#app-titlebar'),
      $title: document.querySelector('#app-titlebar .title'),
      $close: document.querySelector('#app-titlebar .close'),
      darkMode: true,
      setTitle(title) {
        titlebar.$title.innerText = title;
      },
      getTitle() {
        return titlebar.$title.innerText;
      },
      getDarkMode() {
        return titlebar.darkMode;
      },
      setDarkMode(enable = true) {
        enable = !!enable;
        titlebar.darkMode = enable;
        titlebar.$html.classList.toggle("theme--dark", enable);
        titlebar.$html.classList.toggle("theme--light", !enable);
        titlebar.$html.classList.toggle("tw-root--theme-dark", enable);
        titlebar.$html.classList.toggle("tw-root--theme-light", !enable);
        remote.call('app.setDarkMode', enable);
        return enable;
      },
      toggleDarkMode() {
        return titlebar.setDarkMode(!titlebar.darkMode);
      },
    }

    titlebar.setTitle('${title}');
    titlebar.setDarkMode(${darkMode ? "true" : "false"});
    titlebar.$close.addEventListener('click', () => window.close());
    `
  );
}

module.exports = function titlebar(
  win,
  { title = "My app", darkMode = true } = {}
) {
  const wc = win.webContents;
  wc.on("dom-ready", () => {
    insertTailwind(wc);
    createTitlebar(wc, { title, darkMode });
  });
};
