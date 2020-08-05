import { writable } from "svelte/store";

export const editMode = writable(false);

export const panels = writable(null, async set => {
  set(await remote.getPanels());
});

export const currentId = writable(null, async set => {
  set(await remote.getCurrentPanelId());
});

// sync main <-> renderer store
panels.subscribe(p => p !== null && remote.savePanels(p));
currentId.subscribe(remote.setCurrentPanelId);
