import resolve from "@rollup/plugin-node-resolve";
import svelteSVG from "rollup-plugin-svelte-svg";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import cleaner from "rollup-plugin-cleaner";
import svelte from "rollup-plugin-svelte";
import alias from "@rollup/plugin-alias";
import copy from "rollup-plugin-copy";

import path from "path";

const absAppPath = path.resolve(__dirname, "../app");

import { watch, windows, appPath, distPath, sourcemap } from "./commons";

function makeOptions(entry) {
  const windowsPath = `renderer/windows/${entry}`;
  const inputPath = `${appPath}/${windowsPath}`;
  const outputPath = `${distPath}/${windowsPath}`;
  const indexFile = `${inputPath}/index.html`;

  return {
    input: `${inputPath}/index.js`,
    output: {
      sourcemap,
      format: "iife",
      file: `${outputPath}/index.js`
    },
    plugins: [
      cleaner({ targets: [outputPath] }),
      copy({ targets: [{ src: indexFile, dest: outputPath }] }),
      resolve({ browser: true, dedupe: ["svelte"] }),
      commonjs(),
      svelteSVG(),
      svelte({ dev: watch }),
      !watch && terser(),
      alias({
        entries: [{ find: "@", replacement: absAppPath }]
      })
    ]
  };
}

export default () => windows.map(makeOptions);
