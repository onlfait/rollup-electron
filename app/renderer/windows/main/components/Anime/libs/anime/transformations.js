import easingNames from "./easingNames";

export default {
  easing: {
    props: { type: "select", value: "linear" },
    filter: null,
    unit: null,
    values: easingNames,
  },
  delay: {
    props: { type: "number", min: 0, step: 100, value: 0 },
    removable: false,
    filter: parseInt,
  },
  duration: {
    props: { type: "number", min: 0, step: 100, value: 1000 },
    removable: false,
    filter: parseInt,
  },
  opacity: {
    props: { type: "number", min: 0, max: 1, step: 0.1, value: 0.5 },
    removable: true,
    filter: parseFloat,
  },
  // volume: {
  //   props: { type: "number", min: 0, max: 1, step: 0.1, value: 0.8 },
  //   removable: true,
  //   filter: parseFloat,
  // },
  translateX: {
    props: { type: "number", step: 10, value: 0 },
    removable: true,
    filter: parseInt,
  },
  translateY: {
    props: { type: "number", step: 10, value: 0 },
    removable: true,
    filter: parseInt,
  },
  translateZ: {
    props: { type: "number", step: 10, value: 0 },
    removable: true,
    filter: parseInt,
  },
  rotate: {
    props: { type: "number", step: 5, value: 0 },
    removable: true,
    filter: parseInt,
  },
  rotateX: {
    props: { type: "number", step: 5, value: 0 },
    removable: true,
    filter: parseInt,
  },
  rotateY: {
    props: { type: "number", step: 5, value: 0 },
    removable: true,
    filter: parseInt,
  },
  rotateZ: {
    props: { type: "number", step: 5, value: 0 },
    removable: true,
    filter: parseInt,
  },
  scale: {
    props: { type: "number", step: 0.1, value: 1 },
    removable: true,
    filter: parseFloat,
  },
  scaleX: {
    props: { type: "number", step: 0.1, value: 1 },
    removable: true,
    filter: parseFloat,
  },
  scaleY: {
    props: { type: "number", step: 0.1, value: 1 },
    removable: true,
    filter: parseFloat,
  },
  scaleZ: {
    props: { type: "number", step: 0.1, value: 1 },
    removable: true,
    filter: parseFloat,
  },
  skew: {
    props: { type: "number", step: 1, value: 0 },
    removable: true,
    filter: parseInt,
  },
  skewX: {
    props: { type: "number", step: 1, value: 0 },
    removable: true,
    filter: parseInt,
  },
  skewY: {
    props: { type: "number", step: 1, value: 0 },
    removable: true,
    filter: parseInt,
  },
  perspective: {
    props: { type: "number", step: 1, value: 0 },
    removable: true,
    filter: parseInt,
  },
};
