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
    document.body.prepend($titlebar);
    $titlebar = undefined;
    ${js}
  `);
}

function insertTailwind(wc) {
  insertStyle(wc, "app://renderer/static/styles/tailwind.css");
}

function createTitlebar(wc, title) {
  prependHTML(
    wc,
    `<div id="app-titlebar" class="flex items-center bg-black text-white dark:bg-white dark:text-black">
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
      darkMode: false,
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
        titlebar.$html.classList.toggle("theme--dark", enable);
        titlebar.$html.classList.toggle("theme--light", !enable);
        titlebar.$html.classList.toggle("tw-root--theme-dark", enable);
        titlebar.$html.classList.toggle("tw-root--theme-light", !enable);
        return (titlebar.darkMode = !!enable);
      },
      toggleDarkMode() {
        return titlebar.setDarkMode(!titlebar.darkMode);
      },
    }

    titlebar.setTitle('${title}');
    titlebar.$close.addEventListener('click', () => window.close());
    `
  );
}

module.exports = function titlebar(win, { title = "My app" } = {}) {
  const wc = win.webContents;
  wc.on("dom-ready", () => {
    insertTailwind(wc);
    createTitlebar(wc, title);
  });
};
