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
    const $titlebar = document.createElement('div');
    $titlebar.innerHTML = \`${html}\`;
    document.body.prepend($titlebar);
    ${js}
  `);
}

function insertTailwind(wc) {
  insertStyle(wc, "app://renderer/static/styles/tailwind.css");
}

function createTitlebar(wc, title) {
  prependHTML(
    wc,
    `<div id="app-titlebar" class="flex items-center bg-black text-white">
      <div class="icon p-1"><img class="h-4" src="app://renderer/static/icon.ico" alt="icon" /></div>
      <div class="title p-1 flex-auto" style="-webkit-app-region: drag;">title</div>
      <div class="close p-1 w-8 hover:bg-red-600 text-center cursor-default">⨉</div>
    </div>`,
    `
    const $title = document.querySelector('#app-titlebar .title');
    const $close = document.querySelector('#app-titlebar .close');

    const titlebar = {
      setTitle(title) {
        $title.innerText = title;
      },
      getTitle() {
        return $title.innerText;
      }
    }

    titlebar.setTitle('${title}');
    $close.addEventListener('click', () => window.close());
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
