export { default as Settings } from "./Settings.svelte";
export { default as Widget } from "./Widget.svelte";

export const config = {
  label: "Toggle scene",
  name: "ToggleScene",
  group: "OBS",
  props: {
    scene1: null,
    scene2: null
  }
};
