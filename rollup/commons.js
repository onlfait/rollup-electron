const windows = ["main"];
const commons = ["scripts/index.js", "styles/index.css"];

const watch = process.argv.includes("--dev");
const dir = watch ? "dev" : "prod";

const sourcemap = watch ? "inline" : false;

const appPath = "app";
const distPath = `dist/rollup/${dir}`;

export { windows, commons, watch, dir, sourcemap, appPath, distPath };
