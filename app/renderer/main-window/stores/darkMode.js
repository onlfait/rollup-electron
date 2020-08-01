import { writable } from "svelte/store";

const darkMode = writable(true);

// sync main <-> renderer store
remote.isDarkMode().then(darkMode.set);
darkMode.subscribe(remote.setDarkMode);

export default darkMode;
