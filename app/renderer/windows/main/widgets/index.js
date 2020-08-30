import cloneDeep from "clone-deep";

const widgets = [];

export function install(widget) {
  widgets.push(widget);
}

export function getList() {
  return widgets.map(widget => cloneDeep(widget.config));
}

export function get({ group, name } = {}) {
  return widgets.find(({ config }) => {
    return config.group === group && config.name === name;
  });
}

export default widgets;
