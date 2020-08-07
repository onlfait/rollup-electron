import { writable } from "svelte/store";

export const opened = writable(false);
export const scenes = writable(null);
export const stats = writable(null);

export async function updateSceneList() {
  scenes.set(await remote.obs.emit("GetSceneList"));
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
