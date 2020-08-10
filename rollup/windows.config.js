import cleaner from "rollup-plugin-cleaner";
import copy from "rollup-plugin-copy";

import { windows, appPath, distPath, sourcemap } from "./commons";

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
      copy({ targets: [{ src: indexFile, dest: outputPath }] })
    ]
  };
}

export default () => windows.map(makeOptions);
