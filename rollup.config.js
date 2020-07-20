import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import cleaner from "rollup-plugin-cleaner";
import postcss from "rollup-plugin-postcss";
import svelte from "rollup-plugin-svelte";
import copy from "rollup-plugin-copy";

const watch = process.env.ROLLUP_WATCH;
const dir = watch ? "dev" : "prod";

const inputDir = "app/renderer/main-window";
const outputDir = `dist/${dir}/renderer/main-window`;

export default {
  input: `${inputDir}/index.js`,
  output: {
    format: "iife",
    sourcemap: true,
    file: `${outputDir}/index.js`
  },
  plugins: [
    !watch && cleaner({ targets: [outputDir] }),
    copy({ targets: [{ src: `${inputDir}/index.html`, dest: outputDir }] }),
    postcss({ extract: true, sourceMap: true, minimize: !watch }),
    svelte({ dev: watch, css: css => css.write(`${outputDir}/svelte.css`) }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs(),
    !watch && terser()
  ]
};
