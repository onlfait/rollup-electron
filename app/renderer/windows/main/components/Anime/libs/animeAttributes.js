export default {
  top: { type: "number", step: 10, filter: parseInt },
  left: { type: "number", step: 10, filter: parseInt },
  width: { type: "number", min: 0, step: 10, filter: parseInt },
  height: { type: "number", min: 0, step: 10, filter: parseInt },
  "z-index": { type: "number", min: 0, step: 1, filter: parseInt },
  "font-size": { type: "number", min: 0, step: 10, filter: parseInt },
  "font-weight": { type: "number", min: 0, step: 100, filter: parseInt },
  volume: { type: "number", min: 0, max: 1, step: 0.1, filter: parseFloat },
};
