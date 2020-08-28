<script>
  export let items = [];
  export let value = null;
  export let valueKey = 'value';
  export let labelKey = 'label';
  export let returnType = 'object';
  export let activeClass = 'text-gray-500';

  let cls = '';
  export { cls as class };

  function isActive(item) {
    return item === value ? activeClass : '';
  }

  function getType(item) {
    if (returnType === 'object') {
      return item;
    }
    return item[returnType];
  }
</script>

<select class="text-dark {cls}" bind:value={value} on:change>
  {#each items as item}
    {#if valueKey && labelKey}
    <option value={getType(item)} class={isActive(item[valueKey])}>
      {item[labelKey]}
    </option>
    {:else}
    <option value={item} class={isActive(item)}>{item}</option>
    {/if}
  {/each}
</select>
