const preload = require("../../preload");

const titlebar = { name: "titlebar", options: { title: "Unexpected error" } };

preload(["remote", "darkMode", titlebar, "errors"]);
