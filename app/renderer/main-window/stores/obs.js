import { writable } from "svelte/store";

export const opened = writable(false);
// export const scenes = writable(null);
//
// async function getSceneList() {
//   scenes.set(await remote.obs.emit("GetSceneList"));
// }

remote.obs.on("opened", async () => {
  opened.set(true);
});

remote.obs.on("closed", () => {
  opened.set(false);
});
