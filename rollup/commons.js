const windows = ["main"];

const watch = process.argv.includes("--dev");
const dir = watch ? "dev" : "prod";

const sourcemap = watch ? "inline" : false;

const appPath = "app";
const distPath = `dist/rollup/${dir}`;

export { windows, watch, dir, sourcemap, appPath, distPath };
