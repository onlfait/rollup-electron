<script>
  export let label;
  export let value;
  export let min = 0;
  export let step = 1;
</script>

<div class="flex flex-col">
  <div class="font-medium">{label}</div>
  <input
    {min}
    {step}
    bind:value
    {...$$props}
    type="number"
    class="p-2 flex-auto rounded w-20"
  />
</div>
