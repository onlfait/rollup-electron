import { writable } from "svelte/store";

export const opened = writable(false);
export const scenes = writable(null);
export const scene = writable(null);
export const stats = writable(null);

export const streaming = writable(null);
export const recording = writable(null);

export function send(...args) {
  return remote.obs.send(...args).catch(e => {
    console.warn("OBS is probably not opened...", e);
  });
}

export function setCurrentScene(name) {
  return send("SetCurrentScene", { "scene-name": name });
}

export function updateSceneList() {
  return send("GetSceneList").then(async data => {
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
  const streamStats = await send("GetStreamingStatus");
  streaming.set(
    !streamStats.streaming
      ? false
      : {
        timecode: streamStats["stream-timecode"]
      }
  );
  recording.set(
    !streamStats.recording
      ? false
      : {
        paused: streamStats["recording-paused"],
        timecode: streamStats["rec-timecode"]
      }
  );
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

remote.obs.on("RecordingStarted", data => {
  recording.set({ timecode: data["rec-timecode"] });
});

remote.obs.on("RecordingStopped", () => {
  recording.set(false);
});
