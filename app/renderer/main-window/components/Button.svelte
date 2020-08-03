<script>
  export let w = 0;
  export let h = 0;
  export let px = 2;
  export let py = 2;
  export let size = 0;
  export let icon = false;
  export let flex = true;
  export let rounded = 2;
  export let uppercase = 2;
  export let bg = "primary";
  export let first = false;
  export let last = false;
  export let noShrink = false;

  if (icon) {
    px = 0;
    py = 0;
  }

  if (size) {
    w = size;
    h = size;
  }

  let cls = "";

  $: {
    cls = [];

    w && cls.push(`w-${w}`);
    h && cls.push(`h-${h}`);
    px && cls.push(`px-${px}`);
    py && cls.push(`py-${py}`);
    bg && cls.push(`bg-${bg}`);

    flex && cls.push("inline-flex items-center");
    noShrink && cls.push("flex-shrink-0");
    uppercase && cls.push("uppercase");

    if (rounded) {
      cls.push(`rounded${first ? "-l" : (last ? "-r" : "")}`);
    }

    cls = cls.join(" ");
  }
</script>

<button class="{cls}" on:click>
  <slot />
</button>
