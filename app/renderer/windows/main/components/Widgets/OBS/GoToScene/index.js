export { default as Settings } from "./Settings.svelte";
export { default as Widget } from "./Widget.svelte";

export const config = {
  label: "Go to scene",
  name: "GoToScene",
  group: "OBS",
  action: {
    type: "immediat"
  },
  props: {
    scene: null
  }
};
