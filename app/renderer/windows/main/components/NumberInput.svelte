<script>
  export let label = null;
  export let value;
  export let min = 0;
  export let step = 1;
  export let twoLine = true;

  let cls = twoLine ? "flex-col" : "flex-row space-x-2 items-center";
</script>

<div class="flex {cls}">
  {#if label}
  <div class="font-medium">{label}</div>
  {/if}
  <input
    {min}
    {step}
    on:input
    on:change
    bind:value
    {...$$props}
    type="number"
    class="p-2 flex-auto rounded w-20 text-dark"
  />
</div>
