import { items, editGrid } from "./grid";

export function editableItem() {
  return {
    static: !editGrid,
    resizable: editGrid,
    draggable: editGrid
  };
}

export function edit() {
  editGrid.update(n => !n);
  items.update(n => n.map(item => ({ ...item, ...editableItem() })));
}
