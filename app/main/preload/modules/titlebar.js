const remote = require("./remote");

let appName = null;
let $title = null;

function createElementFromHTML(html) {
  const $titlebar = document.createElement("div");
  $titlebar.innerHTML = html;
  return $titlebar.firstElementChild;
}

async function createTitlebar() {
  appName = await remote.api.get("app.name");
  const $titlebar = createElementFromHTML(`
    <div id="app-titlebar" class="flex items-center bg-light-darker text-dark dark:bg-dark-darker dark:text-light">
      <div class="icon p-1"><img class="h-4" src="app://renderer/static/icon.ico" alt="icon" /></div>
      <div class="title p-1 flex-auto" style="-webkit-app-region: drag;">${appName}</div>
      <div class="close p-1 w-8 hover:bg-red-600 text-center cursor-default">⨉</div>
    </div>
  `);
  const $close = $titlebar.querySelector(".close");
  $close.addEventListener("click", window.close);
  $title = $titlebar.querySelector(".title");
  document.body.prepend($titlebar);
}

function setTitle(title = null) {
  title = title ? `${title} — ${appName}` : appName;
  $title.innerHTML = title;
  document.title = title;
}

async function init({ title = null } = {}) {
  await createTitlebar();
  setTitle(title);
}

module.exports = { init, api: { setTitle } };
