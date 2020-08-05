import { writable } from "svelte/store";

export const panels = writable(null, async set => {
  set(await remote.getPanels());
});

// sync main <-> renderer store
panels.subscribe(p => p && remote.setPanels(p));
