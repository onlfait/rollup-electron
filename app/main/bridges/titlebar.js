const remote = require("./remote");

let $title = null;

function createElementFromHTML(html) {
  const $titlebar = document.createElement("div");
  $titlebar.innerHTML = html;
  return $titlebar.firstElementChild;
}

function createTitlebar(title) {
  return createElementFromHTML(`
    <div id="app-titlebar" class="flex items-center bg-white text-black dark:bg-black dark:text-white">
      <div class="icon p-1"><img class="h-4" src="app://renderer/static/icon.ico" alt="icon" /></div>
      <div class="title p-1 flex-auto" style="-webkit-app-region: drag;">${title}</div>
      <div class="close p-1 w-8 hover:bg-red-600 text-center cursor-default">⨉</div>
    </div>
  `);
}

async function create({ title = null } = {}) {
  title = title || (await remote.api.get("app.name"));
  const $titlebar = createTitlebar(title);
  $title = $titlebar.querySelector(".title");
  $titlebar.querySelector(".close").addEventListener("click", window.close);
  document.body.appendChild($titlebar);
}

function setTitle(title) {
  $title.innerHTML = title;
  document.title = title;
}

module.exports = { create, api: { setTitle } };
