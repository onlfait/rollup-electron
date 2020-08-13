#!/usr/bin/env node

const loadConfigFile = require("rollup/dist/loadConfigFile");
const { spawn } = require("child_process");
const chokidar = require("chokidar");
const electron = require("electron");
const rollup = require("rollup");
const chalk = require("chalk");
const path = require("path");

const print = require("./print");

const rp = print("rollup", { info: "#17ccd6" });
const ep = print("electron", { info: "#1789d6" });

const rootPath = path.resolve(__dirname, "..");
const configFile = path.resolve(__dirname, "config.js");

let relaunch = false;
let electronApp = null;
const electronArgs = ["app/main/index.js", "--dev"];

process.argv.push("--dev");

function cleanPath(input) {
  return path.relative(rootPath, input).replace(/\\/g, "/");
}

function printWarningsCount(w) {
  if (!w.count) return;
  rp.warn(`We currently have ${chalk.yellow(w.count)} warnings.`);
  w.flush();
}

function printStack(stack) {
  stack.split("\n").forEach(line => rp.error(line));
}

function electronPrint(type, message) {
  message = message.toString().trim();
  message && ep[type](message);
}

function electronSend(...args) {
  electronApp && electronApp.send(...args);
}

function launchElectron() {
  if (electronApp) return;
  rp.info("Starting electron app...");
  electronApp = spawn(electron, electronArgs, {
    stdio: ["inherit", "pipe", "inherit", "ipc"],
    detached: false
  });
  // electronApp.unref(); // detach
  electronApp.stdout.on("data", data => {
    const str = data.toString();
    let type = str.match(/warning/i) ? "warn" : "info";
    type = str.match(/error|exception|rejection/i) ? "error" : type;
    str.split("\n").forEach(line => electronPrint(type, line));
  });
  // [!!!] Uncomment to get some feedback from the renderer
  // electronApp.on("message", msg => {
  //   console.log(">>>", msg);
  // });
  electronApp.on("error", err => {
    printStack(err.stack);
  });
  electronApp.on("exit", code => {
    rp.info(`Electron app exited (code: ${code})`);
    electronApp = null;
    if (relaunch) {
      relaunch = false;
      launchElectron();
    }
  });
}

const events = {
  ["START"]() {},
  ["BUNDLE_START"]({ input }) {
    rp.info(chalk.magenta(`<= ${input}`));
  },
  ["BUNDLE_END"]({ output, duration }) {
    output.forEach(item => rp.info(chalk.green(`=> ${cleanPath(item)}`)));
    rp.info(`Bundling took ${duration} ms`);
  },
  ["ERROR"](event) {
    printStack(event.error.stack);
  },
  ["END"]() {
    rp.info("Waiting for change...");
    launchElectron();
    electronSend("rollup.end");
  }
};

loadConfigFile(configFile, { format: "es" })
  .then(({ options, warnings }) => {
    printWarningsCount(warnings);
    rollup.watch(options).on("event", event => {
      events[event.code](event);
    });
  })
  .catch(err => {
    printStack(err.stack);
  });

const watcher = chokidar.watch("app/main/**/*");

watcher.on("ready", () => {
  watcher.on("change", path => {
    ep.info(chalk.green(`♻ ${cleanPath(path)}`));
    ep.info("Waiting for change...");
    if (electronApp) {
      electronSend("exit");
      relaunch = true;
    } else {
      launchElectron();
    }
  });
});
