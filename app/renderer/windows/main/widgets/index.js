const widgets = [];

export function install(widget) {
  widgets.push(widget);
}

export function getList() {
  return widgets.map(widget => widget.config);
}

export function get({ group, name } = {}) {
  return widgets.find(widget => widget.group === group && widget.name === name);
}

export default widgets;
