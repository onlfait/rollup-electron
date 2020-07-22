import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import cleaner from "rollup-plugin-cleaner";
import postcss from "rollup-plugin-postcss";
import svelte from "rollup-plugin-svelte";
import copy from "rollup-plugin-copy";
import serve from "./rollup.serve";

const watch = process.env.ROLLUP_WATCH;
const sourcemap = watch ? "inline" : false;
const dir = watch ? "dev" : "prod";

const entries = ["main-window", "error-window"];

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
      postcss({ extract: true, sourceMap: sourcemap, minimize: !watch }),
      svelte({
        dev: watch,
        css: css => {
          css.write(`${outputDir}/svelte.css`, false);
        }
      }),
      resolve({ browser: true, dedupe: ["svelte"] }),
      commonjs(),
      !watch && terser(),
      watch && serve("app/main/index.js --dev")
    ]
  };
}

export default entries.map(makeEntry);
