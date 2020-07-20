import mainConfig from "./rollup.config/main.js";
import preloadConfig from "./rollup.config/preload.js";
import rendererConfig from "./rollup.config/renderer.js";

export default [mainConfig, ...preloadConfig, rendererConfig];
