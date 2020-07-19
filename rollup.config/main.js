import { terser as terserPlugin } from "rollup-plugin-terser";
import replacePlugin from "@rollup/plugin-replace";
import cleanerPlugin from "rollup-plugin-cleaner";
import commonjs from "@rollup/plugin-commonjs";
import builtins from "builtin-modules";
import servePlugin from "./serve";
import path from "path";

import { appDir, distDir, watch, port } from "./common";

const inputDir = path.resolve(appDir, "main");
const outputDir = path.resolve(distDir, "main");

const serve = () => watch && servePlugin({ bin: `${outputDir}/index.js` });
const cleaner = () => !watch && cleanerPlugin({ targets: [outputDir] });
const terser = () => !watch && terserPlugin();
const replace = () =>
  replacePlugin({
    __APP_HOST__: JSON.stringify(
      watch ? `http://localhost:${port}` : "app://renderer"
    )
  });

builtins.push("electron");

export default {
  input: `${inputDir}/index.js`,
  output: {
    name: "main",
    format: "cjs",
    sourcemap: true,
    file: `${outputDir}/index.js`
  },
  external: builtins,
  plugins: [cleaner(), commonjs(), replace(), terser(), serve()]
};
