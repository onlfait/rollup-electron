require("../commons/scripts/uncaughtError");

require("../commons/styles/index.css");
require("../commons/styles/scrollbar.css");
require("./styles/tailwind.css");

const App = require("./App.svelte");

new App({ target: document.body });
