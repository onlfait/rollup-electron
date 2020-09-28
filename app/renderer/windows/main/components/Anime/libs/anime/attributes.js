export default {
  top: {
    props: { type: "number", step: 10 },
    filter: parseInt,
    unit: "px",
  },
  left: {
    props: { type: "number", step: 10 },
    filter: parseInt,
    unit: "px",
  },
  width: {
    props: { type: "number", min: 0, step: 10 },
    filter: parseInt,
    unit: "px",
  },
  height: {
    props: { type: "number", min: 0, step: 10 },
    filter: parseInt,
    unit: "px",
  },
  "z-index": {
    props: { type: "number", min: 0, step: 1 },
    filter: parseInt,
    unit: null,
  },
  "font-size": {
    props: { type: "number", min: 0, step: 10 },
    filter: parseInt,
    unit: "px",
  },
  "font-weight": {
    props: { type: "number", min: 0, step: 100 },
    filter: parseInt,
    unit: null,
  },
  opacity: {
    props: { type: "number", min: 0, max: 1, step: 0.1 },
    filter: parseFloat,
    unit: null,
  },
  volume: {
    props: { type: "number", min: 0, max: 1, step: 0.1 },
    filter: parseFloat,
    unit: null,
    isProp: true,
  },
};
