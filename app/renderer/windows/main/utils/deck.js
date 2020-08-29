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
