import { transDefs } from "./settings";

function getUnit(key) {
  const defs = transDefs[key];
  return defs ? defs.unit || "" : "";
}

export default function getTrans(input) {
  const style = [];

  Object.entries(input).forEach(([key, value]) => {
    const unit = getUnit(key);
    style.push(`${key}(${value}${unit})`);
  });

  return `transform:${style.join(" ")}`;
}
