<script>
  export let flex = "row";
  export let min = 10;
  export let max = 90;
  export let percent = 50;

  export let cls = "";
  export { cls as class };

  let dragging = false;
  let container = null;

  let dimension = flex === "row" ? "width" : "height";

  let splitterCursor = flex === "row" ? "ew-resize" : "ns-resize";
  let splitterStyle = `${dimension}:4px; cursor:${splitterCursor}`;
  let splitterClass = "hover:bg-black hover:bg-opacity-25";

  function setPos(event) {
    const { top, bottom, left, right } = container.getBoundingClientRect();
    const w = right - left;
    const h = bottom - top;
    const x = event.clientX - left;
    const y = event.clientY - top;
    const pos = flex === "row" ? x : y;
    const len = flex === "row" ? w : h;
    percent = Math.max(min, Math.min(max, pos / len * 100));
  }

  function drag(node, callback) {
    const mousedown = event => {
      if (event.which !== 1) return;
      event.preventDefault();
      dragging = true;
      const onmouseup = () => {
        dragging = false;
        window.removeEventListener("mousemove", callback, false);
        window.removeEventListener("mouseup", onmouseup, false);
      };
      window.addEventListener("mousemove", callback, false);
      window.addEventListener("mouseup", onmouseup, false);
    };
    node.addEventListener("mousedown", mousedown, false);
    return {
      destroy() {
        node.removeEventListener("mousedown", onmousedown, false);
      }
    };
  }
</script>

<div bind:this={container} class="relative flex flex-{flex} h-full {cls}">
  <div style="{dimension}: {percent}%;">
		<slot name="a"></slot>
	</div>
  <div use:drag={setPos} style={splitterStyle} class={splitterClass}></div>
  <div class="flex-auto">
		<slot name="b"></slot>
	</div>
	<slot />
</div>
