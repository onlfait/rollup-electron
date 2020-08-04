import { writable } from "svelte/store";

export const panels = writable([], async set => {
  set(await remote.getPanels());
});

export const currentId = writable(null, async set => {
  set(await remote.getCurrentPanelId());
});

export const editMode = writable(false);

// sync main <-> renderer store
// remote.getPanels().then(panels.set);
// panels.subscribe(remote.savePanels);

// remote.getCurrentPanelId().then(currentId.set);
// currentId.subscribe(remote.setCurrentPanelId);
