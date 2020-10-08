export default {
  top: {
    props: { type: "number", step: 10, value: 0 },
    unit: "px",
    isProp: false,
  },
  left: {
    props: { type: "number", step: 10, value: 0 },
    unit: "px",
    isProp: false,
  },
  width: {
    props: { type: "number", min: 0, step: 10, value: 800 },
    unit: "px",
    isProp: false,
  },
  height: {
    props: { type: "number", min: 0, step: 10, value: 600 },
    unit: "px",
    isProp: false,
  },
  volume: {
    props: { type: "number", min: 0, max: 1, step: 0.1, value: 0.8 },
    unit: null,
    isProp: true,
  },
  "font-size": {
    props: { type: "number", min: 0, step: 10, value: 42 },
    unit: "px",
    isProp: false,
  },
  color: {
    props: { type: "string", value: "#555425" },
    unit: null,
    isProp: false,
  },
};
