<script>
  import { connecting, connected, autoConnectAtStartup } from "../../../stores/obs";
  import { _ } from "../../../../../i18n"

  function connect() {
    if ($connected || $connecting) return;
    app.obs.connect();
  }

  function disconnect() {
    if (!$connected) return;
    app.obs.disconnect();
  }

  if ($autoConnectAtStartup) {
    connect();
  }
</script>

{#if !$connected}
<button class="bg-gray-500" disabled={$connecting} on:click={connect}>OBS {_('words.connect')}</button>
{:else}
<button class="bg-gray-500" on:click={disconnect}>OBS {_('words.disconnect')}</button>
{/if}
