require("../commons/scripts/uncaughtError");
require("../commons/styles/scrollbar.css");
require("../commons/styles/tailwind.css");
require("../commons/styles/index.css");

const App = require("./App.svelte");
new App({ target: document.body });

remote.obs.on("opened", () => console.log("OBS opened !"));
remote.obs.on("closed", () => console.log("OBS closed !"));
