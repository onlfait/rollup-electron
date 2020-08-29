<script>
  let errorsList = app.errors.getAll();

  app.errors.on("errors", errors => {
    errorsList = errors;
  });

  function openIssue() {
    app.errors.openIssue();
  }

  function restartApp() {
    app.remote.call("app.relaunchApp");
  }

  function exitApp() {
    window.close();
  }
</script>

<div id="app-content" class="flex flex-col h-full flex-auto overflow-auto">

  <div class="flex">
    <button class="p-2 flex-auto text-gray-800 bg-gray-400 uppercase" on:click={openIssue}>open issue</button>
    <button class="p-2 flex-auto text-gray-800 bg-gray-500 uppercase" on:click={restartApp}>restart app</button>
    <button class="p-2 flex-auto text-gray-800 bg-gray-600 uppercase" on:click={exitApp}>exit app</button>
  </div>

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
