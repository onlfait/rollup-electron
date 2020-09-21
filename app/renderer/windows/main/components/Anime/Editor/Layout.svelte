<script>
  import Splitter from "../../Splitter.svelte";

  let style = "top:32px";
  let position = "absolute z-10 left-0 right-0 bottom-0";
  let theme = "bg-light text-dark dark:bg-dark dark:text-light";
</script>

<div {style} class="{position} {theme}" >
  <Splitter flex="col" sizes={[75,25]} save="editor.main.col">
    <div slot="a" class="h-full">
      <Splitter flex="row" sizes={[75,25]} save="editor.main.row">
        <div slot="a" class="h-full">
          <slot name="leftPane" />
          <slot />
        </div>
        <div slot="b" class="h-full">
          <slot name="rightPane" />
        </div>
      </Splitter>
    </div>
    <div slot="b" class="h-full">
      <slot name="bottomPane" />
    </div>
  </Splitter>
</div>
