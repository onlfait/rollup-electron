#!/usr/bin/env node
const tailwind = require.resolve("tailwindcss/lib/cli.js");
const { fork } = require("child_process");
const path = require("path");

const input = path.resolve(__dirname, "index.css");
const output = path.resolve(__dirname, "../app/static/styles/tailwind.css");

fork(tailwind, ["build", input, "-o", output], {
  stdio: ["inherit", "inherit", "inherit", "ipc"]
});
