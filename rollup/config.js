import resolve from "@rollup/plugin-node-resolve";
import svelteSVG from "rollup-plugin-svelte-svg";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import cleaner from "rollup-plugin-cleaner";
import postcss from "rollup-plugin-postcss";
import svelte from "rollup-plugin-svelte";
import copy from "rollup-plugin-copy";

import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";

import serve from "./serve";
import path from "path";

const makePackageJSON = require("./makePackageJSON");

const watch = process.env.ROLLUP_WATCH;
const sourcemap = watch ? "inline" : false;
const dir = watch ? "dev" : "prod";

const entries = ["windows/main"];

(async function functionName() {
  await makePackageJSON({
    from: path.resolve(__dirname, "../package.json"),
    to: path.resolve(__dirname, "../app/package.json")
  });
})();

function makeEntry(entry) {
  const inputDir = `app/renderer/${entry}`;
  const outputDir = `dist/${dir}/renderer/${entry}`;

  return {
    input: `${inputDir}/index.js`,
    output: {
      sourcemap,
      format: "iife",
      file: `${outputDir}/index.js`
    },
    plugins: [
      !watch && cleaner({ targets: [outputDir] }),
      copy({ targets: [{ src: `${inputDir}/index.html`, dest: outputDir }] }),
      postcss({
        extract: true,
        sourceMap: sourcemap,
        minimize: !watch,
        plugins: [postcssImport, tailwindcss]
      }),
      svelteSVG(),
      svelte({
        dev: watch,
        css: css => {
          css.write(`${outputDir}/svelte.css`, false);
        }
      }),
      resolve({ browser: true, dedupe: ["svelte", "svelte-grid"] }),
      commonjs(),
      replace({ __isDev__: watch }),
      !watch && terser(),
      watch && serve("app/main/index.js --dev")
    ]
  };
}

export default entries.map(makeEntry);
