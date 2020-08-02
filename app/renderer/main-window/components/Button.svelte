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

  if (icon) {
    px = 0;
    py = 0;
  }

  if (size) {
    w = size;
    h = size;
  }

  let cls = [];

  w && cls.push(`w-${w}`);
  h && cls.push(`h-${h}`);
  px && cls.push(`px-${px}`);
  py && cls.push(`py-${py}`);
  bg && cls.push(`bg-${bg}`);

  flex && cls.push("flex items-center");
  rounded && cls.push("rounded");
  uppercase && cls.push("uppercase");

  cls = cls.join(" ");
</script>

<button class="{cls}" on:click>
  <slot />
</button>
