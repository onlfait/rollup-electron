const loadConfigFile = require("rollup/dist/loadConfigFile");
const { spawn } = require("child_process");
const electron = require("electron");
const rollup = require("rollup");
const chalk = require("chalk");
const path = require("path");

const electronArgs = ["app/main/index.js"];
const rootPath = path.resolve(__dirname, "..");
const configFile = path.resolve(__dirname, "config.js");

let electronStarted = false;

process.argv.push("--dev");

function print(color, ...args) {
  // eslint-disable-next-line
  console.log(chalk[color]("[rollup:watch]"), ...args);
}

const log = print.bind(null, "cyan");
const warn = print.bind(null, "yellow");
const error = print.bind(null, "red");

function cleanPath(input) {
  return path.relative(rootPath, input).replace(/\\/g, "/");
}

function printWarningsCount(w) {
  if (!w.count) return;
  warn(`We currently have ${chalk.yellow(w.count)} warnings.`);
  w.flush();
}

function cleanStack(stack) {
  let [message, location] = stack.split("\n");
  location = location.trim().replace(`${rootPath}${path.sep}`, "");
  return { message, location };
}

const events = {
  ["START"]() {},
  ["BUNDLE_START"]({ input }) {
    log(chalk.magenta(`=> ${input}`));
  },
  ["BUNDLE_END"]({ output, duration }) {
    output.forEach(item => log(chalk.green(`<= ${cleanPath(item)}`)));
    log(`Bundling took ${duration} ms`);
  },
  ["ERROR"](event) {
    const { message, location } = cleanStack(event.error.stack);
    error(message);
    error(location);
  },
  ["END"]() {
    if (!electronStarted) {
      electronStarted = true;
      log("Starting electron app...");
      const app = spawn(electron, electronArgs, {
        detached: true,
        stdio: "ignore"
      });
      app.unref();
      app.on("exit", code => {
        log(`Electron app exited (code: ${code}).`);
        electronStarted = false;
      });
    }
    log("Waiting for change...");
  }
};

loadConfigFile(configFile, { format: "es" })
  .then(({ options, warnings }) => {
    printWarningsCount(warnings);
    rollup.watch(options).on("event", event => {
      events[event.code](event);
    });
  })
  .catch(() => {
    error(`Could not resolve config (${configFile}).`);
  });
