require("../commons/scripts/uncaughtError");

require("minireset.css");

require("../commons/styles/index.css");
require("../commons/styles/scrollbar.css");

require("./index.css");

const App = require("./App.svelte");

new App({ target: document.body });
