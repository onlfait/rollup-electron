require("../commons/scripts/uncaughtError");

require("minireset.css");

require("../commons/styles/index.css");
require("../commons/styles/scrollbar.css");

require("./index.css");

document
  .querySelector("#exitApp")
  .addEventListener("click", () => remote.exitApp());

document
  .querySelector("#openIssue")
  .addEventListener("click", () => remote.openIssue());

document
  .querySelector("#relaunchApp")
  .addEventListener("click", () => remote.relaunchApp());
