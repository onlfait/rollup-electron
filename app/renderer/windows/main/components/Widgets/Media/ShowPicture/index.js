export { default as Settings } from "./Settings.svelte";
export { default as Widget } from "./Widget.svelte";

export const config = {
  label: "Show picture",
  name: "ShowPicture",
  group: "Media",
  action: {
    type: "immediat"
  },
  props: {
    file: null,
    width: 442,
    duration: 5000
  }
};
