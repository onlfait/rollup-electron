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
    props: {
      label: null,
      labelPosition: "text-center",
      classList: "rounded-md",
      backgroundColor: "#8fa2b5",
      backgroundImage: null,
      component: null
    },
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
  },
  {
    label: "Show picture",
    name: "ShowPicture",
    props: {
      file: null
    }
  }
];
