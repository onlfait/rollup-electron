import multiEntry from "@rollup/plugin-multi-entry";
import path from "path";

import { appDir, distDir } from "./common";

const inputDir = path.resolve(appDir, "main");
const outputDir = path.resolve(distDir, "main");

export default {
  input: `app/main/main-window/preload.js`,
  output: { dir: outputDir },
  plugins: [multiEntry()]
};
