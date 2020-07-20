import { spawn } from "child_process";
import treeKill from "tree-kill";
import chokidar from "chokidar";
import WebSocket from "ws";
import chalk from "chalk";

const port = 42042;
const wss = new WebSocket.Server({ port });

function send(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

let watcher = null;
let app = null;
let bin = null;

function start() {
  if (app) {
    return;
  }

  app = spawn("electron", [bin], {
    stdio: ["inherit", "inherit", "inherit"],
    shell: true
  });
}

function kill() {
  app && treeKill(app.pid, "SIGTERM");
  app = null;
}

function relaunch() {
  kill();
  start();
}

function date() {
  const n = new Date();
  const Y = new Intl.DateTimeFormat("en", { year: "numeric" }).format(n);
  const M = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(n);
  const D = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(n);
  const h = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    hour12: false
  }).format(n);
  const m = new Intl.DateTimeFormat("en", { minute: "2-digit" }).format(n);
  const s = new Intl.DateTimeFormat("en", { second: "2-digit" }).format(n);

  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}

function watch() {
  if (watcher) {
    return;
  }

  watcher = chokidar.watch("app/main/**/*");

  watcher.on("ready", () => {
    watcher.on("change", path => {
      console.log(chalk.green("changed"), chalk.green.bold(path), "\n");
      console.log(`[${date()}] waiting for changes...`);
      relaunch();
    });
  });
}

export default function serve(script) {
  let firstCall = true;
  bin = script;

  start();
  watch();

  return {
    writeBundle() {
      if (!firstCall) {
        send("reload");
      }
      firstCall = false;
    }
  };
}
