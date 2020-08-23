export const grid = {
  defaultOptions: {
    gap: 4,
    cols: 10,
    rowHeight: 50,
    fillEmpty: false,
    useTransform: true,
    breakpoints: false
  },
  defaultWidget: {
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    min: { w: 2, h: 2 }
  }
};

export const panels = {
  defaultPanel: {
    id: null,
    name: null,
    widgets: []
  }
};

export const widgetsList = [
  {
    label: "Scene list",
    name: "SceneList"
  },
  {
    label: "Go to scene",
    name: "SceneSwitch",
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
  {
    label: "Live ON/OFF",
    name: "LiveToggle"
  },
  {
    label: "Record ON/OFF",
    name: "RecordToggle"
  },
  {
    label: "Play sound",
    name: "PlaySound",
    props: {
      file: null
    }
  }
];
