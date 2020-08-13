import cleaner from "rollup-plugin-cleaner";
import path from "path";

import { commons, appPath, distPath, sourcemap } from "./commons";

function makeOptions(entry) {
  const name = path.basename(entry);
  const dirname = path.dirname(entry);
  const commonsPath = `renderer/commons/${dirname}`;
  const inputPath = `${appPath}/${commonsPath}`;
  const outputPath = `${distPath}/${commonsPath}`;

  return {
    input: `${inputPath}/${name}`,
    output: {
      name,
      sourcemap,
      format: "iife",
      file: `${outputPath}/${name}`
    },
    plugins: [cleaner({ targets: [outputPath] })]
  };
}

export default () => commons.map(makeOptions);
