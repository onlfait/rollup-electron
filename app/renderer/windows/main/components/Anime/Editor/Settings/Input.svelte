<script>
  export let label;
  export let props;
</script>

<div class="p-2 flex items-center">
  <div class="w-1/2 truncate pr-2">{label}</div>
  <input
    on:blur
    on:input
    on:change
    {...props}
    class="px-2 w-1/2 flex-1 text-dark rounded" />
</div>
