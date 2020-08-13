function insertStyle(wc, url) {
  wc.executeJavaScript(`
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', '${url}');
    document.head.append(style);
  `);
}

function prependHTML(wc, html) {
  wc.executeJavaScript(`
    const titlebar = document.createElement('div');
    titlebar.innerHTML = \`${html}\`;
    document.body.prepend(titlebar);
  `);
}

function insertTailwind(wc) {
  insertStyle(wc, "app://renderer/static/styles/tailwind.css");
}

function createTitlebar(wc) {
  prependHTML(
    wc,
    `<div class="titlebar flex">
      <div>icon</div>
      <div>title</div>
      <div>close</div>
    </div>`
  );
}

module.exports = function titlebar(win) {
  const wc = win.webContents;
  wc.on("dom-ready", () => {
    insertTailwind(wc);
    createTitlebar(wc);
  });
};
