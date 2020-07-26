const loadConfigFile = require("rollup/dist/loadConfigFile");
const makePackageJSON = require("./makePackageJSON");
const builder = require("electron-builder");
const rollup = require("rollup");
const fs = require("fs-extra");
const chalk = require("chalk");
const path = require("path");

const srcPath = path.resolve(__dirname, "..", "app");
const distPath = path.resolve(__dirname, "..", "dist", "prod");

async function clean() {
  await fs.emptyDir(distPath);
}

async function copy(dir) {
  await fs.copy(path.join(srcPath, dir), path.join(distPath, dir));
}

function buildRenderer() {
  return loadConfigFile(path.resolve(__dirname, "config.js"), {
    format: "es"
  }).then(async ({ options, warnings }) => {
    const count =
      warnings.count > 0 ? chalk.red(warnings.count) : chalk.green("0");
    console.log(`We currently have ${count} warnings`);
    warnings.flush();

    const bundle = await rollup.rollup(options[0]);
    await Promise.all(options[0].output.map(bundle.write));
  });
}

function log(msg) {
  console.log(chalk.green(`> ${msg}`));
}

async function dist() {
  log("Clean dist directory");
  await clean();
  log("Copy app sources");
  await copy("main");
  await copy("static");
  log("Copy package.json");
  await makePackageJSON({
    from: path.join(__dirname, "..", "package.json"),
    to: path.join(distPath, "package.json")
  });
  log("Rollup renderer");
  await buildRenderer();
  log("Build app");
  await builder.build();
}

dist();
