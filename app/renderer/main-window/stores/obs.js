import { writable } from "svelte/store";

export const opened = writable(false);
export const scenes = writable(null);
export const scene = writable(null);
export const stats = writable(null);

function send(...args) {
  return remote.obs
    .send(...args)
    .then(data => Promise.resolve(data))
    .catch(e => {
      console.warn("OBS is probably not opened...", e);
    });
}

export function updateSceneList() {
  send("GetSceneList").then(async data => {
    if (!data) {
      data = await remote.obs.store.get("scenes", {});
    }
    if (data) {
      remote.obs.store.set("scenes", data);
      scene.set(data["current-scene"]);
      scenes.set(data);
    }
  });
}

export async function updateStats() {
  stats.set(await send("GetStats"));
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
