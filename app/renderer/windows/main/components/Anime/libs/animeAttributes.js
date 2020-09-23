export default {
  top: { type: "number", step: 10, filter: parseInt },
  left: { type: "number", step: 10, filter: parseInt },
  width: { type: "number", min: 0, step: 10, filter: parseInt },
  height: { type: "number", min: 0, step: 10, filter: parseInt },
  volume: { type: "number", min: 0, step: 0.1, filter: parseFloat },
  fontSize: { type: "number", min: 0, step: 10, filter: parseInt },
  fontWeight: { type: "number", min: 0, step: 100, filter: parseInt },
};
