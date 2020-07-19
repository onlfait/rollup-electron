import path from "path";

export const port = 42042;
export const watch = process.env.ROLLUP_WATCH;
export const appDir = path.resolve(__dirname, "app");
export const distDir = path.resolve(__dirname, "dist", watch ? "dev" : "prod");
