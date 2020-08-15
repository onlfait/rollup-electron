#!/usr/bin/env node

const loadConfigFile = require("rollup/dist/loadConfigFile");
const makePackageJSON = require("./makePackageJSON");
const builder = require("electron-builder");
const rollup = require("rollup");
const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");

const print = require("./print");

const rp = print("build", { info: "#17ccd6" });

const configFile = path.resolve(__dirname, "config.js");
const distPath = path.resolve(__dirname, "../dist/rollup/prod");
const srcPath = path.resolve(__dirname, "../app");

function printWarningsCount(w) {
  if (!w.count) return;
  rp.warn(`We currently have ${chalk.yellow(w.count)} warnings.`);
  w.flush();
}

function printStack(stack) {
  stack.split("\n").forEach(line => rp.error(line));
}

function rollupBuild() {
  return loadConfigFile(configFile, { format: "es" })
    .then(async ({ options, warnings }) => {
      printWarningsCount(warnings);
      for (var i = 0; i < options.length; i++) {
        rp.info(chalk.magenta(`<= ${options[i].input}`));
        const bundle = await rollup.rollup(options[i]);
        await Promise.all(
          options[i].output.map(o => {
            rp.info(chalk.green(`=> ${o.file}`));
            bundle.write(o);
          })
        );
      }
    })
    .catch(err => {
      printStack(err.stack);
    });
}

async function cleanDistDirectory() {
  rp.info(chalk.green(`=> ${distPath}`));
  return await fs.emptyDir(distPath);
}

async function copy(dir) {
  const dest = path.join(distPath, dir);
  rp.info(chalk.green(`=> ${dest}`));
  await fs.copy(path.join(srcPath, dir), dest);
}

async function dist() {
  const start = Date.now();
  rp.info("Cleanning dist directory...");
  await cleanDistDirectory();
  rp.info("Copying sources...");
  await copy("main");
  await copy("static");
  rp.info("Bundeling renderer...");
  await rollupBuild();
  rp.info("Making package.json...");
  await makePackageJSON({
    from: path.join(__dirname, "..", "package.json"),
    to: path.join(distPath, "package.json")
  });
  rp.info("Build app");
  await builder.build();
  const elapsed = Date.now() - start;
  let time = `${elapsed} ms`;
  if (elapsed > 1000) {
    time = `${(elapsed / 1000).toFixed(2)} s`;
  }
  rp.info(chalk.green("✔"), `Done in ${time}`);
}

dist();
