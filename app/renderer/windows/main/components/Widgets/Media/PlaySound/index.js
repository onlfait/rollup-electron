export { default as Settings } from "./Settings.svelte";
export { default as Widget } from "./Widget.svelte";

export const config = {
  label: "Play sound",
  name: "PlaySound",
  group: "Media",
  action: {
    type: "immediat"
  },
  props: {
    file: null,
    volume: 0.8,
    duration: 0
  }
};
