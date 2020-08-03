import { writable } from "svelte/store";

export const grids = writable({});

// sync main <-> renderer store
remote.getAllGrids().then(grids.set);
// grids.subscribe(remote.saveGrids);
