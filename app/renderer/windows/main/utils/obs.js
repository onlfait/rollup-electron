export const widgets = [
  { label: "Scene list", name: "SceneList" },
  {
    label: "Go to scene",
    name: "SceneButton",
    props: {
      scene: null
    }
  },
  {
    label: "Toggle scene",
    name: "SceneToggle",
    props: {
      scene1: null,
      scene2: null
    }
  },
  { label: "Live ON/OFF", name: "LiveToggle" },
  {
    label: "Record ON/OFF",
    name: "RecordToggle",
    confirm: {
      start: true,
      stop: true
    }
  }
];