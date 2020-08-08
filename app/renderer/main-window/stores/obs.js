import { writable } from "svelte/store";

export const opened = writable(false);
export const scenes = writable(null);
export const scene = writable(null);
export const stats = writable(null);

export async function updateSceneList() {
  const _scenes = await remote.obs.emit("GetSceneList");
  scene.set(_scenes["current-scene"]);
  scenes.set(_scenes);
}

export async function updateStats() {
  stats.set(await remote.obs.emit("GetStats"));
}

function updateStatsAndCheckIfOpened() {
  updateStats()
    .then(() => opened.set(true))
    .catch(() => opened.set(false));
  setTimeout(updateStatsAndCheckIfOpened, 2000);
}

updateStatsAndCheckIfOpened();

remote.obs.on("opened", () => {
  opened.set(true);
  updateSceneList();
  updateStats();
});

remote.obs.on("closed", () => {
  opened.set(false);
});

remote.obs.on("ScenesChanged", () => {
  updateSceneList();
});

remote.obs.on("SwitchScenes", data => {
  scene.set(data["scene-name"]);
});
