import { spawn } from "child_process";
import kill from "tree-kill";

export default function serve({ bin } = {}) {
  let app = null;

  return {
    writeBundle() {
      if (app) {
        kill(app.pid, "SIGTERM");
      }

      app = spawn("electron", [bin], {
        stdio: ["inherit", "inherit", "inherit"],
        shell: true
      });
    }
  };
}
