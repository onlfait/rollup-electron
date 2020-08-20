import { writable } from "svelte/store";

export const connected = writable(false);
export const connecting = writable(false);

export const streaming = writable(false);
export const recording = writable(false);

export const status = writable(null);

export const autoConnectAtStartup = writable(false);

const setConnected = () => {
  connecting.set(false);
  connected.set(true);
};

app.obs.on("connect", () => connecting.set(true));
app.obs.on("connected", setConnected);
app.obs.on("disconnected", () => {
  // status.set(false);
  streaming.set(false);
  recording.set(false);
  connecting.set(false);
  connected.set(false);
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

// sync main <-> renderer store
app.obs.getStatus().then(s => {
  connected.set(s.connected);
  connecting.set(s.connecting);
});

app.obs.autoConnectAtStartup.get().then(autoConnectAtStartup.set);
autoConnectAtStartup.subscribe(app.obs.autoConnectAtStartup.set);
