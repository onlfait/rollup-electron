import { terser as terserPlugin } from "rollup-plugin-terser";
import livereloadPlugin from "rollup-plugin-livereload";
import resolvePlugin from "@rollup/plugin-node-resolve";
import cleanerPlugin from "rollup-plugin-cleaner";
import sveltePlugin from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import servePlugin from "rollup-plugin-serve";
import html from "@rollup/plugin-html";
import path from "path";

import { appDir, distDir, watch, port } from "./common";

const inputDir = path.resolve(appDir, "renderer");
const outputDir = path.resolve(distDir, "renderer");

const serve = () => watch && servePlugin({ port, contentBase: outputDir });
const cleaner = () => !watch && cleanerPlugin({ targets: [outputDir] });
const livereload = () => watch && livereloadPlugin(outputDir);
const terser = () => !watch && terserPlugin();

const resolve = () => resolvePlugin({ browser: true, dedupe: ["svelte"] });

const svelte = () =>
  sveltePlugin({
    dev: watch,
    css: css => {
      css.write(`${outputDir}/main-window/index.css`);
    }
  });

export default {
  input: `${inputDir}/main-window/index.js`,
  output: {
    name: "renderer",
    format: "iife",
    sourcemap: true,
    file: `${outputDir}/main-window/index.js`
  },
  plugins: [
    cleaner(),
    html(),
    resolve(),
    commonjs(),
    svelte(),
    terser(),
    serve(),
    livereload()
  ]
};
