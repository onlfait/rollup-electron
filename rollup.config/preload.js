// import multiEntry from "@rollup/plugin-multi-entry";
import path from "path";

import { appDir, distDir } from "./common";

const inputDir = path.resolve(appDir, "main");
const outputDir = path.resolve(distDir, "main");

export default [
  {
    input: `${inputDir}/main-window/preload.js`,
    output: {
      format: "cjs",
      sourcemap: true,
      file: `${outputDir}/main-window/preload.js`
    }
  }
];
