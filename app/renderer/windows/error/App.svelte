<script>
  let errorsList = app.errors.getAll();

  app.errors.on('errors', errors => {
    errorsList = errors;
    console.log(errors);
  })
</script>

<div id="app-content" class="flex flex-col h-full flex-auto overflow-auto">
  {#each errorsList as error}
  	<div class="flex flex-col mb-4">
      <div class="p-2 bg-red-700 text-gray-200 font-medium text-lg">
        {error.origin}
      </div>
      <div class="p-2">
        <span class="font-medium">{error.name}:</span> {error.message}
      </div>
      <div class="p-2">
        <div class="p-2 bg-black font-mono text-gray-800 dark:text-gray-500 bg-opacity-25 rounded overflow-auto">
          {error.cleanStack}
        </div>
      </div>
    </div>
  {/each}
</div>
