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
      labelSize: 16,
      labelPadding: 8,
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
    label: "None",
    name: null
  },
  {
    label: " -- OBS --",
    disabled: true
  },
  {
    label: "Scene list",
    name: "SceneList",
    module: "obs"
  },
  {
    label: "Go to scene",
    name: "SceneSwitch",
    module: "obs",
    props: {
      scene: null
    }
  },
  {
    label: "Toggle scene",
    name: "SceneToggle",
    module: "obs",
    props: {
      scene1: null,
      scene2: null
    }
  },
  {
    label: "Live ON/OFF",
    name: "LiveToggle",
    module: "obs"
  },
  {
    label: "Record ON/OFF",
    name: "RecordToggle",
    module: "obs"
  },
  {
    label: " -- MEDIA --",
    disabled: true
  },
  {
    label: "Play sound",
    name: "PlaySound",
    module: "media",
    props: {
      file: null,
      volume: 0.8,
      playNow: false
    }
  },
  {
    label: "Show picture",
    name: "ShowPicture",
    module: "media",
    props: {
      file: null,
      width: 442,
      duration: 5
    }
  }
];
