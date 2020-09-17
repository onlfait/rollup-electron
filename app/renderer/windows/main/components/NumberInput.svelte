<script>
  export let value;
  export let pad = 'p-2';
  export let label = null;
  export let twoLine = true;

  let cls = twoLine ? "flex-col" : "flex-row space-x-2 items-center";
</script>

<div class="flex {cls}">
  {#if label}
  <div class="font-medium">{label}</div>
  {/if}
  <input
    on:input
    on:change
    bind:value
    {...$$props}
    type="number"
    class="{pad} flex-auto rounded w-20 text-dark"
  />
</div>
