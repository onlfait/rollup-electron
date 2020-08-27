import { writable } from "svelte/store";

export const connected = writable(false);
export const connecting = writable(false);

export const streaming = writable(false);
export const recording = writable(false);

export const status = writable(null);

export const currentScene = writable(null);
export const scenesList = writable([]);

export const autoConnectAtStartup = writable(false);

export function send(...args) {
  return app.obs.send(...args).catch(() => {
    // eslint-disable-next-line
    console.warn("OBS is probably not opened...");
  });
}

export function setCurrentScene(name) {
  return send("SetCurrentScene", { "scene-name": name }).then(() => {
    currentScene.set(name);
  });
}

function updateSceneListData(data) {
  currentScene.set(data["current-scene"]);
  scenesList.set(data.scenes);
}

export function updateSceneList() {
  return send("GetSceneList").then(async data => {
    data && updateSceneListData(data);
  });
}

const setConnected = () => {
  connecting.set(false);
  connected.set(true);
};

app.obs.on("connect", () => connecting.set(true));
app.obs.on("connected", setConnected);
app.obs.on("disconnected", () => {
  streaming.set(false);
  recording.set(false);
});
app.obs.on("status", (event, status) => {
  connected.set(status.connected);
  connecting.set(status.connecting);
});

app.obs.on("StreamStarted", () => streaming.set(true));
app.obs.on("StreamStopped", () => streaming.set(false));

app.obs.on("RecordingStarted", () => recording.set(true));
app.obs.on("RecordingStopped", () => recording.set(false));

app.obs.on("StreamStatus", (event, data) => {
  setConnected();
  status.set(data);
  streaming.set(data["streaming"]);
  recording.set(data["recording"]);
});

app.obs.on("SwitchScenes", (event, data) => {
  currentScene.set(data["scene-name"]);
});

app.obs.on("ScenesChanged", () => {
  updateSceneList();
});

// sync main <-> renderer store
app.obs.getStatus().then(s => {
  connected.set(s.connected);
  connecting.set(s.connecting);
});

app.obs.autoConnectAtStartup.get().then(autoConnectAtStartup.set);
autoConnectAtStartup.subscribe(app.obs.autoConnectAtStartup.set);
